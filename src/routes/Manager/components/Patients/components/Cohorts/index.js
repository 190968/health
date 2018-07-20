/**
 * Created by Pavel on 06.12.2017.
 */
import React from 'react';

import {Checkbox,Form} from 'antd';
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
const CohortsForm = props => {
     const {getFieldDecorator} = props;
      

        return(
          
            <FormItem
            {...formItemLayout}
            label="Cohorts"

        >
            {getFieldDecorator('cohorts', {
        })(
            <Checkbox >Checkbox</Checkbox>,
        )}
        </FormItem>

              );
    }

    export default CohortsForm;
