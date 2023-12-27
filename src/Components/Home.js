
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
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    useEffect(()=>
    {
        (async function()
        {
            try
            {
                const temp = await axios.get(`${baseUrl}/get-all-products`, {headers:{authorization: token}}); 
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
    }, [token]);

    function handleViewContent(productId)
    {
        history.push(`/product/${productId}`);
    };

    function handleChange(event)
    {
        const {value} = event.target; 
        
        setSearch(value); 

        if(value.length > 2)
        {
            const temp = products.filter((ele)=>
            {
                return ele.category.toLowerCase().includes(value.toLowerCase()) || ele.title.toLowerCase().includes(value.toLowerCase());
            });

            setSearchResult(temp);
        }
        else
        {
            setSearchResult([]);
        }
    };

    return(
        <div>
            <h1>Home Page</h1>
            <input type="text" value={search} onChange={handleChange} placeholder="Search title or category...."/>
            {
                searchResult.length > 0 &&
                <table border={2}>
                    <thead>
                        <tr>
                            <th>Id.</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            searchResult.map((ele)=>
                            {
                                return <tr key={ele._id}>
                                    <td>{ele._id}</td>
                                    <td>{ele.title}</td>
                                    <td>{ele.category}</td>
                                    <td><button onClick={()=>{handleViewContent(ele._id)}}>View Product.</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            }
            
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
