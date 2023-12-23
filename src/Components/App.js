
import { useState, useEffect } from 'react'; 

import Navigation from './Navigation';

const App = (props)=>
{
    const [isLog, setIsLog] = useState(false);

    useEffect(()=>
    {
        const token = localStorage.getItem('token'); 
        if(token)
        {
            setIsLog(true);
        }
        else
        {
            setIsLog(false); 
        }
    }, []);

    function handleIsLog()
    {
        setIsLog(!isLog);
    };

    return (
        <div>
            <h1>Product Review System !</h1>
            <Navigation isLog={isLog} handleIsLog={handleIsLog}/>
        </div>
    );
};

export default App; 
