import './css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers  } from 'redux';
import { Provider } from 'react-redux';
import App from './App';
import loginReducer from './reducers/loginReducer';
import modalReducer from './reducers/modalReducer';
import orderReducer from './reducers/orderReducer';
import reportWebVitals from './reportWebVitals';
import './css/index.css';


const store = createStore(combineReducers({
  login: loginReducer,
  modal: modalReducer,
  order: orderReducer,
}));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
