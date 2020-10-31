const statistic = require('./statistic');
const fs = require('fs');

const actions = {
    writeStats: statistic.writeStats
};

let handlerStats = (req, res, action, file) => {
    fs.readFile(file, 'utf-8', (err, data)=> {
        if(err){
            res.sendStatus(404, JSON.stringify({result:0, text: err}));
        } else {
            let newStat = actions[action](JSON.parse(data), req);
            fs.writeFile(file, newStat, (err) => {
                if(err){
                    res.sendStatus(404, JSON.stringify({result:0, text: err}));
                } else {
                    res.send(JSON.stringify({result: 1}))
                }
            })
        }
    })
};

module.exports = handlerStats;