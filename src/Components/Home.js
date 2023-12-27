
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios'; 
import Swal from 'sweetalert2';

const Home = (props)=>
{
    const history = useHistory(); 
    const token = localStorage.getItem('token'); 
    const baseUrl = `http://localhost:4050`; 

    const [products, setProducts] = useState([]); 

    useEffect(()=>
    {
        (async function()
        {
            try
            {
                const temp = await axios.get(`${baseUrl}/get-all-products`, {headers:{authorization: token}}); 
                console.log(temp.data);
                setProducts(temp.data); 
            }
            catch(err)
            {
                Swal.fire({
                    title: 'Error fetching Products.', 
                    text: 'Please try again later. ', 
                    timer: 2000
                })
            };
        })()
    }, []);

    function handleViewContent(productId)
    {
        history.push(`/product/${productId}`);
    }

    return(
        <div>
            <h1>Home Page</h1>
            <ul>
                {
                    products.map((ele)=>
                    {
                        return <li key={ele._id}>
                                <h5>{ele.title}</h5>
                                <p>
                                    {ele.description}
                                </p>
                                <img src={ele.image} alt={ele.title} height={100} width={100}/>
                                
                                <button onClick={()=>{handleViewContent(ele._id)}}>View Product.</button>
                            </li>
                    })
                }
            </ul>
        </div>
    );
};

export default Home; 
