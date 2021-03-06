/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';
import moment from 'moment';

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
                <DatePicker format={dateFormat} allowClear={false} />
    );
}

export default BirthdayForm;
