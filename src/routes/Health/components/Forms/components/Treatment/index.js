import React from 'react';
import {Form, Input} from 'antd';
//import { TreatmentElementBuilder } from '../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/containers/TreatmentElementBuilder';
import {TreatmentFormElements} from './containers/Elements';
import DefaultHealthFields from '../DefaultFields';
import { prepareExistingHealthElementForMutation } from './containers/ElementManager';
import PatientSelect from '../../../../../../components/Autosuggest/containers/PatientSelect';
import PeopleSelect from '../../../../../../components/Autosuggest/containers/PeopleSelect';

const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const TreatmentForm = (props) => {
    const {form, details, element, user} = props;
    const {getFieldDecorator} = form;

    console.log(props);
    const {title, elements=[]} = details || {};


    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={'Title'}
            >
                {getFieldDecorator('title', {
                        initialValue: title,
                        rules: [{required: true, message: "Enter Title", whitespace: true}],
                    }
                )(<Input ref={(input) => input && input.focus()} />)}
            </FormItem>
            <FormItem
                {...formItemLayout}
                label={'Treatment'}
                required={true}
            >
                    {getFieldDecorator(`elements`, {
                        initialValue: elements.map(element => prepareExistingHealthElementForMutation(element))
                    })
                    (<TreatmentFormElements user={user} />)}

            </FormItem>
            <DefaultHealthFields {...props} formItemLayout={formItemLayout} />
            <FormItem
                {...formItemLayout}
                label={'Assign'}
            >
                {getFieldDecorator(`careTeam`, {
                        // initialValue: elements.map(element => prepareExistingHealthElementForMutation(element))
                    })
                    (<PeopleSelect role={'careteam'} user={user} />)}

            </FormItem>
        </React.Fragment>
    );
}

export default TreatmentForm;