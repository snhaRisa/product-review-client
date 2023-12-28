
import { useState, useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './Navigation';

const App = (props)=>
{
    const [isLog, setIsLog] = useState(false);
    const token = localStorage.getItem('token');
    
    useEffect(()=>
    {
        if(token)
        {
            setIsLog(true);
        }
        else
        {
            setIsLog(false);
        };
        
    }, [token]);

    function handleIsLog()
    {
        setIsLog(!isLog);
    };

    return (
        <div className='container mt-3 text-center'>
            <h1 className='display-1 font-weight-bold' style={{fontSize: '6rem'}}><u>Product Review System</u></h1>
            <Navigation isLog={isLog} handleIsLog={handleIsLog}/>
        </div>
    );
};

export default App; 
