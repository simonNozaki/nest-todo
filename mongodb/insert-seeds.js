/* eslint-disable @typescript-eslint/no-var-requires */
const client = require('./client').client;
const db = require('./client').db;
const v4 = require('uuid').v4;

const addNDate = (base, days) => {
  base.setDate(base.getDate() + days);
  return base;
};

const now = new Date();
const deadline = addNDate(now, 7);

const taskRecords = [
  {
    id: v4().toString(),
    title: '相談する',
    description: '',
    status: 'IN PROGRESS',
    deadline: deadline,
    createdAt: now.toISOString(),
    createdBy: '',
    updatedAt: now.toISOString(),
    updatedBy: '',
  },
  {
    id: v4().toString(),
    title: '共有資料作成',
    description: '',
    status: 'UNPROCESSED',
    deadline: deadline,
    createdAt: now.toISOString(),
    createdBy: '',
    updatedAt: now.toISOString(),
    updatedBy: '',
  },
  {
    id: v4().toString(),
    title: 'mtgの日程・アジェンダ調整',
    description: '',
    status: 'UNPROCESSED',
    deadline: deadline,
    createdAt: now.toISOString(),
    createdBy: '',
    updatedAt: now.toISOString(),
    updatedBy: '',
  },
  {
    id: v4().toString(),
    title: 'レビュー',
    description: '',
    status: 'UNPROCESSED',
    deadline: deadline,
    createdAt: now.toISOString(),
    createdBy: '',
    updatedAt: now.toISOString(),
    updatedBy: '',
  },
];

const main = async () => {
  await client.connect();
  console.log('MongoDBへの接続を開いています...');

  const database = client.db(db);
  const collection = database.collection('tasks');

  const result = await collection.insertMany(taskRecords);
  console.log(`登録したドキュメント件数 => ${result.insertedCount}`);
};

main()
  .then((_) => console.log('初期データ投入完了'))
  .finally((_) => client.close());
