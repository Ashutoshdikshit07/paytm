import { useEffect, useState } from 'react';
import axios from 'axios';


export const LoggedUser =({flag})=>{

    const [userData,setUserData] = useState("")
    const [error, setError] = useState('')

    useEffect(()=>{
        const fetchUserData = async()=>{
            try{
            
                const token = localStorage.getItem('token')
                if(!token){
                    throw new Error("user not logged in")
                }
                const response = await axios.get("http://localhost:3000/api/v1/user/getUser",{
                    headers:{
                        Authorization: "Bearer " + token
                    }
                })
                const userData = response.data
                setUserData(userData)
                console.log(userData)
            }
        
            catch(error){
                setError('error fetching user data', error.message)
            }
        }
        fetchUserData()
    },[])
     

    const renderUser = ()=>{
        if (flag === "initialAvatar"  && userData && userData.firstName){
            return userData.firstName ? userData.firstName.charAt(0).toUpperCase(): ''
        }
        else{
            // return userData.firstName
            return userData.firstName ? userData.firstName.charAt(0).toUpperCase() + userData.firstName.slice(1) : '';
        }
    }

    return <div>
        {error && <div> {error}</div>}
        {renderUser()}
    </div>
}
