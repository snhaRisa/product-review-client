
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactStars from 'react-stars';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FcLike, FcDislike } from "react-icons/fc";
import { LiaCommentSolid } from "react-icons/lia";
import { FcRating } from "react-icons/fc";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsArrowLeftShort } from 'react-icons/bs';
import 'bootstrap/dist/css/bootstrap.min.css';

import { addUser } from '../Actions/userActions';

const ProductView = (props)=>
{
    const user = useSelector((state)=>
    {
        return state.user; 
    });

    const dispatch = useDispatch(); 
    const {productId} = useParams();
    const baseUrl = `https://product-review-3uk9.onrender.com`||'http://localhost:4050'; 
    const token = localStorage.getItem('token'); 
    
    const [product, setProduct] = useState({}); 
    const [rate, setRate] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [errors, setErrors] = useState({});

    //Rendering states.
    const [showReviews, setShowReviews] = useState(true); 
    const [average, setAverage] = useState(''); 
    
    
    useEffect(()=>
    {
        (async function ()
        {
            try
            {
                //Fetching products. 
                const tempDoc = await axios.get(`${baseUrl}/get-one-product/${productId}`, {headers:{authentication: token}});
                setProduct(tempDoc.data);
                
                //Fetching account.
                const tempAccount = await axios.get(`${baseUrl}/get-account`, {headers:{authentication:token}});
                if(tempAccount.data.hasOwnProperty('username'))
                {
                    dispatch(addUser(tempAccount.data))
                };

                //Calculation ratings.
                const rating = tempDoc.data.reviews.reduce((prev, curr)=>
                {
                    return prev+=curr.rating; 
                }, 0);
                const avg = Math.round((rating/tempDoc.data.reviews.length)); 
                
                if(avg)
                {
                    setAverage(avg)
                }
                else
                {
                    setAverage('Not many ratings!')
                }
            }
            catch(err)
            {
                Swal.fire({
                    title: 'Error fetching the product.', 
                    text: 'Please try again later.', 
                    timer: 2000
                });
            };
        })()
    }, [token]);

    function runValidations()
    {
        const temp = {};
        if(feedback.trim().length===0)
        {
            temp.feedback = 'You cannot submit empty feedback';
        }

        return temp; 
    };

    function resetForm()
    {
        setRate(0); 
        setFeedback('');
    };

    function handleShowReviews()
    {
        setShowReviews(!showReviews); 
    };

    function handleRateChange(value)
    {
        setRate(value); 
    };

    function handleChange(event)
    {
        setFeedback(event.target.value)
    };

    async function handleSubmit(event)
    {
        event.preventDefault(); 

        const temp = runValidations(); 

        if(Object.keys(temp).length>0)
        {
            setErrors(temp);
        }
        else
        {
            const tempObj = {
                rating: rate, 
                text: feedback, 
                userId: user._id, 
                productId: product._id
            };

            const temp = await axios.post(`${baseUrl}/add-review`, {tempObj}, {headers: {authentication:token}}); 
            setProduct(temp.data);
            
            resetForm();
            Swal.fire({
                title: 'Successfully added the review.', 
                text: 'Thank you for your feedback', 
                timer: 1000
            });
        }
    };

    async function handleProductLike(productId)
    {
        try
        {
            const temp = await axios.put(`${baseUrl}/add-product-like`, {userId: user._id, productId: productId}, {headers:{authentication:token}}); 
            setProduct(temp.data);
        }
        catch(err)
        {
            Swal.fire({
                title: 'Error while liking the Product.', 
                text: 'Try again later', 
                timer: 1000
            });
        };
    };

    async function handleProductDislike(productId)
    {
        try
        {
            const temp = await axios.put(`${baseUrl}/add-product-dislike`, {userId: user._id, productId: productId}, {headers:{authentication:token}}); 
            setProduct(temp.data);
        }
        catch(err)
        {
            Swal.fire({
                title: 'Error while liking the Product.', 
                text: 'Try again later', 
                timer: 1000
            });
        };
    };

    async function handleReviewLike(productId, reviewId, userId)
    {
        try
        {
            const temp = await axios.put(`${baseUrl}/add-review-like`, {productId, reviewId, userId}, {headers:{authentication:token}});
            setProduct(temp.data);
        }
        catch(err)
        {
            Swal.fire({
                title: 'Cannot like the review', 
                text: 'Please try again later.', 
                timer: 2000
            });
        }
    };

    async function handleReviewDislike(productId, reviewId, userId)
    {
        try
        {
            const temp = await axios.put(`${baseUrl}/add-review-dislike`, {productId, reviewId, userId}, {headers:{authentication:token}});
            setProduct(temp.data);
        }
        catch(err)
        {
            Swal.fire({
                title: 'Cannot dislike the review', 
                text: 'Please try again later.', 
                timer: 2000
            });
        }
    };

    async function handleReviewDelete(productId, reviewId, userId)
    {
        try
        {
            const temp = await axios.delete(`${baseUrl}/delete-review-user`, {data:{productId, reviewId, userId}, headers:{authentication: token}});
            setProduct(temp.data);
        }
        catch(err)
        {
            Swal.fire({
                title: 'Error deleting your review', 
                text: 'Try again later.', 
                timer: 2000
            });
        };
    };

    return(
        <div className='container'>
            <h2 className='mt-5 text-start display-2 font-bold'>Product Showcase</h2>
            <div className='card mt-5'>
                <img
                    className='card-img-top' 
                    src={product.image} 
                    alt={product.title} 
                    width={400} 
                    height={600} 
                    style={{ width: 'auto', maxHeight: '100%', objectFit: 'cover' }}
                />
                <h3 className='text-start card-title mt-2' style={{marginLeft:'15px'}}>{product && product.title}</h3>
                <p className='text-start card-body'>
                    {product && product.description}
                </p>
                <div className='card-footer text-start d-flex justify-content-between align-items-center mt-2'>
                    <div><FcRating style={{fontSize:'50px'}}/>{average}</div>
                    {
                        (product?.likes?.find((ele)=>ele.userId === user._id)) ?
                        (
                            <button 
                                className='btn btn-outline-dark'
                                onClick={()=>{handleProductDislike(product._id)}}>
                                    <FcDislike style={{fontSize: '30px'}}/> {product && product?.likes?.length}
                            </button>
                        )
                        :
                        (
                            <button 
                                className='btn btn-outline-dark'
                                onClick={()=>{handleProductLike(product._id)}}>
                                    <FcLike style={{fontSize:'30px'}} /> {product && product.likes && product.likes.length}
                            </button>
                        )
                    }
                </div>
            </div>
            <div>
                <div className='mt-5 text-start'>
                    <h3 className='text-muted'>Add Your Review.</h3>
                    <form onSubmit={handleSubmit}>
                        <ReactStars 
                            count={5} 
                            size={50} 
                            color1='black' 
                            color2='orange' 
                            half={false} 
                            value={rate}
                            onChange={handleRateChange}/>
                        <div className='form-group'>
                        <textarea 
                            className='form-control'
                            style={{width:600, height:200}}  
                            value={feedback} 
                            onChange={handleChange} 
                            placeholder='Write your feedback....'>    
                        </textarea>
                        </div>
                        {errors.feedback && <div className='mt-2 alert alert-danger col-md-3'><span>{errors.feedback}</span></div>}
                        <br/>
                        <input className='btn btn-outline-success btn-sm' type='submit' value={'Add your review.'}/>
                    </form>
                    <hr/>
                </div>
                <button 
                    className='mt-4 btn btn-outline-dark btn-lg'
                    value={showReviews} 
                    onClick={handleShowReviews}>
                        <LiaCommentSolid style={{fontSize:'50px'}} />Show Reviews
                </button>
                {
                    showReviews && 
                    <div className='mt-4 text-start'>
                        <h3 className='text-muted font-bold md-5'>All Reviews for the Product.</h3>
                        <ul className='list-group mt-3'>
                            {
                                product && product.reviews && product.reviews.map((ele)=>
                                {
                                    return <li className='list-group-item list-group-item-secondary' key={ele._id}>
                                        <h5>
                                            <b>{ele.text}</b> posted by <b>{ele.userId.username}</b> on <b>{ele.timestamp.slice(0,10)}</b> with <b>{ele.rating}</b> stars.
                                            <br/>
                                            {
                                                ele.likes.find((e)=>e.userId === user._id) ?
                                                (<>
                                                    <button 
                                                        className='btn btn-outline-dark mt-2 btn-sm'
                                                        disabled={ele.dislikes.find((e)=>e.userId===user._id)} 
                                                        onClick={()=>{handleReviewDislike(product._id, ele._id, user._id)}}>
                                                            <FcDislike style={{fontSize:'25px', marginRight: '5px'}}/>{ele.likes.length}
                                                    </button>
                                                    
                                                </>)
                                                :
                                                (<>
                                                    <button 
                                                        className='btn btn-outline-secondary mt-2 btn-sm'
                                                        disabled={ele.likes.find((e)=>e.userId===user._id)} 
                                                        onClick={()=>{handleReviewLike(product._id, ele._id, user._id)}}>
                                                            <FcLike style={{fontSize:'25px', marginRight:'5px'}} />{ele.likes.length}
                                                    </button>
                                                    
                                                </>)
                                            }
                                            {
                                                ele.userId._id === user._id &&
                                                <button 
                                                    className='btn btn-sm btn-outline-secondary mt-2'
                                                    style={{marginLeft:'15px'}}
                                                    onClick={()=>{handleReviewDelete(product._id, ele._id, ele.userId._id)}}>
                                                        <RiDeleteBin6Line style={{fontSize:'25px'}}/>
                                                </button>
                                            }

                                            <br/>
                                        </h5>
                                    </li>
                                })
                            }
                        </ul>
                    </div>
                }
            </div>
            <br/>
            <div className='link mt-3 mb-5 text-start'>
                <Link to='/' className="btn btn-outline-dark btn-lg">
                    <BsArrowLeftShort style={{fontSize:'35px'}}/><b>Home-Page</b>
                </Link>
            </div>
        </div>
    );
};

export default ProductView; 
