// let router = require('express').Router();
let express = require('express')
let router = express.Router();

let actions = require('../data/helpers/actionModel.js');

// MIDDLEWARE

let validateId = require('../Middleware/validateID.js')


// Endpoints =========================================================== GET ==========

router.get('/', (req, res) => {
    actions.get()
    .then(actionList => {
        res.status(200).json(actionList)
    })
    .catch(err => {
        console.log(err, "500 err at GET")
        res.status(500).json({ error: "Could not process action" })
    })
})

// ======================================== GET by ID ==========


router.get('/:id', validateId, (req, res) => {
    res.status(200).json(req.action)
})

//==================================================================== POST ===========
// posting a new action and connecting to dynamic project id
router.post('/', (req, res) => {
    let newProject = req.body;

    // if (newProject) {
    //     projects.insert(req.body)
    //     .then(project => {
    //         res.status(201).json(project)
    //     })
    //     .catch(err => {
    //         res.status(500).json({ error : "Cannot post"})
    //     })
    // }
    
    if(newProject) {
        if(!newProject.description || !newProject.notes) {
            res.status(400).json({ errorMessage : " Please provide descriptin and summary for new project"})
        } else {
            actions.insert({...newProject})
            .then(project => {          
                res.status(201).json(newProject)
            })
            .catch(err => {
                console.log(err, "500 err @ post /:id")
                res.status(500).json({ error: "Could not create new project"})
            })
        }
    } else {
        res.status(404).json({ message: `Could not find a project with id ${id}`})
    }

})

// ==================================================================== PUT ===========

router.put('/:id',validateId, (req, res) => {
    let id = req.params.id;
    let updatedAction = req.body;
    actions.update(id, updatedAction)
    .then(updated => {
        res.status(200).json(updated)
    })
    .catch(err => {
        res.status(404).json({ error: "Verify description and notes"})
    })

    // actions.get(id)
    // .then(action)
    //     if(action) {
    //         try {
    //             actions.update({id, updatedAction})
    //             .then(updated => {
    //                 res.status(200).json(updated)
    //             })
    //             .catch(err => {
    //                 res.status(500).json({error: "Could not process your request"})
    //             })
    //         }
    //         catch(err) {
    //             res.status(404).json({ message: "Verify information"})
    //         }
    //     }
    // .catch(err => {
    //     res.status(400).json({ message: "Improper ID"})
    // })
})

module.exports = router;