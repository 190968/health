import React from 'react'
import PropTypes from 'prop-types'

import {Slider} from 'antd';


export default class PlanScale extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //values: {}
        };
        this.onChange = this.onChange.bind(this);
    };
    static propTypes = {
        reportValue: PropTypes.number
    };


    onChange(value) {
        const {item} = this.props;
        var options = item.options;
        const option = options[value];
        this.props.onChange(option.value, 'input');
    }

    render() {
        const {reports, item} = this.props;

        var options = item.options;
        let marks = {};
        let selectedMark = null;

        //console.log(reports);
        {options.map((option, i) => {
            const coid = option.value;
            const name = option.label;

            if (reports == coid) {
                selectedMark = i;
            }

            marks[i] = name;
            /*
            {
                    style: {
                        color: '#f50',
                    },
                    label: <strong>100°C</strong>,
                },
             */
            //const description = option.description;
            //return <Option value={coid}>{name}</Option>;
        })}
        //console.log(marks);
        return <div style={{padding:'0 20px'}}><Slider onAfterChange={this.onChange} marks={marks} max={options.length-1} defaultValue={selectedMark} /></div>;//<Slider marks={marks}    />

    }
}