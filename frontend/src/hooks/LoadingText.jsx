import { useEffect, useState } from "react"
export function useLoadingText(){
    const [loading,setLoading] =useState(true)

    const showLoading = () =>{
        setLoading(true)
    }

    const hideLoading = () =>{
        setLoading(false)
    }
    return {loading,showLoading,hideLoading}
}