import React from 'react'
import PropTypes from 'prop-types'

import {Checkbox} from 'antd';
const CheckboxGroup = Checkbox.Group;


const vertStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    marginLeft: 0,
};
export default class PlanChecklist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.reports
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {
        //reportValue: PropTypes.array
    };

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        //console.log(this.props);
        if (nextProps.reports !== this.props.reports) {
            this.setState({value:nextProps.reports});
        }
    }

    onChange(value) {
        // checklist values
        this.setState({value:value});
        this.props.onChange(value, 'checklist');
    }

    render() {

        const {item} = this.props;
        const {value} = this.state;
        //const {label} = item;
        //console.log(item);
        let radioStyle = {};
        if (item.isVertical) {
            radioStyle = vertStyle;
        }
        var options = item.options;
        let plainOptions = [];
        options.map((option) => {
            const coid = option.value;
            const name = option.label;

            plainOptions.push(<Checkbox key={coid} value={coid} style={radioStyle} >{name}</Checkbox>);
        });

        console.log(value);


        return <CheckboxGroup value={value} onChange={this.onChange} >{plainOptions}</CheckboxGroup>
    }
}
