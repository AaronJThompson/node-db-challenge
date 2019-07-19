const db = require('./dbConfig');

module.exports = {
    find,
    findById,
    getProjectActions,
    getProjectWithActions,
    insert,
    remove,
    update,
    findAction,
    insertAction,
    updateAction,
    removeAction,
}

function find() {
    return db('projects');
}

function findById(id) {
    return db('projects')
        .where({ id: Number(id) })
        .then(ids => ids[0]);
}

function getProjectActions(id) {
    return db('actions')
        .select(['id', 'description', 'notes', 'completed'])
        .where({ project_id: Number(id) });
}

async function getProjectWithActions(id) {
    const proj = await findById(id);
    proj.actions = getProjectActions(id);
    return proj;
}

function insert(proj) {
    return db('projects')
        .insert(proj)
        .then(ids => findById(ids[0]));
}

async function remove(id) {
    const proj = await findById(id);
    return db('projects')
        .where({ id: Number(id) })
        .del()
        .then(() => proj);
}

function update(fields, id) {
    return db('projects')
        .where({ id: Number(id) })
        .update(fields)
        .then(() => findById(id));
}

function findAction(id) {
    return db('actions')
        .where({ id: Number(id) })
        .then(ids => ids[0]);
}

function insertAction(action, id) {
    const actionWithProj = {...action, project_id: Number(id)};
    return db('actions')
        .insert(actionWithProj)
        .then(ids => findAction(ids[0]));
}

function updateAction(fields, id) {
    return db('actions')
        .where({ id: Number(id) })
        .update(fields)
        .then(() => findAction(id));
}

function removeAction(id) {
    const act = await findAction(id);
    return db('actions')
        .where({ id: Number(id) })
        .del()
        .then(() => act);
}