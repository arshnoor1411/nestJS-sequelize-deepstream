const { Connector } = require('@deepstream/storage-postgres');
const settings = {
  user: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT, 10),
};

console.log('Connector', Connector);

const connector = new Connector(settings);

// start connector
connector.init();

connector.on('ready', () => {
  connector.subscribe(
    (event) => {
      //event will be a map of event and table for CREATE_TABLE and DESTROY_TABLE
      // { event: 'CREATE_TABLE', table: 'some-table' })
      // or of event, table and key for INSERT, UPDATE AND DELETE, e.g.
      // { event: 'INSERT', table: 'some-table', key: 'some-key' }
    },
    (err) => {
      if (err) throw err;
    },
  );

  //subscriptions can be removed
  connector.unsubscribe((err) => {
    /* done */
  });

  // the connector also comes with a facility to get a map of all tables and the numbers of items within
  connector.getSchemaOverview((err, result) => {
    /* result will be e.g.
        {
            'some-table': 2,
            'some-other-table': 1,
            'new-table': 1,
            'table-a': 2,
            'table-b': 2
        }
        */
  });
});
