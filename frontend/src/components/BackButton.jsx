import React from 'react'
import {useNavigate} from 'react-router-dom'
import { Button } from './Button'

export const BackButton =()=>{
    const navigate = useNavigate()
    const goBack = ()=>{
        navigate(-1)
    }

    return <div >
        <Button onClick={goBack} label={"Back"} />        
    </div>
}