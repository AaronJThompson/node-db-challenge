const express = require('express');

const ProjectsDB = require('./projects-model.js');

const router = express.Router();

function validateProject(req, res, next) {
    if (req.params.id) {
        try {
            const proj = ProjectsDB.findById(req.params.id);
            if (!proj) throw new Error('Project null');
            req.project = proj;
            next();
        } catch (error) {
            res.status(404).json({ error: "Project id not valid" });
        }
    }
    next();
}


router.get('/', async (req, res) => {
    try {
        const projects = ProjectsDB.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: "Couldn't get projects" });
    }
});

router.get('/:id', validateProject, async(req, res) => {
    try {
        const proj = await ProjectsDB.getProjectWithActions(req.project.id);
        res.status(200).json(proj);
    } catch (error) {
        res.status(500).json({ error: "Couldn't get project" });
    }
})