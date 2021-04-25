const { json } = require('express');
const fs = require('fs');
const util = require('util')
const asyncReadFile = util.promisify(fs.readFile)
const asyncWriteFile = util.promisify(fs.writeFile)

class Notes {
    getNotesDB() {
        console.log('connected get')
        return asyncReadFile("db/db.json").then(notes => {

            return JSON.parse(notes)
        })
    }

    writeNewNote(note) {
        const newNote = {...note, id: Math.random().toString()}
        // notes.push(newNote)
        return this.getNotesDB()
        .then(notes => [...notes, newNote])
        .then(newNotes => {
            return asyncWriteFile("db/db.json", JSON.stringify(newNotes))
        }).then( () => newNote)

    }
    deleteNote(id) {
        console.log(id)
        return this.getNotesDB()
        .then(notes => {
            console.log(notes)
            return notes.filter(note => note.id !== id)})
        .then(updatedNotes => {
            return asyncWriteFile("db/db.json", JSON.stringify(updatedNotes))
        });

    }
}

module.exports = new Notes()