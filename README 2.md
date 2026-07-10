# Anki Sensei — Web App para Meta Ray-Ban Display

App web para estudiar tus 5 mazos de Anki directamente en la pantalla de tus
Ray-Ban Display, usando el **Neural Band** para navegar/calificar y las
**bocinas** para escuchar la pronunciación (japonés, vía Web Speech API).

Construida siguiendo la especificación oficial de Meta para "Web Apps" en
Ray-Ban Display (viewport fijo 600×600, navegación por flechas/Enter que
generan el Neural Band y el touch strip, sin scroll, colores para pantalla
aditiva).

## Contenido
- `index.html` — pantallas (menú, submenú, estudio, resumen)
- `app.js` — navegación, cola de repaso, algoritmo SM-2 (estilo Anki), TTS
- `data.js` — tus 5 mazos ya extraídos de los `.apkg` (6,179 tarjetas):
  - Core 2.3k (vocabulario + oraciones de ejemplo)
  - Kanji para Recordar (Heisig 1+3)
  - Kanjis Radicales en Español
  - Verbos japoneses (forma diccionario / ます)
  - Minna no Nihongo I (dividido en sus 19 temas)

## Cómo probarlo YA (sin gafas)
Solo abre `index.html` en cualquier navegador. Puedes usar las flechas del
teclado y Enter, o hacer clic con el mouse — el código responde a ambos.

## Cómo desplegarlo en tus Ray-Ban Display

1. **Sube estos 3 archivos a cualquier hosting estático** (necesitas una URL
   https, no funciona con `file://`):
   - GitHub Pages (gratis): crea un repo, sube los archivos, activa Pages.
   - Vercel / Netlify (gratis, arrastra y suelta la carpeta).
   - Cualquier servidor propio.

2. **Activa el modo desarrollador** en tus gafas desde la app de Meta AI en
   tu teléfono (Configuración → Ray-Ban Display → Modo desarrollador).

3. En las gafas, abre la Web App con la URL donde subiste `index.html`.

4. Navega con el Neural Band (pellizcos/rotación) o el touch strip del
   temple: arriba/abajo = moverse por la lista, pellizco = Enter.

## Cómo funciona la calificación (estilo Anki)

Al mostrar la respuesta aparecen 4 botones — igual que en Anki de escritorio:

| Botón | Efecto |
|---|---|
| **Otra vez** | la tarjeta vuelve a aparecer más adelante en la misma sesión |
| **Difícil** | intervalo corto, el "ease" baja un poco |
| **Bien** | intervalo estándar (1 día → 6 días → ease acumulado) |
| **Fácil** | intervalo más largo, el "ease" sube |

El progreso se guarda en `localStorage` **por mazo**, así que las gafas
recuerdan qué tarjetas ya dominaste y cuáles están pendientes, igual que el
scheduler real de Anki (SM-2 simplificado).

## Solución de problemas: audio y gestos (actualización)

**¿Por qué no sonaba el audio?** El evento `Enter` que el sistema genera al
hacer pellizco con el Neural Band no siempre cuenta como un "gesto de
usuario" confiable para que el navegador desbloquee el audio la primera vez
(es una protección estándar contra reproducción automática). Por eso agregué
un botón **"🔊 Probar / activar audio"** arriba del menú principal: selecciónalo
y confírmalo una vez al abrir la app, y verás en pantalla si quedó activado,
si falta la voz japonesa instalada en las gafas, o si el problema es solo el
volumen del dispositivo. Después de esa primera activación, el resto de las
tarjetas deberían sonar solas.

**¿Por qué no puedo usar el pellizco de dedo medio para "volver"?** Ese gesto
está **reservado por el sistema operativo de las gafas**: siempre abre el
menú universal de Meta (salir de la app, ver ajustes, etc.), y ese evento
nunca llega al código de la Web App — ninguna Web App de terceros puede
interceptarlo, es una limitación de la plataforma, no de esta app. Por eso
en su lugar dejé el botón **"‹ Menú"** siempre alcanzable con un solo
movimiento del Neural Band (arriba/pellizco índice) desde cualquier pantalla
de estudio.

## Audio: solución final (mp3 pregenerados, sin servicios en vivo)

Después de tres intentos con servicios en tiempo real que fallaron por
razones distintas de la plataforma...

