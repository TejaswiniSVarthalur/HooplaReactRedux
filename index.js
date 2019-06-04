import React from 'react';
import ReactDOM from 'react-dom';



//Redux components
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import middlewares from "./middlewares";

// Styling related imports
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';

import App from './components/App';

// Creating a Redux store
// const store = createStore(rootReducer)
const store = createStore(rootReducer,middlewares)

ReactDOM.render(<Provider store={store}>
<App />
</Provider>
, document.getElementById('root'));


