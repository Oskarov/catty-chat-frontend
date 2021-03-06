import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import MenuBar from "./components/Menu";
import AuthRoute from "./util/AuthRoute";
import UserRoute from "./util/UserRoute";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import {Container} from "react-bootstrap";
import React, {useContext, useState, useEffect} from 'react'
import {AuthContext, AuthProvider} from "./context/auth";
import gql from "graphql-tag";
import {useQuery} from "@apollo/react-hooks";

function App() {

    const {user, login, logout} = useContext(AuthContext);

    const {data, error} = useQuery(GET_USER);

    useEffect(() => {
        if (typeof data !== 'undefined') {
            login(data.getUser);
        }
    }, [data]);

    return (
        <div className="App">
            <Router>
                <Container>
                    <div className="formContainer">
                        <MenuBar/>
                        <Switch>
                            <UserRoute exact path='/' component={Main}/>
                            <AuthRoute exact path='/register' component={Register}/>
                            <AuthRoute exact path='/login' component={Login}/>
                            <Route component={Error}/>
                        </Switch>
                    </div>
                </Container>
            </Router>
        </div>
    );
}

const GET_USER = gql`
    query{
        getUser{
            id
            username
            email
            token
        }
    }
`

export default App;
