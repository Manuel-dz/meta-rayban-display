#!/usr/bin/env python3
"""
Genera los archivos de audio (mp3) para Anki Sensei, UNA SOLA VEZ, en tu
computadora (necesitas internet aquí, pero NO en las gafas después).

Por qué existe este script:
  1) Android WebView (lo que usan las Web Apps de Ray-Ban Display) no
     soporta la Web Speech API del navegador.
  2) El servicio no oficial de Google Translate TTS que se probó después
     fue dado de baja por Google desde 2023.
  3) Puter.js (otro intento) requiere un flujo de inicio de sesión con
     ventana emergente que no puede completarse dentro del navegador
     restringido de las gafas.

La solución robusta: generar los mp3 de antemano, aquí, con internet normal
de tu computadora, y que las gafas solo reproduzcan archivos locales — igual
que ya hacen con data.js. Esto no depende de ningún servicio en vivo.

Uso:
    pip install edge-tts
    python generate_audio.py

Al terminar, tendrás una carpeta audio/ y un archivo audio_map.js listos
para subir junto con index.html, app.js y data.js a tu hosting.

Nota: usa edge-tts (voces de Microsoft Edge Read Aloud). Es una librería
gratuita, sin API key, ampliamente usada — pero, igual que cualquier
servicio no documentado oficialmente, podría cambiar en el futuro. Si algún
día deja de funcionar, la alternativa más sólida es una API de TTS oficial
con tu propia key (Azure Speech, Google Cloud TTS, etc.), adaptando la
función synth_one() de este script.
"""

import asyncio
import hashlib
import json
import os
import re
import sys

try:
    import edge_tts
except ImportError:
    print("Falta instalar edge-tts. Corre primero:\n    pip install edge-tts")
    sys.exit(1)

VOICE = "ja-JP-NanamiNeural"   # voz femenina japonesa de Microsoft Edge
                                # alternativa masculina: "ja-JP-KeitaNeural"
CONCURRENCY = 6                 # cuántos audios generar a la vez
AUDIO_DIR = "audio"
MAP_FILE = "audio_map.js"
DATA_FILE = "data.js"


def clean_for_tts(text):
    # Quita sufijos de desambiguación tipo "[1]" "[2]" que Anki usa
    # internamente pero que no se deben pronunciar.
    return re.sub(r"\[\d+\]\s*$", "", text).strip()


def load_deck_data():
    with open(DATA_FILE, encoding="utf-8") as f:
        content = f.read()
    json_str = content[len("window.ANKI_DATA = "):-1]
    return json.loads(json_str)


def collect_fronts(data):
    """Regresa dict: texto_original_en_la_tarjeta -> nombre_de_archivo.mp3"""
    mapping = {}
    cleaned_to_hash = {}

    def register(front):
        if not front or front in mapping:
            return
        cleaned = clean_for_tts(front)
        if not cleaned:
            return
        if cleaned not in cleaned_to_hash:
            h = hashlib.md5(cleaned.encode("utf-8")).hexdigest()[:14]
            cleaned_to_hash[cleaned] = h
        mapping[front] = f"{AUDIO_DIR}/{cleaned_to_hash[cleaned]}.mp3"

    for key in ["core23k", "heisig", "radicales", "verbos"]:
        for card in data[key]["cards"]:
            register(card["front"])

    for tema, cards in data["minna"]["subdecks"].items():
        for card in cards:
            register(card["front"])

    return mapping, cleaned_to_hash


async def synth_one(cleaned_text, out_path, semaphore, stats):
    if os.path.exists(out_path):
        stats["skipped"] += 1
        return
    async with semaphore:
        try:
            communicate = edge_tts.Communicate(cleaned_text, VOICE)
            await communicate.save(out_path)
            stats["ok"] += 1
        except Exception as e:
            stats["failed"] += 1
            print(f"  ⚠️  falló '{cleaned_text}': {e}")


async def main():
    print("Cargando mazos desde data.js…")
    data = load_deck_data()
    mapping, cleaned_to_hash = collect_fronts(data)
    print(f"Tarjetas con audio a generar: {len(cleaned_to_hash)} clips únicos "
          f"(cubren {len(mapping)} tarjetas)")

    os.makedirs(AUDIO_DIR, exist_ok=True)

    semaphore = asyncio.Semaphore(CONCURRENCY)
    stats = {"ok": 0, "failed": 0, "skipped": 0}
    tasks = []
    for cleaned, h in cleaned_to_hash.items():
        out_path = os.path.join(AUDIO_DIR, f"{h}.mp3")
        tasks.append(synth_one(cleaned, out_path, semaphore, stats))

    total = len(tasks)
    batch_size = 200
    for i in range(0, total, batch_size):
        batch = tasks[i:i + batch_size]
        await asyncio.gather(*batch)
        done = min(i + batch_size, total)
        print(f"  progreso: {done}/{total} "
              f"(ok={stats['ok']} saltados={stats['skipped']} fallidos={stats['failed']})")

    with open(MAP_FILE, "w", encoding="utf-8") as f:
        f.write("window.AUDIO_MAP = ")
        json.dump(mapping, f, ensure_ascii=False)
        f.write(";\n")

    print("\n✅ Listo.")
    print(f"   - Carpeta '{AUDIO_DIR}/' con {stats['ok'] + stats['skipped']} archivos mp3")
    print(f"   - Archivo '{MAP_FILE}' con el mapa tarjeta → audio")
    if stats["failed"]:
        print(f"   - {stats['failed']} clips fallaron (revisa tu conexión y vuelve a "
              f"correr el script; ya no repetirá los que sí se generaron)")
    print("\nAhora sube 'audio/', 'audio_map.js' junto con index.html, app.js y "
          "data.js a tu hosting, y vuelve a probar en las gafas.")


if __name__ == "__main__":
    asyncio.run(main())
