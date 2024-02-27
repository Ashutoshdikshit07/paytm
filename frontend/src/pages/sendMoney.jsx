import { useSearchParams } from "react-router-dom"
import { useState } from "react"
import axios from "axios"

export const SendMoney = ()=>{

    const [amount,setAmount] = useState()
    const [searchParams] = useSearchParams()
    const id = searchParams.get("id")
    const name = searchParams.get("name")
    const [errorMessage,setErrorMessage] = useState("")
    
    const handleTransfer= async() =>{
        try{
           
                setErrorMessage("")
    
            await axios.post("http://192.168.1.2:3000/api/v1/account/transfer",{
                amount,
                sendTo:id
            },{
                headers:{
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
                
            })
        }catch(e){
            if(e.response && e.response.data && e.response.data.message){
                setErrorMessage(e.response.data.message)
            }
            else{
                setErrorMessage("An error occured please try again later.")
        
            }
        }
    }

    return <div className="flex justify-center h-screen bg-gray-100">
        <div className="h-full flex flex-col justify-center">
            <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white rounded-lg shadow-2xl shadow-green-950">
                <div className="flex flex-col space-y-1.5 p-6  ">
                    {!errorMessage && (
                        <div className="text-green-600 text-center font-mono text-lg antialiased hover:subpixel-antialiased font-semibold">
                            Amount Transfered correctly
                        </div>
                    )}

                    {errorMessage && (
                        <div className="text-red-600 text-center font-mono text-lg antialiased hover:subpixel-antialiased font-semibold">
                            {errorMessage}
                        </div>
                    )}
                            

                    <div className="text-3xl font-bold text-center">
                        Send money
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                
                                <span className="text-2xl text-white">
                                    {name[0].toUpperCase()}
                                </span>
                            </div>
                            <h3 className="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="amount">
                                    Amount (in Rs)
                                </label>
                                <input onChange={(e)=>{
                                    setAmount(e.target.value)
                                }}
                                 type="number" className="flex h-10 w-full rounded-md border border-input px-3 py- text-sm bg-background" placeholder="Enter Amount" />
                            </div>
                            <button onClick={handleTransfer}
                            className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 hover:bg-green-900 text-white"> Initiate Transfer</button>
                        </div>                        
                    </div>
                </div>
            </div>
        </div>
    </div>
}
