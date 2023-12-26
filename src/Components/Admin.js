
import React from 'react'; 
import { useSelector } from 'react-redux';

import ProductForm from './ProductForm';
import InfoTable from './InfoTable'; 

const Admin = (props)=>
{
    const user = useSelector((state)=>
    {
        return state.user; 
    });
    //Add products, update products, delete products. 
    //Read and delete reviews. 
        //Form to add products. 
        //A table to have all products and basic info with click it to see the page of products. Option to delete everything. 
        //A table to see all the users. TO be able to delete them or see their profile page. 

    return(
        user.role === 'admin' ?
            <div>
                <h1>Welcome Mr. Rishav</h1>
                <p>
                    Admin privileges lets you add products, read info through table and delete products. 
                    Apart from that you would be able to delete users and moderate their comments. 
                </p>
                <hr/>
                <ProductForm/>
                <InfoTable/>
            </div>
            :
            null
    );
};

export default Admin; 
