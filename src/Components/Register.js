
import { useState } from 'react'; 
import validator from 'validator';
import { useHistory, Link } from 'react-router-dom/cjs/react-router-dom.min'; 
import { useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import { startRegisterUser } from '../Actions/userActions';

const Register = (props)=>
{
    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();
    const history = useHistory(); 

    //handleChange of input fields. 
    function handleChange(event)
    {
        const {name, value} = event.target; 

        if(name === 'username')
        {
            setUsername(value);
        }
        else if(name === 'email')
        {
            setEmail(value);
        }
        else if(name === 'password')
        {
            setPassword(value);
        }
    };

    //front-end validations.
    function runValidations()
    {   
        const temp = {}; 

        if(username.trim().length === 0)
        {
            temp.username = 'Username cannot be empty !'; 
        }

        if(email.trim().length === 0)
        {
            temp.email = 'E-Mail cannot be empty !';
        }
        else if(!validator.isEmail(email))
        {
            temp.email = 'Invalid E-Mail format !'; 
        }

        if(password.trim().length <= 8 || password.trim().length >= 128)
        {
            temp.password = 'Password length should be between 8 to 128 characters !'; 
        };

        return temp; 
    };

    //Reset the form.
    function resetForm()
    {
        setUsername('');
        setEmail(''); 
        setPassword('');
        setErrors({});
    }

    //handle Submit. 
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
                username, 
                email, 
                password
            };
            dispatch(startRegisterUser(inputObj, resetForm, history)); 
        };
    };

    return (
        <div className='container mt-5 text-center'>
            <h1 className='display-2'>Register with Us !</h1><br/>
            <form onSubmit={handleSubmit}>
                <div className='mt-3 form-group col-md-6 mx-auto'>
                    <input 
                        className='form-control form-control-lg' 
                        type='text' 
                        name='username' 
                        value={username} 
                        onChange={handleChange} 
                        placeholder='Enter your Username...'
                    />
                    {errors.username && <div className='mt-2 alert alert-danger'><span>{errors.username}</span></div>}
                </div>
                <div className='mt-3 col-md-6 mx-auto form-group'>
                    <input 
                        className='form-control form-control-lg' 
                        type='text' 
                        name='email' 
                        value={email} 
                        onChange={handleChange} 
                        placeholder='Enter your E-Mail...'
                    />
                    {errors.email && <div className='mt-2 alert alert-danger'><span>{errors.email}</span></div>}
                </div>
                <div className='mt-3 col-md-6 mx-auto form-group'>
                    <input 
                        className='form-control form-control-lg' 
                        type='password' 
                        name='password' 
                        value={password} 
                        onChange={handleChange} 
                        placeholder='Enter your password...'
                    />
                    {errors.password && <div className='mt-2 alert alert-danger alert-dismissible fade show'><span>{errors.password}</span></div>}
                </div>
                <div className='mt-5'>
                    <input 
                        className='btn btn-outline-success btn-lg' 
                        type='submit' 
                        value='Register !'
                    />
                </div>
            </form>
            <div className='mt-3 alert alert-link'>
                <Link to='/login'>Already signed up. Login Here !</Link>
            </div>
        </div>
    )
}; 

export default Register; 
