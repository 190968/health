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

    triggerChange(value) {
        this.props.onChange(value, 'input');
    }

    onChange(e) {
        const { value } = e.target;

        clearTimeout(this.timer);

        this.timer = setTimeout(function () {this.triggerChange(value)}.bind(this), 500);
    }

    render() {
        const {reports, item} = this.props;
        //console.log(item);
        const {isLong, isDate, isTime} = item;
        if (isDate) {
            return  <DatePicker onChange={this.onChange} defaultValue={reports} />;
        } else if (isTime) {
            return <TimePicker  onChange={this.onChange} defaultValue={reports} />;
        } else if (!isLong) {
            return <Input onBlur={this.onChange} defaultValue={reports} />;
        } else {
            return <TextArea autosize={{ minRows: 2, maxRows: 6 }} defaultValue={reports} onChange={this.onChange} />
        }
    }
}