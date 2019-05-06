import React from 'react';
import {Card, Button, Form, Select } from 'antd';
import CategorySelect from '../../../../../../../../components/Autosuggest/containers/CategorySelect';
import {compose, withHandlers} from 'recompose';
import { CustomOptionsList } from '../../../../../../../../components/FormCustomFields/containers/CustomOptionsList';
const FormItem = Form.Item;
const formItemLayout = {
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};

const enhance = compose(
    withHandlers({
        onChange: props => (value, selectedOptions) => {
            // console.log(value, 'value');
            // console.log(selectedOptions, 'selectedOptions');
            if (props.onChange) {
                // const categoryId = value[value.length-1];
                props.onChange(value);
            }
        }
    })
);
const CategorySelectEnhanced = enhance(CategorySelect);

const PlanbuilderOptionsCategory = props => {
    const {form, plan } = props;
    const { getFieldDecorator } = form;
    const {categories=[]} = plan || {};

    return <Card title={'Categories'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
    <Form onSubmit={props.onSubmit}>
                <FormItem
                    {...formItemLayout}
                    help={'Help people find your ActionPlan by adding categories to your plan.'}
                >
                    {getFieldDecorator('categories', {
                        initialValue: categories,
                        rules: [{ required: true, message:"Input title Please" , whitespace: true }],
                    })(
                        <CustomOptionsList CustomComponent={CategorySelectEnhanced} blankItem={[]} />
                    )}
                </FormItem>
            </Form>
    </Card>;
}

export default PlanbuilderOptionsCategory;