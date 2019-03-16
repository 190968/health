import React from 'react';
import {Form, Select} from 'antd';
import messages from './messages';
import AssessmentSelect from '../../../../../../../../components/Autosuggest/containers/AssessmentSelect';

const Option = Select.Option;
const FormItem = Form.Item;


const AssessmentElementBuilder = (props) => {
    const {form, loading, intl,  formItemLayout, details={}} = props;
    const {getFieldDecorator} = form;
    const {id=''} = details;
    return (
        <React.Fragment>
            <FormItem
                {...formItemLayout}
                label={intl.formatMessage(messages.assessment)}
            >
                {getFieldDecorator('assessmentId', {
                        initialValue:id,
                        rules: [{required: true, message: "Select Assessment"}],
                    }
                )(
                    <AssessmentSelect />
                )}
            </FormItem>
        </React.Fragment>
    );
};


export default AssessmentElementBuilder;