| Intento | Por qué falló |
|---|---|
| `speechSynthesis` (Web Speech API) | Android WebView —lo que usan las Web Apps de Ray-Ban Display— no la implementa en absoluto |
| Google Translate TTS (endpoint no oficial) | Google lo dio de baja desde 2023, ya no responde para nadie |
| Puter.js (Amazon Polly gratis) | Su flujo de login usa una ventana emergente que no puede completarse en el navegador restringido de las gafas — la llamada se queda colgada |

...la solución que **sí es robusta**: generar los audios **una sola vez, de
antemano**, como archivos mp3 reales empaquetados junto con la app. En las
gafas solo se reproduce un archivo local (`audio/xxxx.mp3`), exactamente
igual de simple que cargar `data.js` — sin red, sin cuentas, sin políticas de
bloqueo de por medio.

### Cómo generarlos (una sola vez, en tu computadora)

```
pip install edge-tts
python generate_audio.py
```

Esto usa las voces gratuitas de Microsoft Edge (`edge-tts`, sin API key) para
generar ~5,400 clips únicos (cubren las 6,179 tarjetas) en una carpeta
`audio/`, más un archivo `audio_map.js` con el mapa tarjeta → audio. Tarda
varios minutos la primera vez; si se interrumpe, puedes volver a correrlo y
no repetirá los clips que ya se generaron.

Después, sube también `audio/` y `audio_map.js` a tu hosting junto con los
demás archivos, y las gafas reproducirán el audio real sin depender de
internet en el momento de estudiar (el mp3 ya está guardado ahí mismo).

⚠️ Nota de honestidad: `edge-tts` también es una librería no documentada
oficialmente por Microsoft (usa las voces de "Léer en voz alta" de Edge por
detrás), aunque es mucho más estable y ampliamente usada que el endpoint de
Google que se dio de baja. Si en el futuro deja de funcionar, la alternativa
sólida sería una API de TTS oficial con tu propia key (Azure Speech, Google
Cloud TTS) — solo habría que cambiar la función `synth_one()` dentro de
`generate_audio.py`; el resto de la app no cambiaría.

Mientras no generes los audios, la app sigue funcionando normal (mazos,
calificación, progreso) solo sin sonido, y en escritorio seguirá usando la
voz del navegador como antes para que puedas seguir probando.

## Solución de problemas: audio y gestos (actualización 4 — cambio de servicio de voz)

**Causa raíz encontrada:** el servicio que usaba antes
(`translate.google.com/translate_tts`) es un endpoint no oficial que
**Google dio de baja desde mediados de 2023** por seguridad. Ya no responde
de forma confiable para nadie — no era un problema de tus gafas ni de tu
internet, el servicio simplemente ya no funciona. Por eso el diagnóstico dio
"paso 1 ok" (tu audio local sí funciona) pero "el servicio en línea no
respondió" (porque ese servicio lleva años apagado).

