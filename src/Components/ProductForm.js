
import { useState } from 'react'; 
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'; 

import { startAddProduct } from '../Actions/productAction';

const ProductForm = (props)=>
{
    const dispatch = useDispatch(); 

    const [productImg, setProductImg] = useState(null); 
    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(''); 
    const [errors, setErrors] = useState({}); 

    function handleChange(event)
    {
        const {name, value} = event.target;

        if(name==='title')
        {
            setTitle(value)
        }
        else if(name==='description')
        {
            setDescription(value); 
        }
        else if(name==='category')
        {
            setCategory(value); 
        }
        else if(name==='productImage')
        {
            const img = event.target.files[0]; 
            console.log(img);
            setProductImg(img); 
        };
    };

    function resetForm()
    {
        setProductImg(''); 
        setTitle(''); 
        setDescription(''); 
        setCategory(''); 
        setErrors({});
    };

    function runValidations()
    {
        const temp = {};

        if(title.trim().length === 0)
        {
            temp.title = 'Title cannot be empty!'; 
        }

        if(description.trim().length < 5)
        {
            temp.description = 'Description must be alteast 5 characters.'
        }

        if(category.trim().length===0)
        {
            temp.category = 'Category cannot be blank.'; 
        }

        return temp; 
    };

    function handleSubmit(event)
    {
        event.preventDefault(); 

        const temp = runValidations(); 

        if(Object.keys(temp).length>0)
        {
            setErrors(temp);
        }
        else
        {
            const productObj = {
                title, 
                productImage: productImg, 
                description, 
                category
            };
            dispatch(startAddProduct(productObj, resetForm));
        }        
    }

    return(
        <>
        <h3>Add a product here Admin !</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Product Image : 
                    <input 
                        type='file' 
                        name='productImage'
                        onChange={handleChange}
                        accept='image/*' 
                        required/>
                </label><br/>
                <input 
                    type='text' 
                    name='title' 
                    value={title} 
                    onChange={handleChange} 
                    required
                    placeholder='Enter Product Title...'
                />
                {errors.title && <span>{errors.title}</span>}
                <br/>
                <textarea 
                    name='description' 
                    value={description} 
                    required
                    onChange={handleChange} 
                    placeholder='Enter product description....'>
                </textarea>
                {errors.description && <span>{errors.description}</span>}
                <br/>
                <input 
                    type='text' 
                    name='category'
                    value={category}
                    required
                    onChange={handleChange}
                    placeholder='Enter your product category...'
                />
                {errors.category && <span>{errors.category}</span>}
                <br/>

                <input type='submit' value={'Add the Product'}/>
            </form>
        </>
    );    
};

export default ProductForm; 
