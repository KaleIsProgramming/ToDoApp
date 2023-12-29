import Task from "../models/task"
import User from "../models/user"
import { Request, Response, NextFunction } from 'express';
import { tasks } from "../models/task";
import { users } from "../models/user";


exports.getTasks = (req: Request, res: Response, next: NextFunction) => {
    Task.getTasks()
    .then((data: tasks) => {
         return res.status(200).json({data: data})
     })
    .catch();
}

exports.postTask = (req: Request, res: Response, next: NextFunction) => {
    
    const task = new Task(
        req.body.name,
        req.body.priority,
        req.body.deadline,
        req.body.status,
        req.body.statusChangeDate,
        req.body.creator,
    )
    task.addTask();
}

exports.editTask = (req: Request, res: Response, next: NextFunction) => {

    if(req.body.name && req.body.priority && req.body.deadline && req.body.status && req.body.statusChangeDate && req.body.creator) {
        const task = new Task(
            req.body.name,
            req.body.priority,
            req.body.deadline,
            req.body.status,
            req.body.statusChangeDate,
            req.body.creator,
        )
        task.editTask(req.params.id).then(() => {
            Task.getTasks()
            .then((data: tasks) => {
                 return res.status(200).json({data: data})
             })
            .catch();
        }).catch();
    }
}

exports.removeTask = (req: Request, res: Response, next: NextFunction) => {
    Task.removeTask(req.params.id);
}
exports.postUser = (req: Request, res: Response, next: NextFunction) => {
    if(req.body.login && req.body.password) {
        const user = new User(
            req.body.login,
            req.body.password
        )
        user.addUser();
    }
}

exports.getUsers = (req: Request, res: Response, next: NextFunction) => {
    User.getUsers()
    .then((data: users) => {
         return res.status(200).json({data: data})
     })
    .catch();
}

