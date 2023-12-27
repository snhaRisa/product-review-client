
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'; 
import axios from 'axios'; 


const InfoTable = (props)=>
{
    const baseURL = `http://localhost:4050`;
    const token = localStorage.getItem('token');

    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [showProducts, setShowProducts] = useState(false); 
    const [showUsers, setShowUsers] = useState(false); 
    const [showReviews, setShowReviews] = useState(false); 

    useEffect(()=>
    {
        (async function()
        {
            try
            {
                const productsTemp = await axios.get(`${baseURL}/get-product`, {headers:{authorization:token}}); 
                if(productsTemp.data.length>0)
                {
                    setProducts(productsTemp.data);
                }
                else
                {
                    Swal.fire({
                        title: 'Error fetching the Products.',
                        text: "Please try again later.", 
                        timer: 1000
                    });
                }

                const usersTemp = await axios.get(`${baseURL}/get-accounts`, {headers:{authorization:token}}); 
                setUsers(usersTemp.data);
            }
            catch(err)
            {
                console.error(err); 
            }
        })()
    },[token, baseURL]);

    function handleShowProducts()
    {
        setShowProducts(!showProducts);
    };
    function handleShowUsers()
    {
        setShowUsers(!showUsers);
    };
    function handleShowReviews()
    {
        setShowReviews(!showReviews);
    };

    async function handleUpdate(productObj)
    {
        try
        {
            let titleTemp, descriptionTemp, categoryTemp, fileImg, productId;  

            const { value: title } = await Swal.fire({
                title: "Enter New Title...",
                input: "text",
                inputLabel: "Your New Title.",
                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return "You need to write something!";
                  }
                }
            });
            const { value: description } = await Swal.fire({
                title: "Enter New Description...",
                input: "text",
                inputLabel: "Your New Description.",
                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return "You need to write something!";
                  }
                }
            });
            const { value: category } = await Swal.fire({
                title: "Enter New Category...",
                input: "text",
                inputLabel: "Your New Category.",
                showCancelButton: true,
                inputValidator: (value) => {
                  if (!value) {
                    return "You need to write something!";
                  }
                }
            });
            const { value: file } = await Swal.fire({
                title: "Select image",
                input: "file",
                inputAttributes: {
                  "accept": "image/*",
                  "aria-label": "Upload your profile picture"
                }
            });
            

            productId = productObj._id;
            if(file)
            {
                fileImg = file;  
            }
            else
            {
                fileImg = productObj.image;
            }
            if(title)
            {
                titleTemp = title 
            }
            else
            {
                titleTemp = productObj.title
            };
            if(description)
            {
                descriptionTemp = description;
            }
            else
            {
                descriptionTemp = productObj.description; 
            };
            if(category)
            {
                categoryTemp = category; 
            }
            else
            {
                categoryTemp = productObj.category; 
            }; 

            const temp = await axios.put(`${baseURL}/update-product`, {productId, titleTemp, descriptionTemp, categoryTemp, fileImg}, {headers:{authorization:token, 'Content-Type': 'multipart/form-data'}});
            setProducts(temp.data);
        }
        catch(err)
        {
            Swal.fire({
                title: 'Could not update the product.', 
                text: 'Please try again later.', 
                timer: 2000
            });
        };
    };

    async function handleDelete(id)
    {
        try
        {
            const tempDoc = await axios.delete(`${baseURL}/delete-product`, {data: {productId: id}, headers: { authorization: token }}); 
            setProducts(tempDoc.data);
        }
        catch(err)
        {
            Swal.fire({
                title: 'Error Deleting Entity.', 
                text: 'Please try again later', 
                timer: 1000
            });
        };
    };

    async function handleUserDelete(userId)
    {
        try
        {
            const tempDoc = await axios.delete(`${baseURL}/delete-account`, {data: {id: userId}, headers: {authorization: token}});
            setUsers(tempDoc.data); 
        }
        catch(err)
        {
            Swal.fire({
                title: 'Error deleting the Entity.', 
                text: 'Please try again later.', 
                timer: 1000
            });
        };
    };


    return(
        <div>
            <button value={showProducts} onClick={handleShowProducts}>Show Products.</button>
            <button value={showUsers} onClick={handleShowUsers}>Show Users.</button>
            <button value={showReviews} onClick={handleShowReviews}>Show Reviews.</button>
            {
                showProducts && 
                <>
                    <h3>Product table.</h3>
                    <table border={2}>
                        <thead>
                            <tr>
                                <th>Id.</th>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Likes</th>
                                <th>Dislikes</th>
                                <th>Reviews</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products.map((ele)=>
                                {
                                    return <tr key={ele._id}>
                                        <td>{ele._id}</td>
                                        <td>{ele.title}</td>
                                        <td>{ele.category}</td>
                                        <td>{ele.description}</td>
                                        <td><img src={ele.image} alt={ele.title} width={80} height={80}/></td>
                                        <td>{ele.likes.length}</td>
                                        <td>{ele.dislikes.length}</td>
                                        <td>{ele.reviews.length}</td>
                                        <td><button>Show Product.</button><br/>
                                            <button onClick={()=>{handleUpdate(ele)}}>Update Product</button><br/>
                                            <button onClick={()=>{handleDelete(ele._id)}}>Delete</button>
                                        </td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </>
            }
            {
                showUsers &&
                <>
                    <h1>Users Table.</h1>
                    <table border={2}>
                        <thead>
                            <tr>
                                <th>Id.</th>
                                <th>Name</th>
                                <th>E-Mail</th>
                                <th>Image</th>
                                <th>Created At.</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((ele)=>
                                {
                                    return <tr key={ele._id}>
                                        <td>{ele._id}</td>
                                        <td>{ele.username}</td>
                                        <td>{ele.email}</td>
                                        <td><img src={ele.image} alt='User Profile' width={80} height={80}/></td>
                                        <td>{ele.createdAt.slice(0,10)}</td>
                                        <td><button disabled={ele.role==='admin'} onClick={()=>{handleUserDelete(ele._id)}}>Delete the User.</button></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </>
            }
            {
                showReviews &&
                <>
                    <h1>Reviews Table.</h1>
                </>
            }
        </div>
    );
};

export default InfoTable; 
