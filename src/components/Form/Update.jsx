import React from 'react'
import PartForm from './PartForm'
import { initialize, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { update } from '../../../../action/form'
import { fetchOptions, fetchGet } from '../../../../action/form'

export const fields = [
    'brand', 'models', 'frames', 'engines', 'ud', 'fr', 'rl', 'user',
    'availability', 'condition', 'city', 'company', 'name', 'images', 'price'
];

class Update extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            models: [],
            frames: [],
            engines: []
        };

        this.handleSubmit.bind(this);

        this.onBrand = this.onBrand.bind(this);
        this.onModel = this.onModel.bind(this);
        this.onImage = this.onImage.bind(this);
    }

    handleSubmit(values) {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { match } = this.props;
        const id = match.params.part;

        update(`/api/part/${id}/update`, values, config)
            .then((json) => {
                console.log(json);
            })
            .catch((err) => {
                console.error('err', err);
            });
    }

    componentWillMount() {
        const { match } = this.props;

        if (match.params) {
            const id = match.params.part;

            fetchGet(`/api/part/${id}/render`)
                .then((json) => {
                    this.onBrand(json.data.brand);
                    this.onModel(json.data.models);

                    console.log(json);

                    this.props.dispatch(initialize('part', json.data, fields));
                })
                .catch((err) => {
                    console.error('err', err);
                });
        }
    }

    onBrand(brand) {
        if (undefined === brand) {
            return;
        }

        let id = brand.value;

        if (id) {
            fetchOptions(`/api/part/${id}/model`)
                .then((json) => {
                    this.setState({
                        models: json.data
                    });
                })
                .catch((err) => {
                    console.error('err', err);
                });
        }
    }

    onModel(model) {
        this.setState({
            frames: [],
            engines: []
        });

        if (undefined === model) {
            return;
        }

        if (0 !== model.length) {
            fetchGet(`/api/part/relation`, {params: model})
                .then(json => {
                    if (404 !== json.status) {
                        if (json.data) {
                            this.setState({
                                frames: json.data.frames,
                                engines: json.data.engines
                            });
                        }
                    }
                })
                .catch((err) => {
                    console.error('err', err);
                })
        }
    }

    onImage(acceptedFiles) {

        // this.setState({ preview: e[0].preview });

        console.log(acceptedFiles);

    }

    render() {
        const { availability, condition, ud, fr, rl } = this.props;

        return (
            <PartForm
                onSubmit={this.handleSubmit.bind(this)}
                onBrand={this.onBrand.bind(this)}
                onModel={this.onModel.bind(this)}
                onImage={this.onImage.bind(this)}
                models={this.state.models}
            />
        )
    }
}

const selector = formValueSelector('part');

const mapStateToProps = (state, props) => {
    let initialValues = {};

    return {
        initialValues
    }
};

export default connect(mapStateToProps)(Update);