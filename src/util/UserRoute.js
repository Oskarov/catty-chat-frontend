import React, {useContext, useEffect} from "react";
import {Route} from 'react-router-dom';
import {AuthContext} from "../context/auth";
import Error from "../pages/Error";

const UserRoute = ({component: Component, ...rest}) => {

    const {user} = useContext(AuthContext);

    return (
        <Route {...rest} render={props => user ? <Component {...props}/> : <Error {...props}/>}/>
    )
}

export default UserRoute;
