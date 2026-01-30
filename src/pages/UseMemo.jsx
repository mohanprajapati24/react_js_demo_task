import React, { useMemo, useState } from 'react'

const UseMemo = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(0);

    // const [expensiveCalculation, setExpensiveCalculation] = useState(0);
    const expensiveCalculation = (num) => {
        for (let i = 0; i < 1000000000; i++) {
        }
        return num * 2;
    }

    // let doubleVlaue = expensiveCalculation(value);
    const doubleVlaue = useMemo(() => expensiveCalculation(value), [value]);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <p>Count: {count}</p>
            <input type="number" placeholder='Enter a number' value={value} onChange={(e) => setValue(e.target.value)} />
            <p>Expensive Calculation: {doubleVlaue}</p>
        </div>
    )
}

export default UseMemo