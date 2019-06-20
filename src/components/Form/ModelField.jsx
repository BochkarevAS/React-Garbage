import React, { Component } from 'react'
import Select from 'react-select'

export default class ModelField extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { input, placeholder, customChange, options} = this.props;

        return (
            <Select
                {...input}
                closeMenuOnSelect={false}
                options={options}
                isMulti
                onChange={(value) => {
                    input.onChange(value);
                    customChange(value)
                }}
                onBlur={() => input.onBlur(input.value)}
                defaultOptions
                placeholder={placeholder}
            />
        )
    }
}