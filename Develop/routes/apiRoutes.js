const router = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');

// Gets notes from db
router.get('/notes', (req, res) => {
    const db = fs.readFileSync('db/db.json', 'utf-8');
    res.json(JSON.parse(db));
})

// Adds new notes 
router.post('/notes', (req, res) => {
    console.log(req.body);
    const db = fs.readFileSync('db/db.json', 'utf-8');
    const firstArray = JSON.parse(db)
    req.body.id = uuid.v1();
    firstArray.push(req.body);
    const newArrayString = JSON.stringify(firstArray);
    fs.writeFileSync('db/db.json', newArrayString);

    res.json(req.body);
});

// Deletes the saved notes
router.delete('/notes/:uuid', (req, res) => {
    const db = fs.readFileSync('db/db.json', 'utf-8');
    const firstArray = JSON.parse(db);
    const newFilteredArray = firstArray.filter((note) => note.id !== req.params.uuid);
    const newArrayString = JSON.stringify(newFilteredArray);
    fs.writeFileSync('db/db.json', newArrayString);

    res.status(204).send();
});

module.exports = router;