
const user = {};

const userReducer = (state = user, action)=>
{
    switch(action.type)
    {
        case 'ADD_USER':{
            return action.payload
        }
        case 'REMOVE_USER':{
            return {}
        }
        default:{
            return state;
        }
    }
};

export default userReducer; 
