
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios'; 
import Swal from 'sweetalert2';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { MdReviews } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';


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
        <div className="container mt-5">
            <h1 className="display-1">Home Page</h1>
            <div className="form-group col-md-8 mx-auto mt-5">
                <input className="form-control" type="text" value={search} onChange={handleChange} placeholder="Search title or category...."/>
            </div>
            {
                searchResult.length > 0 &&
                <div className="mt-5 col-md-10 mx-auto">
                <table className="table table-bordered table-dark table-dark" border={2}>
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
                                    <td><button className="btn btn-sm btn-outline-warning" onClick={()=>{handleViewContent(ele._id)}}>View Product.</button></td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
                </div>
            }
            {
                <div className="container mt-5">
                    <div className="row">
                        {
                            products.length > 0 &&
                            products.map((ele) => (
                                <div className="col-md-3 mb-4" key={ele._id}>
                                    <div className="card">
                                        <img className="card-img-top" src={ele.image} alt={ele.title} style={{ height: '200px', objectFit: 'cover' }} />
                                        <div className="card-body">
                                            <h5 className="card-title">{ele.title}</h5>
                                            <p className="card-text">
                                                {ele.description.length>10 ? `${ele.description.slice(0,10)}...` : ele.description }
                                            </p>
                                            <small className="text-muted" style={{ marginRight: '15px' }}><AiOutlineLike/>{ele.likes.length}</small>
                                            <small className="text-muted" style={{ marginRight: '15px' }}><AiOutlineDislike/>{ele.dislikes.length}</small>
                                            <small className="text-muted"><MdReviews />{ele.reviews.length}</small>
                                        </div>
                                        <div className="card-footer">
                                            <button className="mt-2 btn btn-outline-secondary" onClick={() => { handleViewContent(ele._id) }}>View Product</button>
                                        </div>
                                    </div>
                                </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    );
};

export default Home; 
