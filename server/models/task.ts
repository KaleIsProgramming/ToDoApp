const getDb = require("../util/database").getDb;
const mongodb = require('mongodb');

export interface task {
    id?: string;
    name: string;
    priority: number;
    deadline: string;
    status: boolean;
    statusChangeDate: string;
    creator: number;
}

export interface tasks {
    tasks: task[];
}

class Task {
        name: string;
        priority: number;
        deadline: string;
        status: boolean;
        statusChangeDate: string;
        creator: number;

    constructor(name: string, priority: number, deadline: string, status: boolean, statusChangeDate: string, userID: number) {
        this.name = name;
        this.priority = priority;
        this.deadline = deadline;
        this.status = status;
        this.statusChangeDate = statusChangeDate;
        this.creator = userID;
    }

    addTask() {
        const db = getDb();
        db.collection('tasks').insertOne(this).then().catch();
    }

    static getTasks() {
        const db = getDb();
        return db.collection('tasks').find().toArray().then((data:tasks) => data).catch();
    }

    editTask(id:string) {
        const db = getDb();
        return db.collection('tasks').updateOne({_id: new mongodb.ObjectId(id)}, {$set: this}).then().catch();
    }
    
    static removeTask(id: string) {
        const db = getDb();
        return db.collection('tasks').deleteOne({_id: new mongodb.ObjectId(id)}).then().catch();
    }
}

export default Task;