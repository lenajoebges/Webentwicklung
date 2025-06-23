const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const sqlite = require('sqlite');

const app = express();
const PORT = 3000;
const dbPath = path.join(__dirname, '../database/db/moodify.db');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend')));

(async () => {
  try {
    const db = await sqlite.open({ filename: dbPath, driver: sqlite3.Database });

    await db.exec(`
      CREATE TABLE IF NOT EXISTS moodify (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titel TEXT NOT NULL,
        url TEXT NOT NULL
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY,
        titel TEXT NOT NULL,
        url TEXT NOT NULL
      );
    `);

    await db.close();
    console.log("Tabellen erfolgreich geprüft/erstellt.");
  } catch (err) {
    console.error("Fehler beim Initialisieren der Datenbank:", err);
  }
})();

app.get('/api/moods', async (req, res) => {
  try {
    const db = await sqlite.open({ filename: dbPath, driver: sqlite3.Database });
    const moods = await db.all('SELECT * FROM moodify');
    await db.close();
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Laden der Moods" });
  }
});

app.post('/api/moods', async (req, res) => {
  const { titel, url } = req.body;
  if (!titel || !url) return res.status(400).json({ error: "Titel und URL erforderlich" });

  try {
    const db = await sqlite.open({ filename: dbPath, driver: sqlite3.Database });
    const result = await db.run('INSERT INTO moodify (titel, url) VALUES (?, ?)', [titel, url]);
    await db.close();
    res.status(201).json({ id: result.lastID, titel, url });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Speichern der Mood" });
  }
});

app.delete('/api/moods/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const db = await sqlite.open({ filename: dbPath, driver: sqlite3.Database });
    await db.run('DELETE FROM moodify WHERE id = ?', [id]);
    await db.close();
    res.status(200).json({ message: "Mood gelöscht" });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Löschen des Moods" });
  }
});

app.get('/api/favorites', async (req, res) => {
  try {
    const db = await sqlite.open({ filename: dbPath, driver: sqlite3.Database });
    const result = await db.all('SELECT * FROM favorites ORDER BY rowid DESC');
    await db.close();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Laden der Favoriten" });
  }
});

app.post('/api/favorites', async (req, res) => {
  const { id, titel, url } = req.body;

  if (!id || !titel || !url) {
    return res.status(400).json({ error: "ID, Titel und URL sind erforderlich" });
  }

  try {
    const db = await sqlite.open({ filename: dbPath, driver: sqlite3.Database });
    await db.run('INSERT INTO favorites (id, titel, url) VALUES (?, ?, ?)', [id, titel, url]);
    await db.close();
    res.status(201).json({ id, titel, url });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Speichern des Favoriten" });
  }
});

app.delete('/api/favorites/:id', async (req, res) => {
  try {
    const db = await sqlite.open({ filename: dbPath, driver: sqlite3.Database });
    await db.run('DELETE FROM favorites WHERE id = ?', [req.params.id]);
    await db.close();
    res.json({ message: "Favorit gelöscht" });
  } catch (error) {
    res.status(500).json({ error: "Fehler beim Löschen des Favoriten" });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft unter http://localhost:${PORT}`);
});