
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';

import { addUser } from "../Actions/userActions";
import Admin from "./Admin";

const Profile = (props)=>
{
    const dispatch = useDispatch(); 
    const baseUrl = `http://localhost:4050`
    const token = localStorage.getItem('token');

    const [userImage, setUserImage] = useState(null); 

    const user = useSelector((state)=>
    {
        return state.user; 
    });

    useEffect(()=>
    {
        (async function()
        {
            try
            {
                const tempAccount = await axios.get(`${baseUrl}/get-account`, {headers:{authentication:token}});
                const tempData = tempAccount.data; 
                if(tempData.hasOwnProperty('username'))
                {
                    dispatch(addUser(tempData));
                }
                else
                {
                    Swal.fire({
                        title: 'Error retrieving account details.',
                        timer: 1000
                    });
                };
            }
            catch(err)
            {
                Swal.fire('Error while retrieving your details !');
            }
        })()
    }, []);

    function handleImageChange(event)
    {
        const img = event.target.files[0];
        setUserImage(img);
    };

    async function handleUserImage(event)
    {
        event.preventDefault(); 
        
        try
        {   
            if(userImage)
            {
                const uploadTemp = await axios.post(`${baseUrl}/upload-image`, {userImage}, {headers:{authentication: token, 'Content-Type': 'multipart/form-data'}});
                const uploadData = uploadTemp.data; 
                if(uploadData.hasOwnProperty('username'))
                {
                    dispatch(addUser(uploadData))
                }
                else
                {
                    Swal.fire({
                        title: 'Error updating image !', 
                        timer: 1000
                    });
                };
            }
            else
            {
                Swal.fire({
                    title: 'Please Select an Image', 
                    text: 'No Image Selected !', 
                    timer: 2000
                });
            }
        }
        catch(err)
        {
            Swal.fire({
                title: 'Error! Please try again later.', 
                timer: 1000
            });
        };
    }

    return(
        <div>
            {
                user.role === 'admin' ?
                    <>
                        <h3>Admin Page.</h3>
                        <Admin/>
                    </>
                    :
                    <>
                        <h1>Profile Page of User.</h1>
                        <hr/>
                        {
                            user && user.image ?
                            <h2>Your Image : <img src={user.image} width={150} height={150} alt="Our User."/></h2>
                            :
                            <label>Add your Image : 
                                <input id='userImage' name='userImage' type="file" accept="image/*" onChange={handleImageChange} required/><br/>
                                <button onClick={handleUserImage}>Add your Image !</button>
                            </label>
                        }
                        <h2>Username : {user && user.username}</h2>
                        <h2>Email : {user && user.email}</h2>
                        <h2>Account Created : {user && user.createdAt && user.createdAt.slice(0,10)}</h2>
                        <br/><br/>
                        <h5>All his reviews history !</h5>
                    </>
            }
        </div>
    );
};

export default Profile; 
