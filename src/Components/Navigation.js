
import React from 'react'; 
import { Route, Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import Swal from 'sweetalert2';

import PrivateRoute from './PrivateRoute';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Profile from './Profile';
import ProductView from './ProductView';
import { removeUser } from '../Actions/userActions';


const Navigation = (props)=>
{
    const {isLog, handleIsLog} = props; 

    const dispatch = useDispatch(); 

    function handleLogout()
    {
        localStorage.clear(); 
        handleIsLog(); 
        dispatch(removeUser());

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
        Toast.fire({
        icon: "success",
        title: "Logged out Successfully!"
        });
    };

    return(
        <div>
            <h2>Navigation-Bar</h2>
            {
                isLog ?
                    <>
                        <ul>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/profile'>Profile</Link></li>
                            <li><Link to='/' onClick={handleLogout}>Logout</Link></li>
                        </ul>
                    </>
                :
                    <>
                        <ul>
                            <li><Link to='/'>Home</Link></li>   
                            <li><Link to='/register'>Register</Link></li>
                            <li><Link to='/login'>Login</Link></li>
                        </ul>
                    </>
            }

            <Route path='/' component={Home} exact={true}/>
            <Route path='/login' render={(props)=>{return <Login {...props} handleIsLog={handleIsLog}/>}} exact={true}/>
            <Route path='/register' component={Register} exact={true}/>
            <PrivateRoute path='/profile' component={Profile} exact={true}/>
            <PrivateRoute path='/product/:productId' component={ProductView} exact={true}/>
        </div>
    );
};

export default Navigation; 
