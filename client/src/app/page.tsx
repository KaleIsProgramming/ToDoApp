'use client';
import { useState } from "react";
import { useAppDispatch } from "./store";
import { TaskList, PopUp } from "@/app/components";
import { getTasks, postTask, postUser } from './store/slices';
import { useAppSelector } from "./store";
import { user } from "./store/slices";

export default function Home() {
  const curr = new Date();
  const date = curr.toISOString().substring(0,10);
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userSlice.users);
  const [activeUser, setActiveUser] = useState<user>({_id: "6578b7c792c0ab7a2abaae5a",login:'Guest' ,password: 'admin' });
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpType, setPopUpType] = useState('');

  const submitUserHandler = (e:any, type:string) => {

    const passwordI = document.getElementById('password') as HTMLInputElement;
    const loginI = document.getElementById('login') as HTMLInputElement;
    const password1I = document.getElementById('password1') as HTMLInputElement;
    const login1I = document.getElementById('login1') as HTMLInputElement;
    if(type=='registration') {
      setIsPopUpOpen(!isPopUpOpen);
      setPopUpType('register');
      dispatch(postUser({login: login1I.value, password: password1I.value}));
    } else {
      e.preventDefault();
      setIsPopUpOpen(!isPopUpOpen);
      setPopUpType('login');
      if(users.filter(user => user.login == loginI.value)[0]) {
        const user = users.filter(user => user.login == loginI.value)
        setActiveUser(user[0])
      }
    }

    passwordI.value ='';
    loginI.value = '';
  }


  const priorityLvlHandler = (e:any) => {
    if(e.target.value < 1 || e.target.value > 3) {
      e.target.value = 1;
    }
  }

  const createNewTaskHandler = () => { 
    const nameInput = document.getElementById('name') as HTMLInputElement;
    const priorityInput = document.getElementById('priority') as HTMLInputElement;
    const deadlineInput = document.getElementById('deadline') as HTMLInputElement;

    if(deadlineInput.valueAsDate) {
      dispatch(postTask({ 
        name: nameInput.value, 
        priority: priorityInput.valueAsNumber, 
        deadline: deadlineInput.valueAsDate, 
        status: true, 
        statusChangeDate: new Date(), 
        creator: activeUser._id}))
      dispatch(getTasks())
  }
  }

  return (
      <main className="flex min-h-screen min-w-full  items-center justify-center bg-purple">
          <div className="text-black h-192 w-256 bg-white rounded-xl">
            <div className="h-1/4 w-full border-b-2 border-gray">
              <div className="flex items-center justify-center h-1/2 w-full">
                  <div className="flex items-center h-full w-1/2">
                    <h1 className="font-bold text-3xl pointer-events-none select-none ml-seventh">TO-DO APP</h1>
                  </div> 
                  <div className="h-full w-1/2 flex items-center">
                    <div className="h-full w-1/3 flex items-center justify-center flex-col">
                      Logged as <p>{activeUser.login}</p>
                    </div>
                    <form className="h-full w-2/3" onSubmit={(e:any) => submitUserHandler(e, 'registration')}>
                      <div className="h-1/3 w-full flex justify-center items-end">
                        <input className="h-6 border-2 rounded-md w-2/3" id="login1" type="text" minLength={4} maxLength={26} placeholder="login" required />
                      </div>
                      <div className="h-2/3 w-full flex justify-center items-center flex-col">
                        <input className="h-6 border-2 rounded-md w-2/3" id="password1" type="password" minLength={8} placeholder="password" required/>
                        <button className="bg-purple rounded-lg py-1 px-md text-white mt-1" type="submit">REGISTER</button>
                      </div>
                    </form>
                    <form className="h-full w-2/3" onSubmit={(e:any) => submitUserHandler(e , 'login')}>
                      <div className="h-1/3 w-full flex justify-center items-end">
                        <input className="h-6 border-2 rounded-md w-2/3" id="login" type="text" minLength={4} maxLength={26} placeholder="login" required />
                      </div>
                      <div className="h-2/3 w-full flex justify-center items-center flex-col">
                        <input className="h-6 border-2 rounded-md w-2/3" id="password" type="password" minLength={8} placeholder="password" required/>
                        <button className="bg-purple rounded-lg py-1 px-md text-white mt-1" type="submit">LOG IN</button>
                      </div>
                    </form>
                  </div>

              </div>
              <div className="flex h-1/2 w-full select-none">            
                  <div className="h-full w-1/3 flex items-center justify-evenly select-none">
                    <p className="pointer-events-none">NAME:</p>
                    <input className="text-center h-1/3 border-2 rounded-md" type="text" id="name" defaultValue="New Task"/>
                  </div>
                  <div className="h-full w-1/6 flex items-center justify-evenly text-center select-none">
                    <p className="pointer-events-none">PRIORITY LVL:</p> 
                    <input className="h-1/3 border-2 rounded-md text-center" onInput={(e: any) => priorityLvlHandler(e)} min="1" max="3" defaultValue="1" type="number" id="priority"/></div>
                  <div className="h-full w-1/4 flex items-center justify-evenly select-none">
                    <p className="pointer-events-none">DEADLINE:</p> 
                    <input className="text-center h-1/3 border-2 rounded-md" type="date" defaultValue={date} id="deadline"/>
                  </div>
                  <div className="h-full w-1/4 flex items-center justify-center select-none">
                    <button className="bg-purple rounded-lg py-sm px-md text-white" type="submit" onClick={() => createNewTaskHandler()}>CREATE</button>
                  </div>
              </div>
            </div>
            <TaskList />
            {isPopUpOpen && popUpType != '' ? 
              <PopUp data={{
                type: popUpType
            }}/>
              :
              <></>}
          </div>
      </main>
  )
}
