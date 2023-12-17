'use client';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';

export interface task {
    _id: string;
    name: string;
    priority: number;
    deadline: Date;
    status: boolean;
    statusChangeDate: Date;
    creator: string;
}

export interface taskPostData {
    name: string;
    priority: number;
    deadline: Date;
    status: boolean;
    statusChangeDate: Date;
    creator: string;
}

interface tasks {
    tasks: task[];
}

interface removeId {
    id: string;
}

const initialState: tasks = {
    tasks: [],
};

export const postTask = createAsyncThunk(
    "post_task",
    async (payload:taskPostData, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });

         axios.post('http://localhost:3001/post-task', {
            name: payload.name,
            priority: payload.priority,
            deadline: payload.deadline,
            status: payload.status,
            statusChangeDate: payload.statusChangeDate,
            creator: payload.creator
        });

        return axios.get('http://localhost:3001/get-tasks')
        
    }
)

export const editTask = createAsyncThunk(
    "edit_task",
    async (payload:task, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });

        return axios.put(`http://localhost:3001/edit-task/${payload._id}`, {
            name: payload.name,
            priority: payload.priority,
            deadline: payload.deadline,
            status: payload.status,
            statusChangeDate: payload.statusChangeDate,
            creator: payload.creator
        });

         
        
    }
)

export const removeTask = createAsyncThunk(
    "remove_task",
    async (payload:removeId, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });

        axios.delete(`http://localhost:3001/remove-task/${payload.id}`);
        return axios.get('http://localhost:3001/get-tasks')
    }
)

export const getTasks = createAsyncThunk(
    "get_tasks",
    async (payload, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });
        const tasks = axios.get('http://localhost:3001/get-tasks');

        return tasks
        
    }
)



const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
    },
    extraReducers(builder) {
        builder.addCase(getTasks.fulfilled, (state, {payload}: any) => {
            state.tasks = payload.data.data;
        });
        builder.addCase(removeTask.fulfilled, (state, {payload}: any) => {
            state.tasks = payload.data.data;
        });
        builder.addCase(editTask.fulfilled, (state, {payload}: any) => {
            state.tasks = payload.data.data;
        });
    }
});

export default tasksSlice.reducer;