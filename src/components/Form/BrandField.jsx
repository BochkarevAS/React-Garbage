import React from 'react'
import { fetchOptions } from '../../../../action/form'
import Select from 'react-select'

export default class BrandField extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: []
        };
    }

    componentDidMount() {
        fetchOptions(`/api/part/brand`)
            .then((json) => {
                this.setState({
                    options: json.data
                });
            })
            .catch((err) => {
                console.error('err', err);
            });
    }

    render() {
        const { input, placeholder, customChange } = this.props;

        return (
            <Select
                {...input}
                onChange={(value) => {
                    input.onChange(value);
                    customChange(value)
                }}
                onBlur={() => input.onBlur(input.value)}
                options={this.state.options}
                placeholder={placeholder}
            />
        )
    }
}