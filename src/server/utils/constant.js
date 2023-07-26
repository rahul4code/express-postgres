// const connectionObject="postgres://postgres:abcd1234@localhost:5432/postgres"
const connectionObject = {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'abcd1234',
      database: 'postgres',
    },
  };

module.exports=connectionObject;
