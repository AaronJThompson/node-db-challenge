const express = require('express');

const ProjectsDB = require('../projects/projects-model');
const validators = require('../projects/projects-router');

const router = express.Router();

async function validateAction(req, res, next) {
    if (req.params.id) {
        try {
            const act = await ProjectsDB.findAction(req.params.id);
            if (!act) throw new Error('Action null');
            req.actiion = act;
            next();
        } catch (error) {
            res.status(404).json({ error: "Action id not valid" });
            return;
        }
    } else {
        next();
    }
}
router.update('/:id', validateAction, validators.validateNewAction, async (req,res) => {
    
})

module.exports = router;