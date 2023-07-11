import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter basename={process.env.REACT_APP_URL}>
        <Routes>
            <Route path={"/*"} element={<App/>}/>
        </Routes>
    </BrowserRouter>
)



