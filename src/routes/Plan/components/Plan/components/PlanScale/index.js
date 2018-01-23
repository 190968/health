import React from 'react'
import PropTypes from 'prop-types'

import {Slider} from 'antd';


export default class PlanScale extends React.PureComponent {
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
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        //console.log(this.props);
        if (nextProps.reports !== this.props.reports) {
            this.setState({value:nextProps.reports});
        }
    }

    onChange(value) {
        const {item} = this.props;
        var options = item.options;
        const option = options[value];
        console.log(option.value);
        this.setState({value:option.value});
        this.props.onChange(option.value, 'scale');
    }

    render() {
        const { item} = this.props;
        const {value} = this.state;
        var options = item.options;
        let marks = {};
        let selectedMark = null;

        console.log(value);
        console.log(options);
        {options.map((option, i) => {
            const coid = option.value;
            const name = option.label;

            if (value === coid) {
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
        console.log(selectedMark);
        return <div style={{padding:'0 20px'}}><Slider onChange={this.onChange} marks={marks} max={options.length-1} value={selectedMark} /></div>;//<Slider marks={marks}    />

    }
}