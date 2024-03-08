
import { useEffect,useState } from "react"


export function useDebounce(filter, timeout){
  const [debouncedValue,setDebouncedValue] = useState(filter)
  useEffect(()=>{
    const timeoutNumber = setTimeout(()=>{
      setDebouncedValue(filter)
    },timeout)

    return ()=>{
      clearTimeout(timeoutNumber)
    }

  },[filter])  
  

  return debouncedValue
}