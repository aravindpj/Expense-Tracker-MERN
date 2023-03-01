import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider,} from "react-router-dom";
import {Provider} from 'react-redux'
import router from './routes'
import store from './store/index.js'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <Provider store={store}>
       <RouterProvider router={router} />
    </Provider>

);

