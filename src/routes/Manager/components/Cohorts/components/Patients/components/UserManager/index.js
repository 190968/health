import React from 'react';
import {Form} from 'antd';
import PatientSelect from '../../../../../../../../components/Autosuggest/containers/PatientSelect';
import PeopleSelect from '../../../../../../../../components/Autosuggest/containers/PeopleSelect';

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

const CohortUserManager = props => {
    const {role, form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator} = form;
    
    return <Form>

        {role == 'member' ?  <FormItem
            {...formItemLayout}
            label="Select Member"
        >
            {getFieldDecorator('patients', {
                rules: [{
                    required: true,
                    message: "Please Select Member",
                }],
            })(
                <PeopleSelect mode={'multiple'} />
            )}
        </FormItem> : <FormItem
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
        </FormItem>}
          
    </Form>
}

export default CohortUserManager;