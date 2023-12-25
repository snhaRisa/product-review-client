
const products = []; 

const productReducer = (state=products, action)=>
{
    switch(action.type)
    {
        case "ADD_PRODUCT":{
            return [...state, action.payload]
        }
        default:{
            return state; 
        }
    }
};

export default productReducer; 
