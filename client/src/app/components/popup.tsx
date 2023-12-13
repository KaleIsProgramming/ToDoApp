import { FC, useState } from "react";
import { useAppDispatch } from "@/app/store";
import { editTask, removeTask, getTasks } from "@/app/store/slices";
import { task } from "@/app/store/slices";

interface PopUpData {
    type: string;
    data: task;
}

interface PopUpDataLayered {
    data: PopUpData
}

export const PopUp:FC<PopUpDataLayered> = ({data}) => {
    const dispatch = useAppDispatch()
    const [isOpen, setIsOpen] = useState(true)

    const removeTaskHandler = () => {
        setIsOpen(false)
        dispatch(removeTask({id: data.data._id}))
        dispatch(getTasks())
    }

    const editTaskHandler = () => {
        const nameI = document.getElementById('nameI') as HTMLInputElement;
        const deadI = document.getElementById('deadI') as HTMLInputElement;
        const prioI = document.getElementById('prioI') as HTMLInputElement;
        const statusI = document.getElementById('statusI') as HTMLInputElement;

        setIsOpen(false)
        if(deadI.valueAsDate)
        dispatch(editTask({
            _id: data.data._id,
            name: nameI.value,
            priority: prioI.valueAsNumber,
            deadline: deadI.valueAsDate,
            status: statusI.value == "IN PROGRESS" ? true : false,
            statusChangeDate: new Date(),
            creator: data.data.creator,
        }))
        dispatch(getTasks())
    }

    const priorityLvlHandler = (e:any) => {
        if(e.target.value < 1 || e.target.value > 3) {
          e.target.value = 1;
        }
    }

    const curr = new Date(data.data.deadline);
    const date = curr.toISOString().substring(0,10);

    return(
        <>
            {
            isOpen == true ?
            <div className="absolute h-full w-full bg-faddedblack flex justify-center items-center top-0 left-0">
                {
                data.type == 'edit'?
                <div className="h-2/3 w-1/3 bg-white flex flex-col items-center justify-center rounded-lg text-center">
                    <div className="h-2/3 w-5/6 flex items-center justify-center flex-col">
                        <div className="h-1/4 w-2/3 font-bold text-3xl text-center flex items-center justify-center">
                            EDIT MODE
                        </div>
                        <div className="h-1/4 w-full flex flex-col align-center">
                            NAME
                            <input className="border-2 rounded-md text-center" id="nameI" type="text" defaultValue={data.data.name}/>
                        </div>
                        <div className="h-1/4 w-full flex flex-col align-center ">
                            DEADLINE
                            <input className="border-2 rounded-md text-center" id="deadI" type="date" defaultValue={date}/>
                        </div>
                        <div className="h-1/4 w-full flex flex-col justify-center">
                            STATUS
                            <select className="border-2 rounded-md text-cente" id="statusI" defaultValue={data.data.status ? "IN PROGRESS" : "DONE"} >
                                <option value={"DONE"}>DONE</option>
                                <option value={'IN PROGRESS'}>IN PROGRESS</option>
                            </select>
                        </div>
                        <div className="h-1/4 w-full flex flex-col justify-center select-none">
                            PRIORITY LVL
                            <input className="border-2 rounded-md text-center" id="prioI" type="number" onInput={(e: any) => priorityLvlHandler(e)} min={1} max={3} defaultValue={data.data.priority} />
                        </div>
                    </div>
                    <div className="h-1/3 w-1/2 flex items-center justify-evenly">
                        <button onClick={() => setIsOpen(false)} className="bg-red rounded-lg py-sm px-md text-white select-none">CANCEL</button>
                        <button onClick={() => editTaskHandler()} className="bg-green rounded-lg py-sm px-md text-white select-none">SUBMIT</button>
                    </div>
                </div>
                :
                <div className="h-1/3 w-1/3 bg-white flex flex-col items-center justify-center rounded-lg text-center">
                    <div className="h-2/3 w-5/6 flex items-center justify-center font-bold text-3xl select-none">
                        Are you sure about deleting this task?
                    </div>
                    <div className="h-1/3 w-1/2 flex items-center justify-evenly">
                        <button onClick={() => setIsOpen(false)} className="bg-red rounded-lg py-sm px-md text-white select-none">CANCEL</button>
                        <button onClick={() => removeTaskHandler()} className="bg-green rounded-lg py-sm px-md text-white select-none">SUBMIT</button>
                    </div>
                </div>
                
                }
            </div>
            :
            <>
                <></>
            </>
            }
        </>
    )
}