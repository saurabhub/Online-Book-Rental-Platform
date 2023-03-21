import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectedUserRoute = ({children}) => {

    const {user} = useSelector((state)=>({...state}))
    if(user && user.token){
        return children
    } else {
        return <LoadingToRedirect/>
    }
}

export default ProtectedUserRoute