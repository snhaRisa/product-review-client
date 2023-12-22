
import axios from 'axios';

const backendURL = 'http://localhost:4050';

//Action to register new user.
export const startRegisterUser = (inputObj, resetForm, history)=>
{
    return async (dispatch)=>
    {
        try
        {
            const temp = await axios.post(`${backendURL}/register`, inputObj);
            const result = temp.data; 
            console.log(result); 
        }
        catch(err)
        {
            console.error(err);
        }
    }
};

//Action to login user. 
export const startLoginUser = (inputObj, resetForm, history)=>
{
    return async (dispatch)=>
    {
        try
        {
            const temp = await axios.post(`${backendURL}/login`, inputObj);
            const result = temp.data; 
            console.log(result);
        }
        catch(err)
        {
            console.error(err);
        }
    }
}

//Redux action to add a user to my state. 
export const addUser = (inputObj)=>
{
    return({
        type: "ADD_USER", 
        payload: inputObj
    });
};

//Remove the user from my state. 
export const removeUser = ()=>
{
    return({
        type: "REMOVE_USER",
    });
};
