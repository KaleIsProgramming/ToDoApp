import { useState } from "react";
import { useAppSelector } from "@/app/store"
import { Task } from ".";
import {KeyboardArrowDown, KeyboardArrowUp, Sort} from '@mui/icons-material';
import { task, user } from "@/app/store/slices";
import { PriorityE,  } from ".";

export const TaskList = () => {
    const data = useAppSelector(state => state.tasksSlice.tasks);
    const users = useAppSelector(state => state.userSlice.users);
    const [sortBy, setSortBy] = useState("");
    const [isSearching, setIsSearching] = useState('');
    
    let filterdSortedData: task[] = [];



    const compareByDate = (a: task, b: task) => {
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }

    const notSortedData: task[] = [...data];
    let SortedDataASC: task[] = [];
    let SortedDataDSC: task[] = []



    let filteredByPriority: task[] = data.filter((item: task) => PriorityE[item.priority].toLowerCase().includes(isSearching.toLowerCase()));
    let filteredByStatus: task[] = data.filter((item: task) => {
        let a = item.status ? "in progress" : "done";
        if(a.toLowerCase().includes(isSearching.toLowerCase())) {
            return true;
        } else {
            return false;
        }
    });

    const filteredUsers: user[] = users.filter((item: user) => item.login.toLowerCase().includes(isSearching.toLowerCase()));
    let filteredByCreator: task[] = []
    filteredUsers.forEach(item => {
        let i = data.filter((item2: task) => item._id == item2.creator)
        if(i[0]) {
            filteredByCreator = [...filteredByCreator, ...i]
        }
    })

    const arrayUnique = (array: task[]) => {
        let a = array.concat();
        for(let i=0; i<a.length; ++i) {
            for(let j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
        return a;
    }
      

    filterdSortedData = arrayUnique(filteredByPriority.concat(filteredByCreator));
    filterdSortedData = arrayUnique(filterdSortedData.concat(filteredByStatus))

    if(isSearching != '' && isSearching != null && isSearching != undefined) {
        
        SortedDataASC = filterdSortedData.sort(compareByDate)
        for(let i = 0; i < filterdSortedData.length; i++) {
            SortedDataDSC[i] = SortedDataASC[SortedDataASC.length - (i+1)]

        }
    } else {
        SortedDataASC = notSortedData.sort(compareByDate)
        for(let i = 0; i < notSortedData.length; i++) {
            SortedDataDSC[i] = SortedDataASC[SortedDataASC.length - (i + 1)]
        }
    }


    const sortHandler = () => {
        if(sortBy == "ASC") {
            setSortBy("DSC")

        } else {
            setSortBy("ASC") 
        }
    }


    return(
        <div className="lg:h-5/6 xs:h-3/6 w-full">
                <div className="h-tenth w-full border-b-2 border-gray flex">
                    <div className="h-full w-1/6 lg:flex items-center justify-center pointer-events-none select-none xs:hidden">NAME</div>
                    <div className="h-full w-1/6 lg:flex items-center justify-center pointer-events-none select-none xs:hidden">PRIORITY</div>
                    <div onClick={() => sortHandler()} className="h-full lg:w-ninth sx:w-1/2 flex items-center justify-center cursor-pointer select-none">
                        DEADLINE{ sortBy=="ASC" || sortBy=="" ? <KeyboardArrowDown fontSize="small"/> : <KeyboardArrowUp fontSize="small"/>}
                    </div>
                    <div className="h-full w-1/6 lg:flex items-center justify-center pointer-events-none select-none xs:hidden">STATUS</div>
                    <div className="h-full w-ninth lg:flex items-center justify-center text-center pointer-events-none select-none xs:hidden">STATUS CHANGE</div>
                    <div className="h-full w-1/6 lg:flex items-center justify-center pointer-events-none select-none xs:hidden">CREATED BY</div>
                    <div className="h-full lg:w-1/6 sx:w-1/2 flex items-center justify-evenly ">
                        <input className="border-2 rounded-md w-36" type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsSearching(e.target.value)} placeholder="Search..."/>
                    </div>
                </div>
                <div className="overflow-auto xs:h-ninetenth lg:h-eighttenth w-full">
                    {
                        
                        isSearching != '' && isSearching != null && isSearching != undefined && sortBy == '' ?
                        filterdSortedData.map(task => {
                            return <Task key={task._id} data={task}></Task>
                        })
                        : sortBy == "DSC" && isSearching != '' && isSearching != null && isSearching != undefined ?
                        SortedDataDSC.map(task => {
                            return  <Task key={task._id} data={task}></Task>
                        })
                        : sortBy == "DSC" ?
                        SortedDataDSC.map(task => {
                            return  <Task key={task._id} data={task}></Task>
                        })
                        : sortBy == "ASC" && isSearching != '' && isSearching != null && isSearching != undefined  ?
                        SortedDataASC.map(task => {
                            return <Task key={task._id} data={task}></Task>
                        })
                        : sortBy == "ASC" ?
                        SortedDataASC.map(task => {
                            return <Task key={task._id} data={task}></Task>
                        })
                        : isSearching == '' || isSearching == null || isSearching == undefined ?
                        data.map((task: task) => {
                            return <Task key={task._id} data={task}></Task>
                        })
                        : <></>
                    }
                </div>
        </div>
    )
}