**Solución aplicada:** cambié el proveedor de voz en línea a
[Puter.js](https://puter.com) (`js.puter.com/v2`), que expone voces reales de
Amazon Polly —incluida una voz japonesa nativa ("Mizuki")— sin necesitar que
tú configures una API key. Es un servicio activo y mantenido en 2026, a
diferencia del anterior.

⚠️ Una cosa a vigilar: Puter usa un modelo "el usuario paga su propio uso" —
la primera vez que se use en tus gafas, es posible que aparezca una ventana
pidiendo iniciar sesión o crear una cuenta gratuita de Puter antes de dejar
pasar el audio. Como las gafas solo navegan con flechas/Enter (sin teclado
para escribir), si esa ventana pide texto podría ser incómoda de completar
ahí mismo. Si eso pasa, dime exactamente qué aparece en pantalla — puede que
haya que autorizarlo una vez desde el navegador del teléfono, o cambiar a un
enfoque sin cuentas (por ejemplo, generar y empaquetar clips de audio fijos
para el vocabulario más usado, en vez de generar voz al vuelo).

## Solución de problemas: audio y gestos (actualización 3 — diagnóstico en 2 pasos)

Si sigue sin sonar, el botón "🔊 Probar / activar audio" ahora hace **dos
pruebas separadas** para saber exactamente dónde está el problema:

1. **Paso 1 — beep local:** reproduce un tono corto guardado dentro de la
   propia app (no necesita internet). Si esto **falla**, significa que el
   navegador de las gafas está bloqueando la reproducción de audio en
   general — probablemente el volumen de medios está en silencio/muy bajo
   en las gafas, o hay una política de autoplay que el gesto del Neural Band
   no logra "desbloquear" igual que un toque directo en pantalla.
2. **Paso 2 — servicio en línea:** si el paso 1 sí suena, intenta el mismo
   texto en japonés generado por internet. Si **este** falla pero el paso 1
   funcionó, el problema es de red/conectividad (o que el servicio gratuito
   de Google esté bloqueando esa solicitud), no de las gafas.

Cuéntame exactamente qué mensaje te da cada paso (por ejemplo "❌ este
navegador bloquea todo audio" vs "✅ paso 1 ok, pero el servicio en línea no
respondió") para saber si hay que:
- revisar el volumen de medios de las gafas específicamente (aparte del
  volumen general),
- confirmar que las gafas tengan datos/WiFi activos en ese momento, o
- cambiar el servicio de TTS por uno que si funcione desde ese navegador.

## Solución de problemas: audio y gestos (actualización 2)

**Diagnóstico real:** las Web Apps de Ray-Ban Display corren dentro de un
**Android WebView**, y Android WebView **no implementa la Web Speech API**
(`speechSynthesis`) — es una limitación documentada de esa plataforma en
general, no algo específico de esta app ni de tus gafas. Por eso en la
computadora (Chrome de escritorio, que sí la soporta) funcionaba, y en las
gafas aparecía "no disponible en este navegador".

**Solución aplicada:** la app ahora detecta si `speechSynthesis` existe.
- Si existe (computadora, la mayoría de navegadores de escritorio): usa la
  voz nativa del sistema, igual que antes.
- Si no existe (las gafas): reproduce en su lugar un archivo de audio real
  generado al vuelo por un servicio de texto-a-voz en línea, usando un
  elemento `<audio>` normal (que sí funciona en WebView). Esto **requiere que
  las gafas tengan conexión a internet activa** (datos del teléfono
  emparejado o WiFi).

  ⚠️ El servicio usado (`translate.google.com/translate_tts`) es un endpoint
  **no oficial y gratuito**, sin necesidad de API key — perfecto para
  prototipar, pero Google podría cambiarlo, limitarlo o bloquearlo sin
  aviso. Si en el futuro deja de funcionar o quieres algo más confiable para
  uso diario, la alternativa es una API de TTS oficial (Google Cloud
  Text-to-Speech, Azure Speech, ElevenLabs, etc.) — todas requieren crear una
  cuenta y una API key propia (con costo por uso, aunque casi siempre hay un
  nivel gratuito).

**Sobre el pellizco de dedo medio:** sigue reservado por el sistema
operativo de las gafas para su menú universal — ninguna Web App de terceros
puede interceptarlo. El botón "‹ Menú" queda siempre a un solo movimiento
del pellizco índice normal.

## Sobre el audio

Las Web Apps de Ray-Ban Display **no tienen acceso al micrófono** (aún no lo
soporta la plataforma), así que la interacción es por gestos + calificación,
no por voz. Para las bocinas, la app usa la Web Speech API del navegador
(`speechSynthesis`, `lang="ja-JP"`) para pronunciar cada tarjeta en japonés —
funciona sin necesitar los archivos de audio originales de Anki (que pesan
demasiado para empaquetarlos). Hay un botón 🔊 para repetir el audio cuando
quieras.

## Notas técnicas (spec oficial de Meta, verificada en julio 2026)

- Viewport fijo 600×600 px, sin scroll, fondo oscuro (pantalla aditiva).
- Entrada: el Neural Band y el touch strip generan eventos de teclado
  estándar (`ArrowUp/Down/Left/Right`, `Enter`) — no hay mouse ni touch.
- No soportado todavía por la plataforma: cámara, micrófono, texto libre,
  modo offline, notificaciones, navegación "atrás" nativa (por eso agregué
  un botón "‹ Menú" en cada pantalla en vez de depender de un gesto de
  regreso).
- Storage: `localStorage` estándar, límite de 5 MB (tu progreso ocupa unos
  pocos KB).
