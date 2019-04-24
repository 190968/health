import React from 'react';
import { Form, Checkbox} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';
import { compose, withState } from 'recompose';
import { CheckboxAsButton, validateCheckboxAsButton } from '../../../../../../../../../../../../components/FormCustomFields/containers/CheckboxAsButton';

const FormItem = Form.Item;
const CheckboxGroup = Checkbox.Group;

const elementDows = [
    {value:'sun', label:'Sun'},
    {value:'mon', label:'Mon'},
    {value:'tue', label:'Tue'},
    {value:'wed', label:'Wed'},
    {value:'thu', label:'Thu'},
    {value:'fri', label:'Fri'},
    {value:'sat', label:'Sat'},
]

const DowScheduling = props => {


        const { intl, form, formItemLayout, planSchedule, element} = props;
        const { getFieldDecorator } = form;


        const {type, dows:planDows} = planSchedule || {};
        const isDow = type === 'dow';

        const {schedule} = element || {};
        const {dows=[]} = schedule || {};
        // console.log(isDow);
        // console.log(planDows);

        // let dowOptions = [];
        // elementDows.map((option) => {
        //     const value = option.value;
        //     const label = option.label;
        //     // console.log(value);
        //     // console.log(planDows.indexOf(value));

        //     const isDisabled = isDow && planDows.indexOf(value) < 0;// ? false:true;

        //     dowOptions.push(<Checkbox key={value} value={value} disabled={isDisabled} >{label}</Checkbox>);
        //     return option;
        // });



        return(
                <FormItem
                    {...formItemLayout}
                    label={intl.formatMessage(messages.title)}
                >
                    {getFieldDecorator('schedule[dows]', {
                        initialValue: dows,
                        rules: [{
                            validator: validateCheckboxAsButton, required: true, message: 'Please Select',
                        }],
                    })(
                        <CheckboxAsButton options={elementDows}  />
                    )}
                </FormItem>
        );

}

export default injectIntl(DowScheduling);
