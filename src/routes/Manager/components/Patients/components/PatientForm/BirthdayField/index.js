/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import { Input, DatePicker, Select, Form } from 'antd';

const InputGroup = Input.Group;
const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const dateFormat = 'YYYY/MM/DD';
const BirthdayForm = props => {
    const { getFieldDecorator } = props;
    const { label } = props;


    return (

        <FormItem
            {...formItemLayout}
            label={label}

        >
            {getFieldDecorator('birthday', {
                rules: [{
                    type: 'object', message: "intl.messages.user_birthday_novalid",
                }, {
                    required: true, message: "intl.messages.user_birthday_rule",
                }],
            })(
                <DatePicker format={dateFormat} allowClear={false} />
            )}
        </FormItem>

    );
}

export default BirthdayForm;
