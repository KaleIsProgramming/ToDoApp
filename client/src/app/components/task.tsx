import { task } from "@/app/store/slices";
import { FC, useState } from "react";
import { PopUp } from ".";
import { PriorityE } from ".";
import { useAppSelector } from "@/app/store";

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
    
    const [ isOpen, setIsOpen ] = useState(false);
    const [ mode, setMode ] = useState('');
    const [ isItFirstOpen, setIsItFirstOpen ] = useState(true);

    const users = useAppSelector((state) => state.userSlice.users);
    const creator = users.find(user => user._id == data.creator);

    const fullDate = new Date();
    const day = fullDate.getDate();
    const month = fullDate.getMonth() + 1;
    const year = fullDate.getFullYear();
    const date = day + "."+ month + "." + year;


    const formatedDeadline = dateHandler(data.deadline);
    const formatedStatusChangeDate = dateHandler(data.statusChangeDate);

    

    const editHandler = () => {
        if(isOpen) {
            setMode('edit');
            setIsOpen(!isOpen);
            
        } else {

        }
    }
    const removeHandler = () => {
        if(isOpen || isItFirstOpen == false) {
            setMode('remove');
            setIsOpen(!isOpen);
        
        } else {
            setMode('remove');
            setIsOpen(!isOpen);
            setIsItFirstOpen(false)
        }

    }
    console.log(+isOpen +1)
    console.log(+isItFirstOpen +1)
    return(
        <>
            {(isOpen) || ((+isOpen +1) == (+isItFirstOpen + 1))? 
            <>
                <PopUp data={{type: mode, data}} />
                { date == formatedDeadline ?
                    <div className="h-1/6 w-full border-b-2 border-gray flex bg-yellow">
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{creator?.login}</div>
                        <div className="h-full w-1/6 flex items-center justify-evenly">
                            <button onClick={() => editHandler()} className="bg-purple rounded-lg py-sm px-md text-white select-none">EDIT</button>
                            <button onClick={() => removeHandler()} className="bg-red rounded-lg py-sm px-md text-white select-none">DELETE</button>
                        </div>
                    </div>
                    : new Date(fullDate.setHours(0,0,0,0)).getTime() < new Date(new Date(data.deadline).setHours(0,0,0,0)).getTime() ?
                    <div className="h-1/6 w-full border-b-2 border-gray flex">
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none" >{creator?.login}</div>
                        <div className="h-full w-1/6 flex items-center justify-evenly">
                            <button onClick={() => editHandler()} className="bg-purple rounded-lg py-sm px-md text-white select-none">EDIT</button>
                            <button onClick={() => removeHandler()} className="bg-red rounded-lg py-sm px-md text-white select-none">DELETE</button>
                        </div>
                    </div>
                    :
                    <div className="h-1/6 w-full border-b-2 border-gray flex bg-red text-white">
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{creator?.login}</div>
                        <div className="h-full w-1/6 flex items-center justify-evenly">
                            <button onClick={() => editHandler()} className="bg-purple rounded-lg py-sm px-md text-white select-none">EDIT</button>
                            <button onClick={() => removeHandler()} className="bg-green rounded-lg py-sm px-md text-white select-none">DELETE</button>
                        </div>
                    </div>
                }
            </>
            :
                <>
                {   date == formatedDeadline ?
                    <div className="h-1/6 w-full border-b-2 border-gray flex bg-yellow">
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{creator?.login}</div>
                        <div className="h-full w-1/6 flex items-center justify-evenly">
                            <button onClick={() => editHandler()} className="bg-purple rounded-lg py-sm px-md text-white select-none">EDIT</button>
                            <button onClick={() => removeHandler()} className="bg-red rounded-lg py-sm px-md text-white select-none">DELETE</button>
                        </div>
                    </div>
                    : new Date(fullDate.setHours(0,0,0,0)).getTime() < new Date(new Date(data.deadline).setHours(0,0,0,0)).getTime() ?
                    <div className="h-1/6 w-full border-b-2 border-gray flex">
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{creator?.login}</div>
                        <div className="h-full w-1/6 flex items-center justify-evenly">
                            <button onClick={() => editHandler()} className="bg-purple rounded-lg py-sm px-md text-white select-none">EDIT</button>
                            <button onClick={() => removeHandler()} className="bg-red rounded-lg py-sm px-md text-white select-none">DELETE</button>
                        </div>
                    </div>
                    :
                    <div className="h-1/6 w-full border-b-2 border-gray flex bg-red text-white">
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.name}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{PriorityE[data.priority]}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedDeadline}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{data.status? "IN PROGRESS" : "DONE"}</div>
                        <div className="h-full w-ninth flex items-center justify-center pointer-events-none select-none">{formatedStatusChangeDate}</div>
                        <div className="h-full w-1/6 flex items-center justify-center pointer-events-none select-none">{creator?.login}</div>
                        <div className="h-full w-1/6 flex items-center justify-evenly">
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