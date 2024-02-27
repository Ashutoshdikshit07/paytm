import { useEffect,useState } from "react"
import axios from "axios"

export const Balance =({value})=>{
    const [ balance,setBalance] = useState()
    useEffect(()=>{
        const fetchData = async ()=>{
            const response = await axios.get("http://localhost:3000/api/v1/account/balance",{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
        
            setBalance(response.data.balance.toFixed(2))
        }
        
        fetchData()
    },[])
    
    return <div className="flex">
        <div className="font-bold text-lg">
            Your Balance
        </div>
        <div className=" font-semibold text-lg ml-4">
            Rs {balance}
        </div>
    </div>
}
