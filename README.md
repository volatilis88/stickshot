# STICKSHOT: Comic War - Landingpage + Presskit

Statische Seite, keine Build-Schritte, keine Cookies, keine Fremdanfragen. Ordner einfach auf einen Webspace legen
(GitHub Pages, Netlify, Cloudflare Pages, itch.io-Seite als HTML-Upload, eigener Hoster).

- `index.html` - Landingpage (EN/DE-Umschalter, Sprache nach Browser)
- `presskit/index.html` - Presskit (Fakten, Texte zum Kopieren, Logos, Bilder, Trailer, Kontakt)
- `presskit/stickshot_presskit.zip` - alles zum Herunterladen (neu bauen: `python tools_zip.py`)
- `legal.html` - Impressum + Datenschutz (ausgefuellt 7. Okt 2026, Hoster GitHub Pages)
- `img/`, `video/` - fuer das Web verkleinerte Bilder und Trailer (720p). Quellen: `../stickshot_steam_media`

Lokal ansehen: `python -m http.server 8765` in diesem Ordner, dann http://localhost:8765/
Offen: Erscheinungstermin eintragen, sobald oeffentlich;
YouTube-Trailer-Link ergaenzen, wenn vorhanden; Trailer v3 (apex) ist der eingebaute.
