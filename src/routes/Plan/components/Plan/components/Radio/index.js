import React from 'react'
import PropTypes from 'prop-types'

import {Radio} from 'antd';
const RadioGroup = Radio.Group;


const vertStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
};
export default class PlanRadio extends React.PureComponent {
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
        this.props.onChange(value, 'radio');
    }

    render() {
        const {reportValue, item} = this.props;

        const options = item.options;

        let radioStyle = {};
        if (item.isVertically) {
            radioStyle = vertStyle;
        }


        return <RadioGroup onChange={this.onChange} /*value={this.state.value}*/>
            {options.map((option, i) => {
                const coid = option.value;
                const name = option.label;
                //const description = option.description;
                return <Radio key={i} style={radioStyle} value={coid}>{name}</Radio>;
            })}
        </RadioGroup>
    }
}