import React from 'react';
import './styles/app.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import StartComponent from "./components/StartComponent";

const App = () => {
    const redirect = `f${(+new Date()).toString(16)}`
    return (
            <BrowserRouter>
                <div className='app'>
                    <Routes>

                        <Route
                            element={<StartComponent/>}
                            path={'/:id'}/>
                        <Route
                            element={<Navigate replace to={redirect} />}
                            path={'/'}/>

                    </Routes>
                </div>
            </BrowserRouter>
    );
};

export default App;