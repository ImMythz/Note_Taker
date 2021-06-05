const router = require('express').Router();
const fs = require('fs');

router.get('/notes', (req, res) => {
    const db = fs.readFileSync('db/db.json', 'utf-8');
    res.json(db); // Parse this
})

module.exports = router;