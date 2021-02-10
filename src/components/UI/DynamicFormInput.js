import React from 'react'

const DynamicFormInput = (props) => {
    let inputElement = null;

    switch (props.elementType) {
        case 'input':
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                style={props.style}
                onChange={props.changed}
            />;
            break;
        default:
            inputElement = <input
                {...props.elementConfig}
                value={props.value}
                style={props.style}
                onChange={props.changed}
            />;
            break;
    }

    return (
        <div>
            <label>{props.label}: </label>
            {inputElement}
        </div>
    )
}

export default DynamicFormInput;