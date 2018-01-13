import React from 'react'
import PropTypes from 'prop-types'

import { Row, Col, Progress, InputNumber } from 'antd';
import VMasker from "vanilla-masker";

export default class Tracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //   tab:''
        };
        //this.onChange = this.onChange.bind(this);
    };
    static propTypes = {

    };

    onChange(value) {
        console.log(value);
    }

    render() {
        const {item} = this.props;
        const units = item.units_custom;

        return (<Row><Col md={12}><InputNumber
            /*defaultValue={report_value}
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

            onChange={this.handleChange}*/
        /> {units}</Col>
            <Col md={12}>
                <div>Spend less than $12</div>
        <Progress percent={30} /></Col></Row>)
    }
}