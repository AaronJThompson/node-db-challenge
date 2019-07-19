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

function validateNewProject(req, res, next) {
    const { name, description } = req.body;
    const errors = [];
    try {
        if (name) {
            if (name.length > 128) errors.push({ error: "Name field limit is 128 characters" });
            if (description && description.length > 128) errors.push({ error: "Description field limit is 128 characters" });
            if (errors.length === 0) {
                req.project = { name, description };
                next();
            } else {
                res.status(400).json(errors);
            }
        } else {
            throw new Error('Name is required');
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
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

router.post('/', validateNewProject, async (req, res) => {
    try {
        const proj = await ProjectsDB.insert(req.project);
        res.status(201).json(proj);
    } catch (error) {
        res.status(500).json({ error: "Couldn't add project" });
    }
})