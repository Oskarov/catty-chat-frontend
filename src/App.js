import './App.scss';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import AuthRoute from "./util/AuthRoute";
import UserRoute from "./util/UserRoute";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Error from "./pages/Error";
import {Container} from "react-bootstrap";
import React from "react";

function App() {
    return (
        <div className="App">
            <Router>
                <Container>
                    <div className="formContainer">
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

export default App;
