
import axios from 'axios';
import Swal from 'sweetalert2';

const backendURL = `https://product-review-3uk9.onrender.com` || 'http://localhost:4050';

//Action to register new user.
export const startRegisterUser = (inputObj, resetForm, history)=>
{
    return async (dispatch)=>
    {
        try
        {
            const temp = await axios.post(`${backendURL}/register`, inputObj);
            const result = temp.data; 
            Swal.fire(result); 
            resetForm(); 
            history.push('/login');
        }
        catch(err)
        {
            Swal.fire('Error while registering your account !');
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

            if(result.includes('Bearer'))
            {
                const token = result;
                localStorage.setItem('token', token);

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
                title: "Signed in Successfully !"
                });
                resetForm(); 
                history.push('/');
            } 
            else
            {
                Swal.fire('Invalid E-Mail or Password !');
            }
        }
        catch(err)
        {
            Swal.fire('Invalid E-Mail or Password !');
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
