// SQLite Modul in Node.js Code verwenden
const sqlite3 = require('../database/zipInstall/node_modules/sqlite3/lib/sqlite3');
const sqlite = require('sqlite');

// SQLite Datei angeben
const dbFilePath = 'moodify.db';

async function main() {
  // Mit Datenbank verbinden
  const db = await sqlite.open({
    filename: dbFilePath,
    driver: sqlite3.Database,
  });

  // Auf Datenbank zugreifen (z. B. SELECT Befehl)
  const students = await db.all('SELECT * FROM moodify');
  console.log(students);

  // Verbindung zu Datenbank beenden
  await db.close();
}

main();

// MongoDB Modul in Node.js Code verwenden
const mongodb = require('../database/zipInstall/node_modules/mongodb/mongodb');

// MongoDB URL und Client für Zugriff anlegen
const mongoUrl = 'mongodb://127.0.0.1:27017'; // für lokale MongoDB
const mongoClient = new mongodb.MongoClient(mongoUrl);

async function main() {
  // Mit MongoDB verbinden
  await mongoClient.connect();

  // Auf university Datenbank -> student Collection zugreifen
  const db = mongoClient.db("university");
  const studentCollection = db.collection("student");

  // Datensatz (Student) einfügen
  const newStudent = {
    studentNr: 333333,
    firstName: "Max",
    lastName: "Mustermann",
    semester: 1,
    faculty: "DM",
    course: "OMB",
  };
  await studentCollection.insertOne(newStudent);

  // Datensatz suchen
  const student = await studentCollection.findOne({ studentNr: 333333 });
  console.log(student);

  // Verbindung zu MongoDB beenden
  await mongoClient.close();
}

main();