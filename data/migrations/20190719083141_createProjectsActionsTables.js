
exports.up = function(knex) {
    return knex.schema
        .createTable('projects', tbl => {
            tbl.increments();
            tbl.text('name', 128).notNullable();
            tbl.text('description', 128);
            tbl.boolean('completed').notNullable().defaultTo(false);
        })
        .createTable('actions', tbl => {
            tbl.increments();
            tbl.text('description', 128).notNullable();
            tbl.text('notes', 128);
            tbl.boolean('completed').notNullable().defaultTo(false);
            tbl.integer('project_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('projects')
                .onUpdate('CASCADE')
                .onDelete('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('actions');
};
