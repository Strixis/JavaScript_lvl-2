const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./handler');
const path = require('path');

const userCartJSONPath = path.resolve(__dirname, './db/userCart.json');

router.get('/', (req, res) => {
    fs.readFile(userCartJSONPath, 'utf-8', (err, data) => {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            res.send(data);
        }
    })
});
router.post('/', (req, res) => {
    handler(req, res, 'add', userCartJSONPath);
});
router.put('/:id', (req, res) => {
    handler(req, res, 'change', userCartJSONPath);
});
router.delete('/:id', (req, res) => {
	handler(req, res, 'remove', userCartJSONPath);
});

module.exports = router;