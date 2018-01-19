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
export default class PlanChecklist extends React.PureComponent {
    constructor(props) {
        super(props);
        /*this.state = {
            //   tab:''
        };*/
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {
        reportValue: PropTypes.array
    };

    onChange(value) {
        // checklist values
        this.props.onChange(value, 'checklist');
    }

    render() {

        const {reports, item} = this.props;
        //const {label} = item;
        let radioStyle = {};
        //if (item.is_vertically === '1') {
            radioStyle = vertStyle;
        //}
        var options = item.options;
        let plainOptions = [];
        options.map((option) => {
            const coid = option.value;
            const name = option.label;

            plainOptions.push(<Checkbox key={coid} value={coid} style={radioStyle} >{name}</Checkbox>);
        });

        //console.log(reports);


        return <CheckboxGroup  defaultValue={reports} onChange={this.onChange} >{plainOptions}</CheckboxGroup>
    }
}