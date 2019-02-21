import React from 'react';
import {Form, Input} from 'antd';
import {ClinicalTrialSelect} from "../../../../../../components/Autosuggest/containers/ClinicalTrialSelect";
import DefaultHealthFields from '../DefaultFields';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

export const ClinicalTrialForm = (props) => {
    console.log(props);
    const {element={}, form, formItemLayout} = props;
    const {getFieldDecorator} = form;
    const {trial,cohort, sponsor, date} = element;
    return <React.Fragment>

        <FormItem
            {...formItemLayout}
            label='Clinical Trial'
        >
            {getFieldDecorator('trial', {
                    initialValue: trial,
                    rules: [{required: true, message: "Select Trial"}],
                }
            )(
                <ClinicalTrialSelect getFullInfo />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Clinical Trial Cohort'
        >
            {getFieldDecorator('cohort', {
                initialValue: cohort,
                }
            )(
                <TextArea autosize={{ minRows: 1 }} />
            )}
        </FormItem>

        <FormItem
            {...formItemLayout}
            label='Clinical Trial Sponsor'
        >
            {getFieldDecorator('sponsor', {
                initialValue: sponsor,
                }
            )(
                <TextArea autosize={{ minRows: 1 }} />
            )}
        </FormItem>

        <DefaultHealthFields {...props} />
        </React.Fragment>
}

export default ClinicalTrialForm;
