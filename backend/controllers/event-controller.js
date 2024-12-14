const events = [{name: 'click', type: 'click'}, {name: 'hover', type: 'hover'}]
const logger = require('morgan');
const getHomeController = (req, res) => {
    res.send("GET HOME PAGE")
};

const getEventsController = (req, res) => {
    res.status(200).json({events})

};


module.exports = {
    getHomeController,
    getEventsController
}