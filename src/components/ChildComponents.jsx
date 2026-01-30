import React from 'react'


const ChildComponents = React.memo((props) => {
    return (
        <div>
            <button onClick={props.handleFuncion}>{props.buttonName}</button>
        </div>
    )
})

export default ChildComponents