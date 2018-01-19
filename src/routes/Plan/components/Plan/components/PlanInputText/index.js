import React from 'react'
import PropTypes from 'prop-types'

import {Input, DatePicker, TimePicker} from 'antd';
const { TextArea } = Input;


export default class PlanInputText extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //   tab:''
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {
        reportValue: PropTypes.number
    };

    onChange(value) {
        this.props.onChange(value, 'input');
    }

    render() {
        const {reportValue, item} = this.props;

        const {isLong, isDate, isTime} = item;
        if (isDate) {
            return  <DatePicker onChange={this.onChange} />;
        } else if (isTime) {
            return <TimePicker  onChange={this.onChange}  />;
        } else if (!isLong) {
            return <Input onBlur={this.onChange} />;
        } else {
            return <TextArea autosize={{ minRows: 2, maxRows: 6 }} onBlur={this.onChange} />
        }
    }
}