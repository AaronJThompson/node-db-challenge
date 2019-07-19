// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true, // needed for sqlite
    connection: {
      filename: './data/recipebook.db3',
    },
    migrations: {
      directory: './data/migrations'
    },
  }, 
};
