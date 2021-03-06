import React from 'react';
import {Radio, Form, Divider, Tooltip} from 'antd';
import {injectIntl} from 'react-intl';
import messages from './messages';
import DowScheduling from './components/DowScheduling';
import SpecificDaysScheduling from './components/SpecificDaysScheduling';
import BetweenDaysScheduling from './components/BetweenDaysScheduling';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

const formItemLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19},
};
const formTailLayout = {
    labelCol: {span: 5},
    wrapperCol: {span: 19, offset: 4},
};



const PlanElementSchedule = props => {
 
    const {intl, form, schedule=false, element} = props;
    const {getFieldDecorator, getFieldValue} = form;

    if (!schedule) {
        return null;
    }


    const {schedule:elementSchedule} = element || {};

    const {type=''} = elementSchedule || {};// element schedule

 


    const scheduleType = getFieldValue('schedule[type]') || type;
    let scheduleBox ='';
    switch (scheduleType) {

        case 'dates':
            scheduleBox = <SpecificDaysScheduling {...props} formItemLayout={formItemLayout} formTailLayout={formTailLayout} />
            break;
        case 'dow':
            scheduleBox = <DowScheduling {...props} formItemLayout={formItemLayout} />
            break;
        case 'betweenDates':
            scheduleBox = <BetweenDaysScheduling {...props} formItemLayout={formItemLayout} />
            break;
    }

    return (
        <React.Fragment>
            <Divider>{intl.formatMessage(messages.title)}</Divider>
        <FormItem
            {...formItemLayout}
            style={{textAlign: 'center'}}
            // label={intl.formatMessage(messages.title)}
            required
        >
            {getFieldDecorator('schedule[type]', {
                    initialValue:type,
                    rules: [{required: true, message: "Select Scheduling"}],
                }
            )(
                <RadioGroup >
                    <Tooltip title="Everyday"><RadioButton value="everyday" style={{fontSize: '0.8em'}}>Everyday</RadioButton></Tooltip>
                    <Tooltip title="Appears on specific days of the week"><RadioButton value="dow" style={{fontSize: '0.8em'}}>Days of the week</RadioButton></Tooltip>
                    <Tooltip title="Appears on specific days"><RadioButton value="dates" style={{fontSize: '0.8em'}}>Specific Days</RadioButton></Tooltip>
                    <Tooltip title="Appears between days"><RadioButton value="betweenDates" style={{fontSize: '0.8em'}}>Between Days</RadioButton></Tooltip>
                </RadioGroup>
            )}

        </FormItem>
            {scheduleBox}
        </React.Fragment>
    );
}

// class PlanElementSchedule extends React.Component {

//     handleSubmit = () => {
//         // console.log(this.props);
//         const { updateElement } = this.props;
//         this.props.form.validateFields((err, values) => {

//             console.log(err);
//             console.log(values);
//             if (!err) {
//                 return updateElement(values).then(() => {
//                     message.success(this.props.intl.formatMessage(messages.sent));
//                     this.props.onHide();
//                 });
//             }
//         });
//     }


//     render() {
//         const {intl, form, schedule, planSchedule, element} = this.props;
//         const {getFieldDecorator, getFieldValue} = form;

//         if (!schedule) {
//             return null;
//         }


//         const {schedule:elementSchedule} = element || {};

//         const {type=''} = elementSchedule || {};// element schedule


//         /*const {type,
//             startDate,
//             endDate,
//             limitStartDow,
//             relativeEndDay,
//             dows:planDows} = planSchedule;
//         const isFixed = type === 'fixed';
//         console.log(planSchedule);
//         console.log(this.props);*/


//         const scheduleType = getFieldValue('schedule[type]') || type;
//         // console.log(scheduleType);
//         let scheduleBox ='';
//         switch (scheduleType) {

//             case 'dates':
//                 scheduleBox = <SpecificDaysScheduling {...this.props} formItemLayout={formItemLayout} formTailLayout={formTailLayout} />
//                 break;
//             case 'dow':
//                 scheduleBox = <DowScheduling {...this.props} formItemLayout={formItemLayout} />
//                 break;
//             case 'betweenDates':
//                 scheduleBox = <BetweenDaysScheduling {...this.props} formItemLayout={formItemLayout} />
//                 break;
//         }

//         return (
//             <React.Fragment>
//             <FormItem
//                 {...formItemLayout}
//                 label={intl.formatMessage(messages.title)}
//                 required
//             >
//                 {getFieldDecorator('schedule[type]', {
//                         initialValue:type,
//                         rules: [{required: true, message: "Select Scheduling"}],
//                     }
//                 )(
//                     <RadioGroup >
//                         <Tooltip title="Everyday"><RadioButton value="everyday" style={{fontSize: '0.8em'}}>Everyday</RadioButton></Tooltip>
//                         <Tooltip title="Appears on specific days of the week"><RadioButton value="dow" style={{fontSize: '0.8em'}}>Days of the week</RadioButton></Tooltip>
//                         <Tooltip title="Appears on specific days"><RadioButton value="dates" style={{fontSize: '0.8em'}}>Specific Days</RadioButton></Tooltip>
//                         <Tooltip title="Appears between days"><RadioButton value="betweenDates" style={{fontSize: '0.8em'}}>Between Days</RadioButton></Tooltip>
//                     </RadioGroup>
//                 )}

//             </FormItem>
//                 {scheduleBox}
//             </React.Fragment>
//         );
//     }
// }

export default injectIntl(PlanElementSchedule);

