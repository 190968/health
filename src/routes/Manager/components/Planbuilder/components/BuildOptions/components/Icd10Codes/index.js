import React from 'react';
import {Card, Button, Form } from 'antd';
import { DiagnosisSelect } from '../../../../../../../../components/Autosuggest/containers/DiagnosisSelect';
const FormItem = Form.Item;
 
const PlanbuilderOptionsLanguage = props => {
    const {form, plan } = props;
    const { getFieldDecorator } = form;
    const {planDetails} = plan || {};
    const {icd10Codes=[]} = planDetails || {};
    return <Card title={'ICD-10 Codes'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
    <Form onSubmit={props.onSubmit}>
                <FormItem
                    // {...tailFormItemLayout}
                    help={'Related ICD-10 Codes'}
                >
                    {getFieldDecorator('icd10Codes', {
                        initialValue: icd10Codes
                    })(
                        <DiagnosisSelect mode={'multiple'} />
                    )}
                </FormItem>
            </Form>
    </Card>;
}

export default PlanbuilderOptionsLanguage;