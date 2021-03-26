import React from 'react';
import './input.css';

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
            {config.type === "text" && (
                <input 
                    onChange={ (e)=> {onChangeHandler(config.id, e.target.value)}} 
                    value={config.value} 
                    placeholder={config.placeholder}
                />                    
            )}
            {/* Error Label */}
            {!config.valid && (
                <h1 className="error-label"> {config.validationText}</h1>
            )}
        </div>
        )}
    </>)
}
 
export default Input;