import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { currentAdmin } from '../../functions/auth'
import LoadingToRedirect from './LoadingToRedirect'

const ProtectedAdminRoute = ({children}) => {

    const [ok, setOk] = useState(false)
    
    const {user} = useSelector((state)=>({...state}))
    useEffect(() => {

        if(user && user.token){
            currentAdmin(user.token)
            .then((res)=>{
            //   console.log("Admin res: ", res)
              setOk(true)
            })
            .catch((err)=> {
              console.log("Admin err", err)
              setOk(false)
            })
        }
    }, [user])
    

    if(ok){
        return children
    } else {
        return <LoadingToRedirect/>
    }
}

export default ProtectedAdminRoute