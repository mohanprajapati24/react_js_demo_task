import React, { useCallback, useState, useEffect } from 'react'

const ExpensiveComponents = () => {
    const [count, setCount] = useState(0);
    const [value, setValue] = useState('');
    const [calculatedValue, setCalculatedValue] = useState(0);

    // const [expensiveCalculation, setExpensiveCalculation] = useState(0);
    const expensiveCalculation = useCallback(() => {
        console.log(`Expensive calculation function running...`)
        let result = 0;
        for (let i = 0; i < 1000000000; i++) {
            result += i
        }
        return result;
    }, [count]);

    useEffect(() => {
        setCalculatedValue(expensiveCalculation());
    }, [expensiveCalculation]);

    return (
        <div>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <p>Count: {count}</p>
            <input type="text" placeholder='Enter a text' value={value} onChange={(e) => setValue(e.target.value)} />
            <p>Expensive Calculation : {calculatedValue}</p>
        </div>
    )
}

export default ExpensiveComponents
