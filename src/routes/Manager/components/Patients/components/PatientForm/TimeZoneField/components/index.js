/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import { Select, Form } from 'antd';
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
const TimeZoneForm = ({form,label},props) => {
    const { getFieldDecorator } = form;
const timezones = props.timezone;
    return (

        <FormItem
            {...formItemLayout}
            label={label}

        > {getFieldDecorator('timezone', {
        })(
            <Select >
                {/* {timezones.map(timezone => <Option key={timezone.id} value={timezone.id}>{timezone.name}</Option>)} */}
            </Select>
        )}
        </FormItem>

    );
}

export default TimeZoneForm;
