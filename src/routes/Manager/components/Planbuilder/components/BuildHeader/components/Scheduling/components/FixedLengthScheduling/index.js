import React from 'react';
import { Card, Select, Form, Radio} from 'antd';
import {
    injectIntl,
} from 'react-intl';
import moment from 'moment';
import messages from './messages';
import RelativeDay from '../RelativeDay';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

class FixedLengthScheduling extends React.Component{

    render(){

        const { intl, form, formItemLayout } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const scheduleAnyTime = getFieldValue('schedule[limitDow]');

        return(
            <Card type="inner" title={intl.formatMessage(messages.componentTitle)}>

                <FormItem
                    {...formItemLayout}
                >
                    {getFieldDecorator('schedule[limitDow]', {
                        rules: [{
                            required: true, message: 'Please Select',
                        }],
                    })(
                        <RadioGroup>
                            <Radio style={radioStyle} value={false}>Any day</Radio>
                            <Radio style={radioStyle} value={true}>On a specific day of the week</Radio>
                        </RadioGroup>
                    )}
                </FormItem>

                {scheduleAnyTime === true &&
                <FormItem
                    label="Select date"
                >
                    {getFieldDecorator('schedule[limitStartDow]', {
                        rules: [{
                            required: true, message: 'Please Select',
                        }],
                    })(
                        <Select  style={{ width: 120 }} >
                            <Option value="jack">Sun</Option>
                            <Option value="lucy">Mon</Option>
                            <Option value="disabled" disabled>Disabled</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    )}
                </FormItem>}


                <RelativeDay {...this.props} />




            </Card>
        );
    }

}

export default injectIntl(FixedLengthScheduling);
