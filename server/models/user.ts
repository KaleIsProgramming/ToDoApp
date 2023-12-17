const getDb = require("../util/database").getDb;

export interface user {
    _id?: string;
    login: string;
    password: string;
}

export interface users {
    users: user[];
}

class User {
        login: string;
        password: string;

    constructor(login: string, password: string) {
        this.login = login;
        this.password = password;
    }

    addUser() {
        const db = getDb();
        db.collection('users').insertOne(this).then().catch();
    }

    static getUsers() {
        const db = getDb();
        return db.collection('users').find().toArray().then((data:users) => data).catch();
    }
}

export default User;