const notedb = require('../db/notes')
module.exports = (app) => {
    app.get("/api/notes", (req, res) => {
        notedb.getNotesDB()
        .then(notes => {
            return res.json(notes)
        })
    })

    app.post("/api/notes", (req, res) => {
        console.log("connected post")
        notedb.writeNewNote(req.body)
        .then(note => {
            return res.json(note)
        })
    })

    app.delete(`/api/notes/:id`, (req, res) => {
        console.log('delete note')
        notedb.deleteNote(req.params.id)
        .then(() => {
            res.json({okay: true})
        })
    })

}

