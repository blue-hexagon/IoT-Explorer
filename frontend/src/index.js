import axios from "axios";
import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import {Footer} from "./component/footer";
import {Header} from "./component/header";
import TabViewer from "./component/tabViewer";

const root = ReactDOM.createRoot(document.getElementById('root'));

axios.defaults.baseURL = "http://localhost:8000";
root.render(
    <React.StrictMode>
        <div className="flex flex-col min-h-screen">
            <Header/>
            <div className="flex-grow">
                <TabViewer/>
            </div>
            <Footer/>
        </div>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
