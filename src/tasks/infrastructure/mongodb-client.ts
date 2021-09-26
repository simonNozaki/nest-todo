import { Collection, MongoClient } from 'mongodb';

const uri = 'mongodb://local:localdba@0.0.0.0:27017';

/**
 * ローカル環境用MongoDBへのクライアント
 */
export const localMongoClient = new MongoClient(uri);

/**
 * データベース名: local
 */
export type MongoDbDatabase = 'local';

/**
 * コレクション名: tasks
 */
export type MongoDbCollection = 'tasks';

/**
 * MongoDBのコレクションを返す
 * @param {T} t 型パラメータ
 * @param {MongoDbCollection} databaseName データベース名
 * @param {MongoDbCollection} collectionName コレクション名
 * @returns Collection
 */
export const selectCollection = async <T>(
  databaseName: string,
  collectionName: string,
): Promise<Collection<T>> => {
  await localMongoClient.connect();
  const database = localMongoClient.db(databaseName);
  return database.collection<T>(collectionName);
};
