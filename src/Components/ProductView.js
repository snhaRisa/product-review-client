
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ReactStars from 'react-stars';
import axios from 'axios';
import Swal from 'sweetalert2';

import { addUser } from '../Actions/userActions';

const ProductView = (props)=>
{
    const user = useSelector((state)=>
    {
        return state.user; 
    });

    const dispatch = useDispatch(); 
    const {productId} = useParams();
    const baseUrl = 'http://localhost:4050'; 
    const token = localStorage.getItem('token'); 
    
    const [product, setProduct] = useState({}); 
    const [rate, setRate] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [errors, setErrors] = useState({});

    //Rendering states.
    const [showReviews, setShowReviews] = useState(true); 
    const [isLiked, setIsLiked] = useState(null); 
    const [isReviewLiked, setIsReviewLiked] = useState(null);
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
                }
                
                //Checking conditions. 
                const checkLike = tempDoc.data.likes.find((ele)=>ele.userId === tempAccount.data._id); 
                if(checkLike)
                {
                    setIsLiked(true);
                }

                //Calculation ratings.
                const rating = tempDoc.data.reviews.reduce((prev, curr)=>
                {
                    return prev+=curr.rating; 
                }, 0);
                const avg = rating/tempDoc.data.reviews.length; 
                
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
    }, []);

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
            setIsLiked(true);
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


    // async function handleProductDislike(productId)
    // {
    //     if(isLiked === 'disliked')
    //     {
    //         return Swal.fire('You have already disliked the product', 'success'); 
    //     }
    //     try
    //     {
    //         const temp = await axios.put(`${baseUrl}/add-product-dislike`, {userId: user._id, productId: productId}, {headers:{authentication:token}}); 
    //         setProduct(temp.data);
    //     }
    //     catch(err)
    //     {
    //         Swal.fire({
    //             title: 'Error while disliking the Product.', 
    //             text: 'Try again later', 
    //             timer: 1000
    //         });
    //     };
    // };

    return(
        <div>
            <h2>This is your product.</h2>
            <hr/>
            <>
                <h4>{product && product.title}</h4>
                <p>
                    {product && product.description}
                </p>
                <img 
                    src={product.image} 
                    alt={product.title} 
                    width={400} 
                    height={500}
                />
                <h6>Likes : {product && product.likes && product.likes.length}
                    <button 
                        disabled={isLiked}
                        onClick={()=>{handleProductLike(product._id)}}>
                            Like
                    </button>
                </h6>
                <h6>Average rating of the Product : {average}</h6>
                {/* <h6>Dislikes : {product && product.dislikes && product.dislikes.length}
                    <button 
                        disabled={isLiked==='disliked'}
                        onClick={()=>{handleProductDislike(product._id)}}>
                        Dislike
                    </button>
                </h6> */}
                <br/>
    
                <button 
                    value={showReviews} 
                    onClick={handleShowReviews}>
                        Show Reviews
                </button>
                {
                    showReviews && 
                    <>
                        <h3>Add Your Review.</h3>
                        <form onSubmit={handleSubmit}>
                            <ReactStars 
                                count={5} 
                                size={70} 
                                color1='black' 
                                color2='red' 
                                half={false} 
                                value={rate}
                                onChange={handleRateChange}/>
                            <textarea 
                                style={{width:600, height:200}}  
                                value={feedback} 
                                onChange={handleChange} 
                                placeholder='Write your feedback....'>    
                            </textarea>
                            {errors.feedback && <span>{errors.feedback}</span>}
                            <br/>
                            <input type='submit' value={'Add your review.'}/>
                        </form>
                        <hr/>
                        <h4>All reviews.</h4>
                        <ul>
                            {
                                product && product.reviews && product.reviews.map((ele)=>
                                {
                                    return <li key={ele._id}>
                                        <h5>
                                            {ele.text} posted by {ele.userId.username} on {ele.timestamp.slice(0,10)} with {ele.rating} stars.
                                            <button 
                                                disabled={ele.likes.find((e)=>e.userId===user._id)} 
                                                onClick={()=>{handleReviewLike(product._id, ele._id, user._id)}}>
                                                    Like
                                            </button> {ele.likes.length}
                                            <br/>
                                            <button 
                                                disabled={ele.dislikes.find((e)=>e.userId===user._id)} 
                                                onClick={()=>{handleReviewDislike(product._id, ele._id, user._id)}}>
                                                    Dislike
                                            </button> {ele.dislikes.length}
                                            <br/>
                                        </h5>
                                    </li>
                                })
                            }
                        </ul>
                    </>
                }
            </>
            <br/>
            <Link to='/'>Back to Home-Page.</Link>
        </div>
    );
};

export default ProductView; 
