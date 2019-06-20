import React, { Fragment } from 'react'
import { Field, reduxForm } from 'redux-form'
import BrandField from './BrandField'
import MultiSelectField from './ModelField'
import DropzoneField from '../DropzoneField'

export const fields = [
    'brand', 'models', 'frames', 'engines', 'ud', 'fr', 'rl', 'user',
    'availability', 'condition', 'city', 'company', 'name', 'images', 'price'
];

class PartForm extends React.Component {

    render() {
        const { handleSubmit, reset, pristine, submitting, valid, onBrand, onModel, onImage, models} = this.props;

        return (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group">

                    <div className="row">
                        <div className="col-2">
                            <Field name="brand" className="form-control" label="Производитель" placeholder="производитель" component={BrandField} customChange={onBrand} />
                        </div>
                        <div className="col-2">
                            <Field name="models" className="form-control" label="Модели" placeholder="модели" component={ModelField} options={models} customChange={onModel} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-3">
                            <label className="form-label">Загрузить</label>
                            <Field name='files' label="Загрузить" customChange={onImage} component={DropzoneField} />
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={!valid}>Сохранить</button>
                </div>
            </form>
        )
    }
}

export default reduxForm({
    form: 'part',
    fields: fields,
    validate: ValidatePart,
    enableReinitialize: true,
    keepDirtyOnReinitialize: true
})(PartForm);