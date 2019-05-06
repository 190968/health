import React from 'react';
import { Card, Button, Form, Select } from 'antd';
import { LanguageSelect } from '../../../../../../../../components/Autosuggest/containers/LanguageSelect';
const FormItem = Form.Item;

const PlanbuilderOptionsLanguage = props => {
    const { form, plan } = props;
    const { getFieldDecorator } = form;
    const { planDetails } = plan || {};
    const { languageId } = planDetails || {};
    return <Card title={'Language'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
    <Form onSubmit={props.onSubmit}>
            <FormItem
                // {...tailFormItemLayout}
                help={'What is the default language for this plan?'}
            >
                {getFieldDecorator('languageId', {
                    initialValue: languageId
                    // rules: [{ required: true, message:"Input title Please" , whitespace: true }],
                })(
                    <LanguageSelect />
                )}
            </FormItem>
        </Form>
    </Card>;
}

export default PlanbuilderOptionsLanguage;