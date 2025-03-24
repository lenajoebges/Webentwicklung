# Webentwicklung

Projektidee: "Moodify"

1. Beschreibung: Idee
    Moodify ist eine Web-App, die Nutzern basierend auf ihrer aktuellen Stimmung passende Musik vorschlägt. Die Nutzer können zwischen verschiedenen Stimmungen wählen (z. B. fröhlich, traurig, motiviert, entspannt), und die Seite zeigt dazu passende Songs oder Playlists an. Zusätzlich können Nutzer ihre Lieblingslieder oder -stimmungen speichern, um später schnell darauf zugreifen zu können.

2. Seitenstruktur & Inhalte: Welche Unterseiten sind beinhaltet mit welchen Inhalten?
    - Startseite: Vorstellung der App und Auswahl/Eintrag der aktuellen Stimmung
    -> Buttons zur Auswahl der Stimmung (z. B. „Fröhlich“, „Traurig“, „Motiviert“, „Entspannt“)
    -> Anzeige passender Songs oder Playlists basierend auf der gewählten Stimmung mit detaillierte Informationen zu einem Song (z. B. Titel, Künstler, Link zum Anhören)
    - Favoriten-Seite (favorites.html): Liste der gespeicherten Lieblingssongs und die Möglichkeit, gespeicherte Songs aus der Favoritenliste zu löschen

3. Datenverwaltung:
    Welche Informationen soll die Anwendung permanent speichern können?
    - Nutzerstimmungen: Die vom Nutzer gewählte Stimmung wird gespeichert, um darauf basierende Musikvorschläge zu generieren.
    - Musikempfehlung: Die Mood buttons sind mit mit passenden Songs und Playlists auf Spotify verlinkt, so dass der user nach Eingabe der Stimmung direkt weitergeleitet wird.
    - Favoriten: Nutzer können Songs oder Stimmungen als Favoriten speichern und später erneut aufrufen. Der Nutzer hat die Möglichkeit, gespeicherte Songs oder Stimmungen zu löschen oder zu bearbeiten.

    Wie und wo sollen diese eingegeben oder erstellt werden?
    - Die Stimmung wird über eine Auswahl auf der Startseite eingegeben.
    - Songs und Stimmungen können über eine "Speichern"-Funktion in den Favoriten abgelegt und darunter aufgerufen werden.

    Wie und wo sollen diese bearbeitet und/oder gelöscht werden?
    - Nutzer können ihre Favoriten in der „Favoriten“-Unterseite verwalten.
    -> Es gibt eine Funktion zum Entfernen oder Ändern gespeicherter Einträge.

    Wie und wo sollen diese angezeigt werden?
    - Musikempfehlungen erscheinen in der „Musikvorschläge“-Sektion basierend auf der gewählten Stimmung.
    - Gespeicherte Favoriten sind in der „Favoriten“-Seite abrufbar.