import React from 'react'
import PropTypes from 'prop-types'

import VMasker from "vanilla-masker";
import { InputNumber } from 'antd';

export default class Tracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //   tab:''
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {
        onChange: PropTypes.function,
        item: PropTypes.object,
        value: PropTypes.number
    };
    static defaultProps = {
        value: ''
    };

    onChange(value) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(value);
        }
    }

    render() {
        const {item, value} = this.props;
        //console.log(this.props);
        const {units, inputMask} = item;
        const unitsName = units.name;

        return (<InputNumber
            value={value}
            //formatter={value => value.replace(/\B(?=(\d{3})+(?!\d))/g, '/')}
            formatter={value => {
                //console.log();
                //console.log(value);
                if (inputMask != '') {
                    //console.log(inputMask);
                    //console.log(value);
                    return VMasker.toPattern(value, inputMask)
                } else {

                    return VMasker.toNumber(value);
                }

            }}
            //parser={value => VMasker.toPattern(value, inputMask)}
            //parser={value => value.replace(/\$\s?|(,*)/g, '')}
            placeholder={unitsName}
            onChange={this.onChange}
        />)
    }
}