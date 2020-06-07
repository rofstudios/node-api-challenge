// let router = require('express').Router();
let express = require('express')
let router = express.Router();

let actions = require('../data/helpers/projectModel.js');

router.get('/', (req, res) => {
    actions.get()
    .then(projectList => {
        res.status(200).json(projectList)
    })
    .catch(err => {
        console.log(err, "500 err at GET")
        res.status(500).json({ error: "Could not process action" })
    })
})

// Endpoints

module.exports = router;
