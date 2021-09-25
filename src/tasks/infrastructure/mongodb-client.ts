import { MongoClient } from 'mongodb';

const uri = 'mongodb://local:localdba@0.0.0.0:27017';

/**
 * ローカル環境用MongoDBへのクライアント
 */
export const localMongoClient = new MongoClient(uri);
