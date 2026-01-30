import React, { useEffect, useState } from 'react'

const LifeCycle = () => {
    const [count, setCount] = useState(0);
    const [show, setShow] = useState(true);

    useEffect(()=> {
        // Component Did Mount first time renderd in dom
        console.log(`-------------Componet Mount-------------`);


        return () => {
            // Cleanup
            console.log(`-------------Componet Unmount-------------`);
        }
    }, [])


    useEffect(() => {
        console.log(`-------------Componet Update-------------`, count);
    }, [count])

    return (
        <div>
            <h2>Mounting, Updating, Unmounting Example</h2>

            {show && <p>Count: {count}</p>}

            <button onClick={() => setCount(count + 1)}>
                Increment Count
            </button>

            <button onClick={() => {setCount(count - 1);}}>
                Remove Component
            </button>
        </div>
    )
}

export default LifeCycle
