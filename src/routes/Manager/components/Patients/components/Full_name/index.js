/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import {Input,Col,Select,Form} from 'antd';

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

const FullNameForm = props => {
     const {getFieldDecorator} = props;
      

        return(
          
            <FormItem
                {...formItemLayout}
                label={"Name"}
                required
            >
               
                <InputGroup >
                <Col span={8}>
                {getFieldDecorator('title', {

                })(

                    <Select style={{ width: 120 }} >
                        {/* {user.possibleTitles.map((title, i) => <Option key={title} value={i}>{title}</Option>)} */}
                    </Select>
                )}
                    </Col>
                    <Col span={8}>
                        {getFieldDecorator('firstName', {
                        })(
                        <Input placeholder="First name" />
                        )}
                    </Col>
                    <Col span={8}>
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
