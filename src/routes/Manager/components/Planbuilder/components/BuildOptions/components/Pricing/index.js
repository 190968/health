import React from 'react';
import { Card, Button, Form, Checkbox, InputNumber, Radio, Divider } from 'antd';
import { DateField, withStartEndDateValidators } from '../../../../../../../../components/FormCustomFields';
import { prepareDateForForm } from '../../../../../../../../utils/datetime';
const FormItem = Form.Item;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 14,
            offset: 3,
        },
    },
};


const PlanbuilderOptionsPricing = props => {
    const { form, checkStartDate, checkEndDate, plan } = props;
    const { getFieldDecorator, getFieldValue } = form;

    const { planDetails } = plan || {};
    const { isPaid, price, pricePromo, promoStartDate, promoEndDate } = planDetails || {};

    return <Card title={'Pricing'} actions={[<Button type={'primary'} onClick={props.onSubmit}>Save</Button>]}>
    <Form onSubmit={props.onSubmit}>
            <FormItem
                {...tailFormItemLayout}
                help={'Choose whether you would like your ActionPlan to be free or paid'}
            >
                {getFieldDecorator('isPaid', {
                    initialValue: isPaid ? '1' : '0',
                    rules: [{ required: true, message: "Input title Please" }],
                })(
                    <RadioGroup>
                        <RadioButton value="0">Free</RadioButton>
                        <RadioButton value="1">Paid</RadioButton>
                    </RadioGroup>
                )}
            </FormItem>

            {getFieldValue('isPaid') === '1' && <>
                <FormItem
                    {...formItemLayout}
                    label={'Cost'}
                    className={'no-margin'}
                >
                    {getFieldDecorator('price', {
                        initialValue: price,
                        rules: [{ required: true, message: "Enter Price" }],
                    })(
                        <InputNumber
                            formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                    )}
                </FormItem>
                <Divider>Promotion</Divider>
                <FormItem
                    {...tailFormItemLayout}
                >
                    {getFieldDecorator('hasPromoPrice', {
                        initialValue: pricePromo > 0,
                        valuePropName: 'checked'
                    })(
                        <Checkbox>Add Promotion Price</Checkbox>
                    )}
                </FormItem>

                {getFieldValue('hasPromoPrice') && <>

                    <FormItem
                        {...formItemLayout}
                        label={'Promo Cost'}
                    >
                        {getFieldDecorator('pricePromo', {
                            initialValue: pricePromo,
                            rules: [{ required: true, message: "Enter Price", whitespace: true }],
                        })(
                            <InputNumber
                                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="Start Date"
                    >
                        {getFieldDecorator('promoStartDate', {
                            initialValue: prepareDateForForm(promoStartDate),
                            rules: [{
                                required: true, message: 'Please Select Start Date',
                            }],
                        })(
                            <DateField disabledDate={checkStartDate} allowClear={false} />
                        )}
                    </FormItem>

                    <FormItem
                        {...formItemLayout}
                        label="End Date"
                    >
                        {getFieldDecorator('promoEndDate', {
                            initialValue: prepareDateForForm(promoEndDate, true),
                            rules: [{
                                validator: props.validateEndDate,
                                message: 'End date must be after Start Date',
                            }],
                        })(
                            <DateField disabledDate={checkEndDate} style={{ marginLeft: 10 }} />
                        )}
                    </FormItem>

                </>}
            </>}
        </Form>
    </Card>;
}

export default withStartEndDateValidators(PlanbuilderOptionsPricing);