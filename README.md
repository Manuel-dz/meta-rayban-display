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
