import React from 'react';
import {Form} from 'antd';
import PatientSelect from '../../../../../../../../components/Autosuggest/containers/PatientSelect';

const FormItem = Form.Item;

const formItemLayoutDefault = {
    labelCol: {
        xs: {span: 20},
        sm: {span: 6},

    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

const ScreeningPopulationUserManager = props => {
    const {screening, form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator} = form;
    return <Form>
        <FormItem
            {...formItemLayout}
            label="Select Patient"
        >
            {getFieldDecorator('patients', {
                rules: [{
                    required: true,
                    message: "Please Select Patient",
                }],
            })(
                <PatientSelect mode={'multiple'} />
            )}
        </FormItem>
          
    </Form>
}

export default ScreeningPopulationUserManager;