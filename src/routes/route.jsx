import { Navigate } from "react-router-dom";

export const RouteProtected=({user,children})=>{

    if(!user){
        return <Navigate to="/"/>
    }
    return children
}