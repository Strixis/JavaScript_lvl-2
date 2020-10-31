const moment = require('moment')

let writeStats = (stats, req) => {
	let date = moment().format('MMMM Do YYYY, h:mm:ss a');
    stats.push({
    	action: req.body.action,
    	product: req.body.product_name,
    	user_time: req.body.date,
    	server_time: date
    });
    return JSON.stringify(stats, null, 4);
};

module.exports = {
	writeStats
};