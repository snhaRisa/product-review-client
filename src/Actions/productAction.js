
import axios from "axios";
import Swal from "sweetalert2";

const baseURL = `http://localhost:4050`;
const token = localStorage.getItem('token'); 

//API function to add a product in the database. 
export const startAddProduct = (inputObj, resetForm, handleState)=>
{
    return (async (dispatch)=>
    {
        try
        {
            const tempProduct = await axios.post(`${baseURL}/add-product`, inputObj, {headers:{authorization:token, 'Content-Type': 'multipart/form-data'}});
            if(tempProduct.data.hasOwnProperty('title'))
            {
                Swal.fire({
                    title: 'Product was added successfully !', 
                    timer: 1000
                });
                resetForm(); 
                handleState();
            }
            else
            {
                Swal.fire({
                    title: "Error adding the product.",
                    text: "Please try again later!", 
                    timer: 1500
                });
            };
        }
        catch(err)
        {
            Swal.fire('Error while uploading the product. Please try again later.');
        }
    });
};

//Adding new product in the state. 
export const addProduct = (inputObj)=>
{
    return({
        type: 'ADD_PRODUCT', 
        payload: inputObj
    });
};
