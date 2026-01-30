import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../redux/slice/CounerSlice';

const ReactRedux = () => {
  const count = useSelector((state) => state?.counter?.value);
  const dispatch = useDispatch();
  return (
    <div>
      <div>
        <button className='btn-lift'
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  )
}

export default ReactRedux
