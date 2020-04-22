import React from 'react';
import {Form, Input} from 'antd';
import { DiagnosisSelect } from '../../../../../../components/Autosuggest/containers/DiagnosisSelect';
import { CancerStageSelect } from '../../../../../../components/Autosuggest/containers/CancerStageSelect';
import ChemotherapySelect from '../../../../../../components/Autosuggest/containers/ChemotherapySelect';

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

const CancerManager = props => {
    const { cancer, form, formItemLayout=formItemLayoutDefault} = props;
    const {getFieldDecorator, getFieldValue} = form;
    // const {title='', getCohorts=[], getAssessments=[], executeDate, canBeEdited=false} = cancer || {};
    const {title='', code='', stage, chemotherapies=[]} = cancer || {};
    console.log(props);
    return <Form>
        <FormItem
            {...formItemLayout}
            label="Name"
        >
            {getFieldDecorator('title', {
                initialValue: title,
                rules: [{
                    required: true,
                    message: "Please enter Cancer name",
                }],
            })(
                <Input />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Select Diagnosis'
        >
            {getFieldDecorator('code', {
                    initialValue: code,
                    rules: [{required: true, message: "Select Diagnosis"}],
                }
            )(
                <DiagnosisSelect codeAsId getFullInfo={false} />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Select Stage'
        >
            {getFieldDecorator('stage', {
                    initialValue: stage,
                    rules: [{required: true, message: "Select Stage"}],
                }
            )(
                <CancerStageSelect />
            )}
        </FormItem>


        <FormItem
            {...formItemLayout}
            label='Chemotherapies'
        >
            {getFieldDecorator('chemotherapies', {
                    initialValue: chemotherapies,
                    rules: [{required: true, message: "Select Chemotherapy"}],
                }
            )(
                <ChemotherapySelect mode="multiple" />
            )}
        </FormItem>
    </Form>
}

export default CancerManager;
