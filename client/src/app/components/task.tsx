import { task, editTask, getTasks, removeTask } from "@/app/store/slices";
import { FC, useState } from "react";
import { PriorityE } from ".";
import { useAppSelector, useAppDispatch } from "@/app/store";

interface TaskData {
    data: task
}

 export const dateHandler = (dateToFormat:string | Date) => {
    let date = dateToFormat;
    const fullDate = new Date(dateToFormat);
    const day = fullDate.getDate();
    const month = fullDate.getMonth() + 1;
    const year = fullDate.getFullYear();
    date = day + "."+ month + "." + year;
    return date
}

export const Task:FC<TaskData> = ({data}) => {
    const dispatch = useAppDispatch();
    const [ isOpen, setIsOpen ] = useState(false);
    const [ mode, setMode ] = useState('');

    const users = useAppSelector((state) => state.userSlice.users);
    const creator = users.find(user => user._id == data.creator);

    const fullDate = new Date();
    const day = fullDate.getDate();
    const month = fullDate.getMonth() + 1;
    const year = fullDate.getFullYear();
    const date = day + "."+ month + "." + year;


    const formatedDeadline = dateHandler(data.deadline);
    const formatedStatusChangeDate = dateHandler(data.statusChangeDate);

    const editTaskHandler = () => {

    const nameI = document.getElementById('nameI') as HTMLInputElement;
    const deadI = document.getElementById('deadI') as HTMLInputElement;
    const prioI = document.getElementById('prioI') as HTMLInputElement;
    const statusI = document.getElementById('statusI') as HTMLInputElement;

    if(deadI.valueAsDate){
        dispatch(editTask({
            _id: data._id,
            name: nameI.value,
            priority: prioI.valueAsNumber,
            deadline: deadI.valueAsDate,
            status: statusI.value == "IN PROGRESS" ? true : false,
            statusChangeDate: new Date(),
            creator: data.creator,
        }))
        dispatch(getTasks());
        setIsOpen(false);
    }

    }

    const priorityLvlHandler = (e:any) => {
        if(e.target.value < 1 || e.target.value > 3) {
        e.target.value = 1;
        }
    }

    let curr;
    let dated;

    if(data != undefined) {
        curr = new Date(data.deadline);
        dated = curr.toISOString().substring(0,10);
    }

    const removeTaskHandler = () => {
        setIsOpen(false)
        dispatch(removeTask({id: data._id}))
        dispatch(getTasks())
    }

    const editHandler = () => {
        setMode('edit');
        setIsOpen(!isOpen);

    }
    const removeHandler = () => {
        setMode('remove');
        setIsOpen(!isOpen);
    }

    return(
        <>
            {isOpen? 
            <>
                <div className="absolute h-full w-full bg-faddedblack flex justify-center items-center top-0 left-0 overflow-hidden">
                    {
                    mode == 'edit' && data != undefined?
                    <div className="h-2/3 lg:w-1/3 xs:w-3/4 bg-white flex flex-col items-center justify-center rounded-lg text-center">
                        <div className="h-2/3 w-5/6 flex items-center justify-center flex-col">
                            <div className="h-1/4 w-2/3 font-bold text-3xl text-center flex items-center justify-center">
                                EDIT MODE
                            </div>
                            <div className="h-1/4 w-full flex flex-col align-center">
                                NAME
                                <input className="border-2 rounded-md text-center" id="nameI" type="text" defaultValue={data.name}/>
                            </div>
                            <div className="h-1/4 w-full flex flex-col align-center ">
                                DEADLINE
                                <input className="border-2 rounded-md text-center" id="deadI" type="date" defaultValue={dated}/>
                            </div>
                            <div className="h-1/4 w-full flex flex-col justify-center">
                                STATUS
                                <select className="border-2 rounded-md text-center" id="statusI" defaultValue={data.status ? "IN PROGRESS" : "DONE"} >
                                    <option value={"DONE"}>DONE</option>
                                    <option value={'IN PROGRESS'}>IN PROGRESS</option>
                                </select>
                            </div>
                            <div className="h-1/4 w-full flex flex-col justify-center select-none">
                                PRIORITY LVL
                                <input className="border-2 rounded-md text-center" id="prioI" type="number" onInput={(e: any) => priorityLvlHandler(e)} min={1} max={3} defaultValue={data.priority} />
                            </div>
                        </div>
                        <div className="h-1/3 lg:w-1/2 xs:w-3/4 flex items-center justify-evenly">
                            <button onClick={() => setIsOpen(false)} className="bg-red rounded-lg py-sm px-md text-white select-none">CANCEL</button>
                            <button onClick={() => editTaskHandler()} className="bg-green rounded-lg py-sm px-md text-white select-none">SUBMIT</button>
                        </div>
                    </div>
                    : data != undefined ?
                    <div className="h-1/3 lg:w-1/3 xs:w-3/4 bg-white flex flex-col items-center justify-center rounded-lg text-center">
                        <div className="h-2/3 w-5/6 flex items-center justify-center font-bold text-3xl select-none">
                            Are you sure about deleting this task?
                        </div>
                        <div className="h-1/3 lg:w-1/2 xs:w-3/4 flex items-center justify-evenly">
                            <button onClick={() => setIsOpen(false)} className="bg-red rounded-lg py-sm px-md text-white select-none">CANCEL</button>
                            <button onClick={() => removeTaskHandler()} className="bg-green rounded-lg py-sm px-md text-white select-none">SUBMIT</button>
                        </div>
                    </div>
                    : <></>
                    }
                </div>
                { date == formatedDeadline ?
                    <div className="lg:h-1/6 xs:h-xxxxl w-full border-b-2 border-gray lg:flex text-white bg-yellow">
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{creator?.login}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-evenly">
                            <button onClick={() => editHandler()} className="bg-purple rounded-lg py-sm px-md text-white select-none">EDIT</button>
                            <button onClick={() => removeHandler()} className="bg-red rounded-lg py-sm px-md text-white select-none">DELETE</button>
                        </div>
                    </div>
                    : new Date(fullDate.setHours(0,0,0,0)).getTime() < new Date(new Date(data.deadline).setHours(0,0,0,0)).getTime() ?
                    <div className="lg:h-1/6 xs:h-xxxxl w-full border-b-2 border-gray lg:flex bg-white">
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none" >{creator?.login}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-evenly">
                            <button onClick={() => editHandler()} className="bg-purple rounded-lg py-sm px-md text-white select-none">EDIT</button>
                            <button onClick={() => removeHandler()} className="bg-red rounded-lg py-sm px-md text-white select-none">DELETE</button>
                        </div>
                    </div>
                    :
                    <div className="lg:h-1/6 xs:h-xxxxl w-full border-b-2 border-gray lg:flex bg-red text-white">
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{creator?.login}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-evenly">
                            <button onClick={() => editHandler()} className="bg-purple rounded-lg py-sm px-md text-white select-none">EDIT</button>
                            <button onClick={() => removeHandler()} className="bg-green rounded-lg py-sm px-md text-white select-none">DELETE</button>
                        </div>
                    </div>
                }
            </>
            :
                <>
                {   date == formatedDeadline ?
                    <div className="lg:h-1/6 xs:h-xxxxl w-full border-b-2 border-gray lg:flex text-white bg-yellow">
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{creator?.login}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-evenly">
                            <button onClick={() => editHandler()} className="bg-purple rounded-lg py-sm px-md text-white select-none">EDIT</button>
                            <button onClick={() => removeHandler()} className="bg-red rounded-lg py-sm px-md text-white select-none">DELETE</button>
                        </div>
                    </div>
                    : new Date(fullDate.setHours(0,0,0,0)).getTime() < new Date(new Date(data.deadline).setHours(0,0,0,0)).getTime() ?
                    <div className="lg:h-1/6 xs:h-xxxxl w-full border-b-2 border-gray lg:flex bg-white">
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{creator?.login}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-evenly">
                            <button onClick={() => editHandler()} className="bg-purple rounded-lg py-sm px-md text-white select-none">EDIT</button>
                            <button onClick={() => removeHandler()} className="bg-red rounded-lg py-sm px-md text-white select-none">DELETE</button>
                        </div>
                    </div>
                    :
                    <div className="lg:h-1/6 xs:h-xxxxl w-full border-b-2 border-gray lg:flex bg-red text-white">
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-ninth flex items-center lg:justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-center pointer-events-none select-none">{creator?.login}</div>
                        <div className="lg:h-full xs:ml-lg lg:ml-0 xs:h-seventh xs:w-1/3 lg:w-1/6 flex items-center lg:justify-evenly">
                            <button onClick={() => editHandler()} className="bg-purple rounded-lg py-sm px-md text-white select-none">EDIT</button>
                            <button onClick={() => removeHandler()} className="bg-green rounded-lg py-sm px-md text-white select-none">DELETE</button>
                        </div>
                    </div>
                }
                </>
            }
        </>
    )
}