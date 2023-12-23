import React from 'react'; 
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter } from 'react-router-dom'; 
import { Provider } from 'react-redux';

//important files to import. 
import App from './Components/App';
import configureStore from './Store/configureStore';

const store = configureStore(); 
console.log(store.getState());
store.subscribe(()=>
{
    console.log('Updates', store.getState());
})

const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>
);
