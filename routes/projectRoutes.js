// let router = require('express').Router();
let express = require('express')
let router = express.Router();

let projects = require('../data/helpers/projectModel.js');

// MIDDLEWARE

let validateProjectId = require('../Middleware/validateProjectId.js');

// Endpoints =========================================================== GET ==========

router.get('/', (req, res) => {
    projects.get()
    .then(projectList => {
        res.status(200).json(projectList)
    })
    .catch(err => {
        console.log(err, "500 err at GET")
        res.status(500).json({ error: "Could not process action" })
    })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

// ==================================================================== POST ==========
 
router.post('/', (req, res) => {
    let newProject = req.body;
    if(newProject) {
        if(!newProject.name || !newProject.description) {
            res.status(400).json({ errorMessage: "Please provide name and description of new project" })
        } else {
            projects.insert({...newProject})
            .then(project => {
                res.status(201).json(project)
            })
            .catch(err => {
                res.status(500).json({ error: "Could not make your request"})
            })
        }
    } else {
        res.status(404).json({ message: "No data found"})
    }
})

router.put('/:id', validateProjectId, (req, res) => {
    // let id = req.params.id;

    projects.update(req.params, req.body)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(err => {
        res.status(404).json({ error: "Verify data to update" })
    })
})

router.delete('/:id', validateProjectId, (req, res) => {

    projects.remove(req.params)
    .then(removed => {
        if(removed > 0) {
            res.status(200).json({ message: `Removed project with id ${req.params}`})
        } else {
            res.status(400).json({ message: "Could not remove your project"})
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Could compute process" })
    })
})

module.exports = router;
