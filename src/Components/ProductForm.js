
import { useState } from 'react'; 
import { useDispatch} from 'react-redux'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import { startAddProduct } from '../Actions/productAction';

const ProductForm = (props)=>
{
    const { handleState } = props; 
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
            dispatch(startAddProduct(productObj, resetForm, handleState));
        }        
    }

    return(
        <div className='container mt-2 text-start'>
            <h3 className='mt-2 display-4'>Add a Product here Admin!</h3>
                <form onSubmit={handleSubmit}>
                    <div className='form-group mt-4'>
                        <label>
                            Product Image : 
                            <br/>
                            <input
                                className='form-control' 
                                type='file' 
                                name='productImage'
                                onChange={handleChange}
                                accept='image/*' 
                                required/>
                        </label><br/>
                    </div>
                    <div className='form-group mt-4 col-md-6'>
                    <input 
                        className='form-control'
                        type='text' 
                        name='title' 
                        value={title} 
                        onChange={handleChange} 
                        required
                        placeholder='Enter Product Title...'
                    />
                    {errors.title && <div className='mt-3 alert alert-danger'><span>{errors.title}</span></div>}
                    </div>
                    <br/>
                    <div className='form-group col-md-6'>
                    <textarea 
                        className='form-control'
                        name='description' 
                        value={description} 
                        required
                        onChange={handleChange} 
                        placeholder='Enter product description....'>
                    </textarea>
                    {errors.description && <div className='mt-3 alert alert-danger'><span>{errors.description}</span></div>}
                    </div>
                    <br/>
                    <div className='form-group col-md-6'>
                    <input 
                        className='form-control'
                        type='text' 
                        name='category'
                        value={category}
                        required
                        onChange={handleChange}
                        placeholder='Enter your product category...'
                    />
                    {errors.category && <div className='mt-3 alert alert-danger'><span>{errors.category}</span></div>}
                    </div>
                    <br/>
                    <div>
                        <input className='btn btn-outline-dark mt-2 md-5' type='submit' value={'Add the Product'}/>
                    </div>
                </form>
            <hr/>
        </div>
    );    
};

export default ProductForm; 
