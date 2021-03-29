import React from 'react';
import './input.css';

{/* Render Input element based on config.type */}
const Input = ({ 
    config, 
    onChangeHandler 
}) => {
    
    return (
    <>
        {/* If the config is invalid */}
        {!config && <>Invalid Config</>}

        {/* for valid config types */}
        {config && (
        <div className="input-wrapper">

            {/* Render Input text element */}
            {config.type === "text" && (
                <input 
                    onChange={ (e)=> {onChangeHandler(config.id, e.target.value)}} 
                    value={config.value} 
                    placeholder={config.placeholder}
                />                    
            )}

            {/* Render other Input elements here based on config.type */}
                {/* Radio Group  */}
                {/* Check Box  */}
                {/* Select */}

            {/* Error Label */}
            {!config.valid && (
                <h1 className="error-label"> {config.validationText}</h1>
            )}
        </div>
        )}
    </>)
}
 
export default Input;