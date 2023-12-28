
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import { RiDeleteBin6Line } from "react-icons/ri";
import 'bootstrap/dist/css/bootstrap.min.css';

import { addUser } from "../Actions/userActions";
import Admin from "./Admin";

const Profile = (props)=>
{
    const dispatch = useDispatch(); 
    const baseUrl = `https://product-review-3uk9.onrender.com` || `http://localhost:4050`
    const token = localStorage.getItem('token');

    const [userImage, setUserImage] = useState(null); 
    const [reviews, setReviews] = useState([]);

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

                const tempReviews = await axios.get(`${baseUrl}/get-all-reviews`, {headers:{authentication:token}});
                setReviews(tempReviews.data);
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
    };

    async function handleDeleteReview(reviewObj)
    {
        try
        {
            const reviewId = reviewObj._id; 
            const productId = reviewObj.productId._id; 
            const userId = reviewObj.userId;
            const temp = await axios.delete(`${baseUrl}/delete-review-user`, {data: {reviewId, productId, userId}, headers:{authentication: token}});
            setReviews(temp.data);
        }
        catch(err)
        {
            console.error(err);
            Swal.fire({
                title: 'Error deleting your review', 
                text: 'Try again later.', 
                timer: 2000,
            });
        };
    };

    return(
        <div className="container mt-3 text-center">
            {
                user.role === 'admin' ?
                    <>
                        <Admin/>
                    </>
                    :
                    <>
                        <h1 className="display-2">Profile Page</h1>
                        <div className="row">
                            <div className="card mt-3 col-md-6 mx-auto">
                                <h2 className="mt-3">Account Information</h2>
                                {
                                    user && user.image ?
                                    <div className="card-body text-start">
                                        <h4>Your Image : <img 
                                                            className="img-fluid rounded-circle" 
                                                            src={user.image} 
                                                            width={100} 
                                                            height={100} 
                                                            alt="Our User."
                                                        />
                                        </h4>
                                    </div>
                                    :
                                    <div className="card-body text-start">
                                        <div className="form-group">
                                            <label htmlFor="userImage" className="form-label">Add your Image</label>
                                            <input 
                                                className="form-control-file" 
                                                id='userImage' 
                                                name='userImage' 
                                                type="file" 
                                                accept="image/*" 
                                                onChange={handleImageChange} 
                                                required
                                            />
                                            <button 
                                                onClick={handleUserImage} 
                                                className="btn btn-dark btn-sm">
                                                    Add your Image!
                                            </button>
                                        </div>

                                    </div>
                                }
                                <div className="card-body text-start">
                                    <h4 className="card-title">Username : {user && user.username}</h4>
                                </div>
                                <div className="card-body text-start">
                                    <h4 className="card-title">Email : {user && user.email}</h4>
                                </div>
                                <div className="card-body text-start">
                                    <h4 className="card-title">Account Created : {user && user.createdAt && user.createdAt.slice(0,10)}</h4>
                                </div>
                            </div>
                            <div className="card mt-5 mb-5">
                                    {
                                        reviews.length > 0 &&
                                        <h2 className="mt-3">All your reviews!</h2>
                                    }
                                    <ul className="list-group mb-3 text-start">
                                        {
                                            reviews && reviews.map((review)=>
                                            {
                                                return <li className="list-group-item list-group-item-action list-group-item-secondary" key={review._id}>
                                                        <p>
                                                            <b>{review.text}</b> posted on <b>{review.timestamp.slice(0,10)}</b> on product titled <b>{review.productId.title}</b><br/>
                                                            Received <b>{review.likes.length}</b> likes & <b>{review.dislikes.length}</b> dislikes.
                                                            <br/>
                                                            <button 
                                                                className="mt-1 btn btn-outline-dark btn-sm"
                                                                onClick={()=>{handleDeleteReview(review)}}>
                                                                    <RiDeleteBin6Line style={{fontSize:'24px'}}/>
                                                            </button>
                                                        </p>
                                                    </li>
                                            })
                                        }
                                    </ul>
                            </div>
                        </div>
                    </>
            }
        </div>
    );
};

export default Profile; 
