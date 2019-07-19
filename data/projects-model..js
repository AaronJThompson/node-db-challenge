const db = require('./dbConfig');

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
        .where({ project_id: Number(id) });
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