import React, {useEffect} from "react";
import './App.css';
import {Switch, Route} from "react-router-dom";
import {ConfirmProvider} from "material-ui-confirm";
import MainPreload from "./components/Main/MainPreload";

import socket from "./socket/socket";


function App() {

    useEffect(() => {
        socket.on("connect", () => {

        })
    }, [])

    return (
        <ConfirmProvider>
            <div className='app'>
                <Switch>
                    <Route path='/' render={() =>
                        <MainPreload/>
                    }/>
                </Switch>
            </div>
        </ConfirmProvider>
    );
}

export default App;