let actions = require('../data/helpers/projectModel.js');

function validateProjectId(req, res, next) {
    // checkting to see if id is valid/there are any actions with that id
    let id = req.params.id
    actions.get(id)
    .then(project => {
        if(project) {
            req.project = project;
            req.params = id; 
            next();
        } else {
            res.status(404).json({ message: `Could not find project with id ${id}`})
        }
    })
    .catch(err => {
        console.log(err, "500 at validating ID GET")
    })
}


module.exports = validateProjectId