import React from 'react';
import { Cascader,Row, Col, Select, Form, Radio} from 'antd';
import {
    injectIntl,
} from 'react-intl';
import moment from 'moment';
//import messages from './messages';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;

const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};

const options = [];
const days = [];
let targetChildren = [];
for (let i = 1; i <= 7; i++) {
    //days.push(<Option key={i}>Day {i}</Option>);
    targetChildren.push({
        label: 'Day '+i,
        value: i
    });
}
for (let i = 1; i <= 53; i++) {
    options.push({
        value: i,
        label: 'Week '+i,
        isLeaf: false,
        children: targetChildren
    });
}
for (let i = 1; i <= 7; i++) {
    days.push(<Option key={i}>Day {i}</Option>);
}
class RelativeDay extends React.Component{
    state = {
        options,
    };
    loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        // load options lazily
        setTimeout(() => {
            targetOption.loading = false;

            let targetChildren = [];
            for (let i = 1; i <= 7; i++) {
                //days.push(<Option key={i}>Day {i}</Option>);
                targetChildren.push({
                    label: 'Day '+i,
                    value: i
                });
            }

            targetOption.children = targetChildren;
            this.setState({
                options: [...this.state.options],
            });
        }, 100);
    }

    onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    }

    componentWillReceiveProps(nextProps) {
        const { intl, form, formItemLayout } = nextProps;
        const { getFieldDecorator, getFieldValue } = form;
        const relativeEndDay = getFieldValue('schedule[relativeEndDay]');
        console.log(relativeEndDay);

    }

    render(){

        const { intl, form, formItemLayout } = this.props;
        const { getFieldDecorator, getFieldValue } = form;
        const relativeEndDay = getFieldValue('schedule[relativeEndDay]');


        return(
            <FormItem
                label="ActionPlan Ends on"
            >
                {getFieldDecorator('schedule[relativeEndDay]', {
                    rules: [{
                        required: true, message: 'Please Select',
                    }],
                })(
                    <Cascader
                        options={this.state.options}
                        /*loadData={this.loadData}*/
                        changeOnSelect
                        onChange={this.onChange}
                    />
                )}
            </FormItem>

        );
    }

}

export default injectIntl(RelativeDay);
