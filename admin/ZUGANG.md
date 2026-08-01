# Zugang zur Website-Verwaltung — Anleitung

Diese Anleitung beschreibt, wie der Zugang zur Verwaltung (`/admin/`) eingerichtet
wird und warum er so gebaut ist.

## Wie der Schutz funktioniert

Es gibt genau **eine** Sicherheitsgrenze: den **GitHub-Token**. Ob jemand etwas an
der Website ändern darf, entscheidet GitHub — nicht diese Seite. Ohne gültigen
Token bewirkt kein Klick in der Verwaltung irgendetwas.

Der Token wird **verschlüsselt** auf dem jeweiligen Gerät abgelegt:

- Aus deinem Passwort wird per PBKDF2-SHA256 (600'000 Iterationen) ein Schlüssel abgeleitet.
- Damit wird der Token per AES-GCM verschlüsselt. Im Browser-Speicher liegt nur der Geheimtext.
- Das Passwort selbst wird **nirgends gespeichert und nirgends übertragen**.
- Ein falsches Passwort scheitert schon an der Entschlüsselung — es gibt nichts zu vergleichen.

Das Passwort gilt **pro Gerät**, nicht für den Verein. Jede Person richtet ihren
eigenen Zugang mit ihrem eigenen Token ein.

## Schritt für Schritt

### 1. Alten Token widerrufen

Frühere Versionen der Verwaltung haben den Token **im Klartext** im Browser abgelegt.
Behandle ihn als kompromittiert:

1. GitHub → Profilbild → **Settings**
2. **Developer settings** → **Personal access tokens** → **Fine-grained tokens**
3. Beim bisherigen Token auf **Revoke** / **Delete**

### 2. Neuen Token erstellen

Im selben Bereich → **Generate new token**:

| Feld | Wert |
|---|---|
| Token name | z. B. `Website-SR – Andrea` (Name der Person) |
| Expiration | **90 Tage** (nicht „No expiration") |
| Repository access | **Only select repositories** → nur `Website-SR` |
| Permissions → Contents | **Read and write** |

Alle übrigen Berechtigungen bleiben auf *No access*. Token kopieren — GitHub zeigt
ihn **nur einmal** an.

### 3. Erste Anmeldung

Verwaltung öffnen (lokal per Doppelklick oder online unter
`https://mailhuegli.github.io/Website-SR/admin/`):

1. Token einfügen
2. Häkchen **„Token auf diesem Gerät merken (verschlüsselt)"** stehen lassen
3. Passwort wählen — **mindestens 10 Zeichen**, nicht anderswo verwendet
4. Passwort wiederholen, **Verbinden**

Die Meldung *„Token verschlüsselt auf diesem Gerät gespeichert"* bestätigt es.

### 4. Prüfen, dass es greift

Seite schliessen und neu öffnen. Es muss jetzt **nach dem Passwort** gefragt werden,
nicht mehr nach dem Token. Ein falsches Passwort wird abgewiesen.

### 5. Für jede weitere Person wiederholen

Schritte 2–3, mit **eigenem Token** und **eigenem Passwort**.

**Keinen gemeinsamen Token weitergeben.** Sonst lässt sich einer einzelnen Person der
Zugang nicht mehr entziehen, und in der Versionsgeschichte erscheinen alle Änderungen
unter derselben Person.

## Im Alltag

| Situation | Was zu tun ist |
|---|---|
| Passwort vergessen | Im Anmeldefenster **„Zugang auf diesem Gerät entfernen"**, dann mit dem Token neu anmelden. |
| Passwort ändern | In der Verwaltung → **Online-Zugang** → *Passwort auf diesem Gerät ändern*. |
| Nach 30 Tagen | Der gespeicherte Zugang läuft ab, der Token muss einmal neu eingegeben werden. |
| Nach 90 Tagen | Der Token selbst läuft ab → Schritt 2 und 3 wiederholen. |
| Gerät verloren/verkauft | Token auf GitHub widerrufen (Schritt 1). Der Geheimtext auf dem Gerät ist dann wertlos. |
| Person verlässt den Verein | Nur ihren Token widerrufen — alle anderen bleiben gültig. |

## Was bewusst anders ist als früher

**Die Benutzername/Passwort-Abfrage vor der Verwaltung ist weg.** Sie hat nichts
geschützt: sie war reine Anzeige-Logik, mit zwei Zeilen in der Browser-Konsole zu
überspringen, und dahinter lag nichts Vertrauliches — das Repository ist öffentlich.
Der zugehörige Passwort-Hash lag in `admin/auth.json` für jeden abrufbar im Netz.

Das Passwort ist jetzt kein Vorhang mehr, sondern der **Schlüssel zum Token**. Wer
es nicht kennt, bekommt den Token nicht — auch dann nicht, wenn er den Browser-Speicher
komplett ausliest.

> **Hinweis:** `admin/auth.json` wurde entfernt, bleibt aber in der Git-Historie
> öffentlich einsehbar. Falls das dortige Passwort auch anderswo verwendet wurde,
> ändere es dort.
