const express = require('express');




const { getHomeController, getEventsController } = require("../controllers/event-controller");

const router = express.Router();
router.use(express.json())
// event routes --> api/v1/
router.get('/', getHomeController) // home route
router.get('/events', getEventsController) // get all events route

module.exports = router
