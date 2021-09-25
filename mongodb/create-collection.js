/* eslint-disable @typescript-eslint/no-var-requires */
const client = require('./client').client;
const db = require('./client').db;

const main = async () => {
  await client.connect();
  console.log('MongoDBサーバへ接続中...');

  const database = client.db(db);
  await database.createCollection('tasks');
};

main()
  .then((_) => console.log('データベース初期化完了'))
  .finally((_) => client.close());
