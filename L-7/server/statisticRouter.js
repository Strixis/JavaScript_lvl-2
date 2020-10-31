const express = require('express');
const fs = require('fs');
const router = express.Router();
const handlerStats = require('./handlerStats');

router.get('/', (req, res) => {
    fs.readFile('server/db/stats.json', 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});
router.post('/', (req, res) => {
    handlerStats(req, res, 'writeStats', 'server/db/stats.json');
});

module.exports = router;