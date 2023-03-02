require('dotenv').config();

const { Deepstream } = require('@deepstream/server');
//const { applicationConfig } = require('dotenv').config();

/*
The server can take
1) a configuration file path
2) null to explicitly use defaults to be overriden by server.set()
3) left empty to load the base configuration from the config file located within the conf directory.
4) pass some options, missing options will be merged from the base configuration.
*/

const server = new Deepstream({
  serverName: 'nest-deepstream',
  storage: {
    name: 'postgres',
    options: {
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      database: process.env.DATABASE_NAME,
      password: process.env.DATABASE_PASSWORD,
      port: 5432,
      schema: 'ds',
      defaultTable: 'nestdefault',
      max: 10,
      idleTimeoutMillis: 30000,
      writeInterval: 200,
      useJsonb: false,
      notifications: {
        CREATE_TABLE: true,
        DESTROY_TABLE: true,
        INSERT: true,
        UPDATE: true,
        DELETE: true,
      },
    },
  },
});

// start the server
server.start();
