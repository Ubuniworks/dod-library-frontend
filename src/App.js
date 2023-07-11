// import './App.css';

import React from 'react';
import {Route, Routes} from "react-router-dom";
import MainLayout from "./Components/MainLayout";
import Dashboard from "./pages/Dashboard/dashboard";
import Library from "./pages/Library/library";
import ReadMode from "./pages/ReadMode/ReadMode";
import Login from "./pages/auth/Login";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path={"/login"} element={<Login/>}/>
                <Route element={<PrivateRoutes/>}>
                    <Route element={<MainLayout/>}>
                        <Route path={"/"} element={<Dashboard/>}/>
                        <Route path={"/library"} element={<Library/>}/>
                        <Route path={"/read"} element={<ReadMode/>}/>
                        <Route path={"/search"} element={<h1>Search</h1>}/>
                        <Route path={"/settings"} element={<h1>Settings</h1>}/>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
