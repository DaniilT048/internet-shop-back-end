import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'


import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.tsx'
import {Provider} from "react-redux";
import {store} from "./store/store.ts";
import './style.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
)
