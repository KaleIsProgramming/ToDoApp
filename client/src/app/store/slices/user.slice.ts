'use client';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export interface user {
    _id: string;
    login: string;
    password: string;

}

export interface postUser {
    login: string;
    password: string;

}

export interface usersInitial {
    users: user[];
    loggedUser: user;
}

const initialState: usersInitial = {
    users: [],
    loggedUser: {
        _id:'6578b7c792c0ab7a2abaae5a', 
        login: 'Guest', 
        password: 'admin'
    }
};


export const getUsers = createAsyncThunk(
    "get_users",
    async (payload, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });
        return axios.get('http://localhost:3001/get-users');
        
    }
)

// export const getUser = createAsyncThunk(
//     "get_user",
//     async (payload:{login: string;}, {signal}) => {
//         const source = axios.CancelToken.source();
//         signal.addEventListener('abort', () => {
//             source.cancel();
//         });
//         return axios.get(`http://localhost:3001/get-user/${payload.login}`);
        
//     }
// )

export const postUser = createAsyncThunk(
    "post-users",
    async (payload: postUser, {signal}) => {
        const source = axios.CancelToken.source();
        signal.addEventListener('abort', () => {
            source.cancel();
        });
        
        
        axios.post('http://localhost:3001/post-user', {login: payload.login ,password: payload.password});
        return axios.get(`'http://localhost:3001/get-users`);
    }
)



const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setActiveUser(state, payload:any) {
            state.loggedUser = payload; 

        }
    },
    extraReducers(builder) {
        builder.addCase(getUsers.fulfilled, (state, {payload}: any) => {
            state.users = payload.data.data;
        });
        // builder.addCase(getUser.fulfilled, (state, {payload}: any) => {
        //     state.loggedUser._id = payload.data.data._id;
        //     state.loggedUser.login = payload.data.data.login;
        //     state.loggedUser.password = payload.data.data.password;
        // });
        builder.addCase(postUser.fulfilled, (state, {payload}: any) => {
            console.log(payload)
            state.users = payload.data.data;
        });

    }
});

export default usersSlice.reducer;