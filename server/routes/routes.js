const express = require('express');
const router = express.Router();
const PeopleController = require('../modules/peopleController');


router.get('/', PeopleController.getPeople);

module.exports = router;