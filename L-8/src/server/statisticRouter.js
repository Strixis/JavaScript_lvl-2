const express = require('express');
const fs = require('fs');
const router = express.Router();
const handlerStats = require('./handlerStats');

const statsJSONPath = path.resolve(__dirname, './db/stats.json');

router.get('/', (req, res) => {
    fs.readFile(statsJSONPath, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});
router.post('/', (req, res) => {
    handlerStats(req, res, 'writeStats', statsJSONPath);
});

module.exports = router;