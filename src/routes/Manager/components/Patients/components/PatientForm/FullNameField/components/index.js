/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import { Input, Col, Select, Form } from 'antd';
import DropdownField from '../../DropdownField/containers/index'
const Option = Select.Option;
const InputGroup = Input.Group;
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

const FullNameForm = ({ form, label, user, props} ) => {
    const { getFieldDecorator } = form;

    console.log(user, props);
    return (

        <FormItem
            {...formItemLayout}
            label={label}
            required
        >

            <InputGroup >
                <Col span={6}>
                   <DropdownField options={props.getChildren[0].options}/>
                </Col>
                <Col offset={1} span={8}>
                    {getFieldDecorator('firstName', {
                    })(
                        <Input placeholder="First name" />
                    )}
                </Col>
                <Col offset={1}  span={8}>
                    {getFieldDecorator('lastName', {
                    })(
                        <Input placeholder="Last name" />
                    )}
                </Col>
            </InputGroup>
        </FormItem>

    );
}

export default FullNameForm;
