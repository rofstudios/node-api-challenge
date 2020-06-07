let actions = require('../data/helpers/actionModel.js');

function validateId(req, res, next) {
    // checkting to see if id is valid/there are any actions with that id
    let id = req.params.id
    actions.get(id)
    .then(action => {
        if(action) {
            req.action = action;
            next();
        } else {
            res.status(404).json({ message: "Could not find that id"})
        }
    })
    .catch(err => {
        console.log(err, "500 at validating ID GET")
    })
}

module.exports = validateId;