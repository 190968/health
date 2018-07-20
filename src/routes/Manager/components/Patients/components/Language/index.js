/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import {Select,Form} from 'antd';
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
const LanguageForm = props => {
     const {getFieldDecorator} = props;
      

     
        return(
            <FormItem
                {...formItemLayout}
                label="Primary Language"

            > {getFieldDecorator('language', {

            })(
                <Select  >
                    {/* {languages.map(language => <Option key={language.value} value={language.value}>{language.label}</Option>)} */}
                </Select>
            )}
            </FormItem>

              );
    }

    export default LanguageForm;
