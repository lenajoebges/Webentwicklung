# Webentwicklung

Projektidee: WetterApp

1. Beschreibung
    Diese Webanwendung, die es Nutzern ermöglicht, das aktuelle Wetter für eine ausgewählte Stadt oder den eigenen Standort anzuzeigen. Zusätzlich bietet die Anwendung eine mehrtägige Wettervorhersage und die Möglichkeit, Favoritenstädte zu speichern, die schnell aufgerufen werden können. Weitere Funktionen beinhalten das Wetterradar und Informationen zur Funktionsweise der App.



2. Seitenstruktur & Inhalte
    - Startseite (index.html): Begrüßung, Suchfeld zur Eingabe einer Stadt, aktuelle Wetteranzeige
    - Wetterdetails (weather.html): Detaillierte Wetterdaten für die eingegebene Stadt (Temperatur, Wetterbedingungen, Windgeschwindigkeit, Luftfeuchtigkeit)
    - Favoriten (favorites.html): Liste der vom Nutzer gespeicherten Städte, die als Favoriten angezeigt werden
    - Wetterverlauf (radar.html): Wetterradar (Regenradar) mit interaktiven Karten und Wetterdaten für eine präzisere Vorhersage
    - Über die App (about.html)	Informationen über die Funktionsweise der App

3. Datenverwaltung
    - Welche Daten werden gespeichert?
    Stadtname: Eingabe durch den Nutzer (wird verwendet, um das Wetter für die Stadt abzurufen)
    Aktuelle Wetterdaten: Temperatur, Wetterzustand, Windgeschwindigkeit, Luftfeuchtigkeit
    Favoritenstädte: Städte, die vom Nutzer für schnellen Zugriff gespeichert werden
    Suchverlauf: Die zuletzt gesuchten Städte zur schnellen Wiederverwendung 
    - Wo und wie werden diese Daten eingegeben?
    Stadtname: Der Nutzer gibt den Städtenamen über das Suchfeld auf der Startseite (index.html) ein.
    Favoriten: Städte können über einen Button in der Seite weather.html als Favoriten gespeichert werden, sodass sie später auf der Seite favorites.html angezeigt werden.
    - Wo und wie werden die Daten angezeigt?
    Aktuelle Wetterdaten: Diese werden auf der Seite weather.html angezeigt, nachdem eine Stadt eingegeben wurde.
    Favoritenstädte: Gespeicherte Favoritenstädte werden auf der Seite favorites.html in einer Liste dargestellt.
    Wetterverlauf: Der Verlauf der letzten Suchen und der dazugehörige Wetterverlauf wird auf history.html gespeichert und angezeigt.
    - Wie und wo können Daten bearbeitet oder gelöscht werden?
    Favoritenstädte können aus der Liste auf favorites.html hinzugefügt oder entfernt werden
    - Wie und wo sollen diese Daten angezeigt werden?
        Aktuelle Wetterdaten:
            Seite: weather.html
            Beschreibung: Nachdem der Nutzer eine Stadt auf der Startseite (index.html) eingegeben hat, wird auf der Seite weather.html das aktuelle Wetter dieser Stadt angezeigt (Temperatur, Wetterzustand (z. B. Sonnig, Regen, Schnee), Windgeschwindigkeit, Luftfeuchtigkeit)
        Wettervorhersage (optional):
            Seite: weather.html
            Beschreibung: Unter den aktuellen Wetterdaten könnte auch eine kurze mehrtägige Wettervorhersage angezeigt werden, die dem Nutzer eine Vorschau der nächsten Tage für die gewählte Stadt gibt.
            Darstellung: Eine Tabelle oder mit den Vorhersagen für Temperatur und Wetterzustand der nächsten Tage (z. B. Tag 1, Tag 2, Tag 3).
        Favoritenstädte:
            Seite: favorites.html
            Beschreibung: Auf dieser Seite werden alle Städte angezeigt, die der Nutzer als Favoriten speichern kann. Diese Städte können schnell aufgerufen werden, ohne sie erneut eingeben zu müssen. 
            Darstellung: Ein „Favoriten“-Button wird neben den Wetterdaten angezeigt, und wird als Favorit gespeichert. Es erscheint ein Symbol auf der Seite, um anzuzeigen, dass die Stadt zur Favoritenliste hinzugefügt wurde.
        Wetterverlauf:
            Seite: radar.html
            Beschreibung: Das Radar zeigt für die aktuelle Stadt Wetter Details, wie Regen oder Gewitter in der Umgebung an.
            Darstellung: Das Radar wird auf einer Karte der jeweiligen Stadt angezeigt. 
            Der Nutzer kann auf der Karte die Wetterbedingungen in Echtzeit sehen und über den Tag verfolgen (z. B. Regen- oder Schneefall).

