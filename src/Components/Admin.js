
import { useState } from 'react'; 
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import ProductForm from './ProductForm';
import InfoTable from './InfoTable'; 

const Admin = (props)=>
{
    const [trigger, setTrigger] = useState(false);
    const user = useSelector((state)=>
    {
        return state.user; 
    });
    //Add products, update products, delete products. 
    //Read and delete reviews. 
        //Form to add products. 
        //A table to have all products and basic info with click it to see the page of products. Option to delete everything. 
        //A table to see all the users. TO be able to delete them or see their profile page. 

    function handleState()
    {
        setTrigger(!trigger);
    };

    return(
        user.role === 'admin' ?
            <div className='container mt-5 mx-auto'>
                <h1 className='display-2'><span className='badge rounded-pill bg-dark'>Welcome Mr. Admin</span></h1>
                <p className='text-muted mt-5'>
                    Admin privileges lets you add products, read info through table and delete products. 
                    Apart from that you would be able to delete users and moderate their comments. 
                </p>
                <hr/>
                <ProductForm handleState={handleState}/>
                <InfoTable trigger={trigger}/>
                <blockquote className="mt-5 mb-5 blockquote text-right">
                    <p>Admin tasks made simple, just for you.</p>
                    <footer className='blockquote-footer'>P.R.S</footer>
                </blockquote>
            </div>
            :
            null
    );
};

export default Admin; 
