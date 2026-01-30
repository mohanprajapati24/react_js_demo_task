import React, { useCallback, useState } from 'react'
import ExpensiveComponents from '../components/ExpensiveComponents'
// import ChildComponents from '../components/ChildComponents';

const UseCallBack = () => {
    // const [count, setCount] = useState(0);

    // const handleFuncion = useCallback(() => {
    //     console.log("handleFuncion")
    //     setCount(count + 1)
    // }, [])
    return (
        <div>
            {/* <p>Count: {count}</p>

            <button onClick={handleFuncion}>Click me</button>

            <br /> <br />
            <ChildComponents buttonName="Click me" handleFuncion={handleFuncion} /> */}
            <ExpensiveComponents />
        </div>
    )
}

export default UseCallBack