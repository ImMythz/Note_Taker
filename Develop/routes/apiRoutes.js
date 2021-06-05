const router = require('express').Router();
const fs = require('fs');
const uuid = require('uuid');

router.get('/notes', (req, res) => {
    const db = fs.readFileSync('db/db.json', 'utf-8');
    res.json(JSON.parse(db));
})

router.post('/notes', (req, res) => {
    console.log(req.body);
    const db = fs.readFileSync('db/db.json', 'utf-8');
    const newArray = JSON.parse(db)
    req.body.id = uuid.v1();
    newArray.push(req.body);
    const updatedArrayString = JSON.stringify(newArray);
    fs.writeFileSync('db/db.json', updatedArrayString);

    res.json(req.body);
});

router.delete('/notes/:uuid', (req, res) => {
    const db = fs.readFileSync('db/db.json', 'utf-8');
    const newArray = JSON.parse(db);
    const newFilteredArray = newArray.filter((note) => note.id !== req.params.uuid);
    const updatedArrayString = JSON.stringify(newFilteredArray);
    fs.writeFileSync('db/db.json', updatedArrayString);

    res.status(204).send();
});

module.exports = router;