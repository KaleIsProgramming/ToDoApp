
import { MongoClient } from 'mongodb';

let _db: any;

const mongoConnect = (callback:any) => {
    const client = new MongoClient('mongodb+srv://123:1234567890@todo.wjrlivv.mongodb.net/');
    _db = client.db('ToDoApp');
    callback();
}

const getDb = () => {
    if(_db) {
        return _db;
    }
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;