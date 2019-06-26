import React from 'react'
import PartForm from './PartForm'
import { initialize, formValueSelector } from 'redux-form'
import { connect } from 'react-redux'
import { fetchOptions, fetchGet } from '../../../../action/form'

export const fields = [
    'brand', 'models', 'frames', 'engines', 'ud', 'fr', 'rl', 'user',
    'availability', 'condition', 'city', 'company', 'name', 'images', 'price'
];

class Create extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            company: undefined,
            user: undefined,
            models: [],
            images: []
        };

        this.handleSubmit.bind(this);

        this.onBrand = this.onBrand.bind(this);
        this.onModel = this.onModel.bind(this);
        this.onImage = this.onImage.bind(this);
    }

    componentDidMount() {
        const { match } = this.props;
        const keys = ['company', 'user'];

        if (match.params) {
            const param = Object.keys(match.params)[0];
            let json = {};

            json[param] = match.params[param];

            if (-1 !== keys.indexOf(param)) {
                this.props.dispatch(initialize('part', json, fields));
            }
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
            this.props.change('part', 'frames', '');
            this.props.change('part', 'engines', '');

            return;
        }

        if (0 !== model.length) {
            fetchGet(`/api/part/relation`, {params: model})
                .then(json => {
                    if (404 !== json.status) {
                        if (json.data) {
                            /**
                             * Здесь используется локальный state что не очень ...
                             */
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
        this.setState({ images: acceptedFiles});
    }

    handleSubmit(values) {
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };

        let images   = this.state.images;

        /**
         * Что бы нормально принять данные на симфони по хорошему счёту нужно
         * переопределить ParamConverter или расширить интерфейс ArgumentValueResolverInterface
         */
        let formData = new FormData();

        images.forEach((file, index) => {
            formData.append(index, file);
        });

        for (let key in values) {
            formData.append(key, JSON.stringify(values[key]));
        }

        create(`/api/part/create`, formData, config)
            .then((json) => {
                console.log(json);
            })
            .catch((err) => {
                console.error('err', err);
            });
    }

    render() {

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

export default connect(mapStateToProps)(Create);