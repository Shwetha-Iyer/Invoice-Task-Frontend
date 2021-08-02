  
import React from 'react';
import Select from 'react-select';

export default function Customselect({ onChange, options, value }) {

    const defaultValue = (options, value) => {
        return options ? options.find(option => option.value === value) : "";
    };

    return (
        <div className="select">
            <Select
                value={defaultValue(options, value)}
                onChange={value => {
                    onChange(value)

                }} options={options}
                />
        </div>

    )
}