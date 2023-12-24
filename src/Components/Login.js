
import { useState } from 'react';
import { useDispatch } from 'react-redux'; 
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import validator from 'validator';

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
        <div>
            <h1>Login Here !</h1><br/>
            
            <form onSubmit={handleSubmit}>
                <input type='text' name='email' value={email} onChange={handleChange} placeholder='Enter your e-mail !'/>
                {errors.email && <span>{errors.email}</span>}
                <input type='password' name='password' value={password} onChange={handleChange} placeholder='Enter your password'/>
                {errors.password && <span>{errors.password}</span>}
                <input type='submit' value='Login!'/>
            </form>
        </div>
    )
};

export default Login; 
