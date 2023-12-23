
import React from 'react'; 
import { Route, Link } from 'react-router-dom'; 

import Register from './Register';
import Login from './Login';
import Home from './Home';

const Navigation = (props)=>
{
    const {isLog, handleIsLog} = props; 

    return(
        <div>
            <h2>Navigation-Bar</h2>
            {
                isLog ?
                    <>
                        <Link>Profile</Link>
                        <Link to='/' onClick={()=>
                        {
                            localStorage.clear(); 
                            handleIsLog();   
                        }}>Logout</Link>
                    </>
                :
                    <>
                        <Link to='/register'>Register</Link>
                        <Link to='/login'>Login</Link>
                    </>
            }

            <Route path='/' component={Home} exact={true}/>
            <Route path='/login' component={Login} exact={true}/>
            <Route path='/register' component={Register} exact={true}/>
        </div>
    );
};

export default Navigation; 
