import { BackButton } from "./BackButton"
import { LoggedUser } from "./LoggedUser"

export const AppBar = ()=>{
    return <div className="shadow h-14 flex justify-between">
        <div className="flex flex-col justify-center h-full ml-4">
            AshPay App        
        </div>
        <div className="flex flex-col justify-center h-full ml-4">
            <BackButton />
        </div>
        <div className="flex">
            <div className="flex flex-col justify-center h-full mr-4">
                <LoggedUser />
            </div>
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl" >
                    <LoggedUser flag="initialAvatar"/>
                </div>
            </div>
        </div>
    </div>
}