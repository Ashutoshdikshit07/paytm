import { useEffect, useState } from "react"
import {Button} from "./Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useDebounce } from "../hooks/Search"
import { useLoadingText } from "../hooks/LoadingText"

export const Users = ()=>{
    const [users,setUsers] = useState([])
    const [filter,setFilter] = useState("")
    const {loading,showLoading,hideLoading} = useLoadingText()
    const debouncedValue = useDebounce(filter,500)



    useEffect(()=>{

        const fetchData = async ()=>{
            // Showing a loading text until the data is fetched from the backend
            showLoading()
            // const response = await axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter,{
            //     headers:{
            //         Authorization: "Bearer " + localStorage.getItem("token")
            //     }
            // })

            const response = await axios.get(`http://localhost:3000/api/v1/user/bulk`, {
                params: debouncedValue ? { filter: debouncedValue } : {},
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                },
            });
            setUsers(response.data.user)
            // Once the data is fetched loading... page is hidden
            hideLoading()
        }
        fetchData()
    },[debouncedValue])

    // if(debouncedValue){
    //     fetchData()
    // }
    // else{
    //     fetchData([])
    // }

    if(loading){
        return <div className="flex font-bold mt-6 text-lg">Loading data...</div>
    }

    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input value={filter} onChange={(e)=>{
                setFilter(e.target.value)}
            } type="text" placeholder="Search users..." className="w-full px-2 py-2 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user=><User key={user._id} user={user}/>)}
        </div>

    </>
}


function User({user}){
    const navigate = useNavigate()

    return <div className="flex justify-between">
       <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>     
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-center h-full mt-2">
            <Button onClick={(e)=>{
                navigate("/send?id=" + user._id + "&name=" + user.firstName)
                
            }} label= {"Send Money"}/>
        </div>
    </div>
}