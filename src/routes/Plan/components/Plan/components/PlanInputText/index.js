import React from 'react'
import PropTypes from 'prop-types'

import {Input, DatePicker, TimePicker} from 'antd';
const { TextArea } = Input;


export default class PlanInputText extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.reports
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {
        reportValue: PropTypes.number
    };

    triggerChange(value) {
        this.setState({value:value});
        this.props.onChange(value, 'input');
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        //console.log(this.props);
        if (nextProps.reports !== this.props.reports) {
            this.setState({value:nextProps.reports});
        }
    }

    onChange(e) {
        const { value } = e.target;

        clearTimeout(this.timer);

        this.timer = setTimeout(function () {this.triggerChange(value)}.bind(this), 500);
    }

    render() {
        const {item} = this.props;
        const {value} = this.state;
        //console.log(item);
        const {isLong, isDate, isTime} = item;
        if (isDate) {
            return  <DatePicker onChange={this.onChange} value={value} />;
        } else if (isTime) {
            return <TimePicker  onChange={this.onChange} value={value} />;
        } else if (!isLong) {
            return <Input onBlur={this.onChange} value={value} />;
        } else {
            return <TextArea autosize={{ minRows: 2, maxRows: 6 }} value={value} onChange={this.onChange} />
        }
    }
}