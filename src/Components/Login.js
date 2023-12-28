
import { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import validator from 'validator';
import 'bootstrap/dist/css/bootstrap.min.css';

import { startLoginUser } from '../Actions/userActions';

const Login = (props)=>
{
    const {handleIsLog} = props; 

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch(); 
    const history = useHistory(); 

    function handleChange(event)
    {
        const {name, value} = event.target; 

        if(name === 'email')
        {
            setEmail(value);
        }
        else if(name === 'password')
        {
            setPassword(value);
        }
    };

    function resetForm()
    {
        setEmail('');
        setPassword('');
        setErrors({});
        handleIsLog(); 
    };

    function runValidations()
    {   
        const temp = {};

        if(!validator.isEmail(email))
        {
            temp.email = 'Invalid E-Mail format !'; 
        }
        else if(email.trim().length === 0)
        {
            temp.email = 'E-Mail cannot be empty !';
        };

        if(password.trim().length === 0)
        {
            temp.password = 'Password cannot be empty !'; 
        };

        return temp; 
    };

    function handleSubmit(event)
    { 
        event.preventDefault();

        const temp = runValidations(); 
        if(Object.keys(temp).length > 0)
        {
            setErrors(temp);
        }
        else
        {
            const inputObj = {
                email, 
                password
            }; 
            dispatch(startLoginUser(inputObj, resetForm, history));
        };
    };

    return(
        <div className='container mt-5 text-center'>
            <h1 className='display-2'>Login Here !</h1><br/>
            
            <form onSubmit={handleSubmit}>
                <div className='form-group mt-3 col-md-6 mx-auto'>
                    <input 
                        className='form-control form-control-lg' 
                        type='text' 
                        name='email' 
                        value={email} 
                        onChange={handleChange} 
                        placeholder='Enter your e-mail !'
                    />
                    {errors.email && <div className='mt-3 alert alert-danger'><span>{errors.email}</span></div>}
                </div>
                <div className='form-group mt-3 col-md-6 mx-auto'>
                    <input 
                        className='form-control form-control-lg' 
                        type='password' 
                        name='password' 
                        value={password} 
                        onChange={handleChange} 
                        placeholder='Enter your password...'
                    />
                    {errors.password && <div className='mt-3 alert alert-danger'><span>{errors.password}</span></div>}
                </div>
                <div>
                    <input 
                        className='mt-4 btn btn-outline-success btn-lg' 
                        type='submit' 
                        value='Login!'
                    />
                </div>
            </form>

            <div className='mt-3'>
                <Link to='/register'><span className='alert alert-link'>No Account! Sign Up Here !</span></Link>
            </div>
        </div>
    );
};

export default Login; 
