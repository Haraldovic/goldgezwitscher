# Goldgezwitscher

Die Vorschau läuft auf der im Repository hinterlegten GitHub-Pages-Domain. Auf der Startseite stellt Dietmar seinen Podcast in der Ich-Form vor. Die Hauptnavigation springt direkt zu den Abschnitten. Gastprofil und Partneranfrage haben eigene Adressen.

## Inhalte pflegen

| Datei | Inhalt |
| --- | --- |
| `index.html` | Cover, Gastgeber und Marken, Crowdfunding, E-Mail-Updates, Gasteinladung und drei Sponsoringpakete |
| `bewerben.html` | Gastprofil mit Kurzvita, Branche, optionaler Firma und Gesprächsthema |
| `sponsoren.html` | Partneranfrage. Die Links der Pakete wählen über `?paket=bronze`, `silber` oder `gold` den passenden Eintrag aus. |
| `format.html`, `dietmar.html`, `mitmachen.html` | Weiterleitungen zu den zugehörigen Abschnitten der Startseite, einschließlich eines sichtbaren Ersatzlinks |
| `startpost-datenschutz.html` | Einwilligung, Verwendung der E-Mail-Adresse und Abmeldung |
| `assets/podcast.css` und `assets/podcast.js` | Darstellung, Menü, Veröffentlichung und Formulare |
| `assets/social/` | Lokal gespeicherte Instagram- und TikTok-Zeichen mit Lizenz |

## Titelsong und erste Folge veröffentlichen

Im Objekt `release` am Anfang von `assets/podcast.js` den relativen Pfad zur freigegebenen Musikdatei als `themeSong` eintragen. Der Player erscheint auf der Startseite und startet auf Klick. Mit einer veröffentlichten YouTube-Adresse in `episodeUrl` führt der Link neben dem Premierentermin zur ersten Folge.

Die Premiere ist für den 1. Dezember 2026 geplant. Ohne Folgenlink verschwindet der Kalenderlink ab dem Folgetag (Ortszeit Karlsruhe). Bei einer Terminänderung den Termin auf der Startseite, `podcaststart.ics` und `endOfPremiereDay` gemeinsam aktualisieren. Die ältere Datei `goldgezwitscher.ics` enthält den separaten Crowdfunding-Termin.

## Post von Dietmar

Nach Eingabe der Adresse und aktiver Einwilligung steht eine vorformulierte Nachricht an `info@nachlassgold.de` bereit. Die Person öffnet den Entwurf in ihrer E-Mail-App oder kopiert ihn für Webmail und sendet ihn aus ihrem eigenen Postfach. Ohne JavaScript stehen ein direkter E-Mail-Link und die Kontaktadresse bereit. Die Pflege des Verteilers und der Versand erfolgen im Postfach.

Im Postfach prüft Dietmar die eingegangene Erklärung und ob die Absenderadresse der gewünschten Empfängeradresse entspricht. Nur diese Absenderadresse in den Verteiler für die Kampagne und die ersten Folgen aufnehmen. Abweichende Adressen benötigen eine Bestätigung ihres Inhabers. Anmeldungen mit Zeitpunkt und Einwilligungswortlaut nachvollziehbar halten und Abmeldungen vor dem nächsten Versand berücksichtigen. Kontakte aus Bewerbungen oder Sponsoringanfragen bleiben eigenständig.

## Gast- und Partneranfragen

Die statischen Formulare bereiten die Eingaben als E-Mail an `info@nachlassgold.de` auf. Interessierte prüfen den Entwurf und öffnen ihre E-Mail-App oder kopieren den Nachrichtentext. Die Angaben bleiben bis zum Wechsel in die E-Mail-App im Browser. Bei deaktiviertem JavaScript ist die E-Mail-Adresse direkt erreichbar.

Direkte Sponsoringanfragen verwenden die Richtwerte aus Dietmars Briefing. Bronze ist ein Produktionsbeitrag von etwa 150 Euro, Silber die Begleitung einer Episode für etwa 700 Euro. Gold begleitet eine Staffel, deren Preis Dietmar mit dem Unternehmen vereinbart. Die Konditionen der Startnext-Dankeschöns stehen auf der Kampagnenseite.

## Gestaltung und Quellen

Das Plattencover verwendet Dietmars vorhandenes Originalfoto am Mikrofon. Die fotografische Hülle und die Platte liegen in zwei perspektivischen CSS-Ebenen. Die Hülle reagiert auf präzise Zeigerbewegungen. Touchgeräte und Besucher mit aktivierter Bewegungsreduktion sehen eine ruhende Komposition. Die drei Metallprägungen verwenden das vorhandene Vogelzeichen als Maske. Fotos, Schriften und Plattformzeichen werden lokal ausgeliefert.

- Dietmars Referenz verbindet eine klare Leitfrage mit dem Ablauf für Bewerber. Die kompakte Navigation und der direkte Weg zum Gastprofil greifen diese Struktur auf. [Marcel Kallas Podcast](https://www.marcelkalla.de/podcast)
- Der persönliche Einstieg von Hotel Matze diente als Vorbild für die frühe Vorstellung des Gastgebers. [Hotel Matze](https://www.hotelmatze.de/)
- Acquired zeigt das Format mit eigener Covergestaltung und einem direkten Zugang zur Folge. Die Aktion bei Goldgezwitscher richtet sich nach dem Stand der Veröffentlichung. [Acquired](https://www.acquired.fm/)
- Die Gestaltungsreferenz Oura aus dem vereinbarten Design-Repository prägte Papierfarbe und Serifen. [Awesome Design MD](https://github.com/VoltAgent/awesome-design-md)
- Angaben zur ersten Staffel, zum Produktionsort und zur Veröffentlichung auf YouTube stammen aus Dietmars Kampagne. [Goldgezwitscher auf Startnext](https://www.startnext.com/goldgezwitscher)

Die Vorschau verwendet `noindex,nofollow`. Ansprechpartner, Fotolizenzen und vorhandene rechtliche Angaben sind von jeder Seite erreichbar.
