
import React from 'react'; 
import { Route, Link } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

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
        <div className='container mt-5 md-5'>
            <nav className="navbar navbar-expand-lg bg-light mb-3">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to='/' className="nav-link" style={{color:'brown', fontSize:'20px'}}>Home</Link>
                        </li>
                        {isLog ? 
                            <>
                                <li className="nav-item">
                                    <Link to='/profile' className="nav-link" style={{color:'brown', fontSize:'20px'}}>Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/' onClick={handleLogout} className="nav-link" style={{color:'brown', fontSize:'20px'}}>Logout</Link>
                                </li>
                            </> 
                        : 
                            <>
                                <li className="nav-item">
                                    <Link to='/register' className="nav-link" style={{color:'brown', fontSize:'20px'}}>Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/login' className="nav-link"  style={{color:'brown', fontSize:'20px'}}>Login</Link>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </nav>
    
            <Route path='/' component={Home} exact={true}/>
            <Route path='/login' render={(props)=>{return <Login {...props} handleIsLog={handleIsLog}/>}} exact={true}/>
            <Route path='/register' component={Register} exact={true}/>
            <PrivateRoute path='/profile' component={Profile} exact={true}/>
            <PrivateRoute path='/product/:productId' component={ProductView} exact={true}/>
        </div>
    );
};

export default Navigation; 
