import React from 'react'
import PropTypes from 'prop-types'
import './index.less';
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

        if (nextProps.reports !== this.props.reports) {
            this.setState({value:nextProps.reports});
        }
    }

    onChange(value) {
        const {item} = this.props;
        var options = item.options;
        const option = options[value];
        this.setState({value:option.id});
        // console.log(option);
        this.props.onChange(option.id, 'scale');
    }

    render() {
        const { item} = this.props;
        const {value} = this.state;
        var options = item.options;
        let marks = {};
        let selectedMark = undefined;
        options.map((option, i) => {
            const coid = option.id;
            const name = option.label;

            if (value === coid) {
                selectedMark = i;
            }

            marks[i] = {label:name};
            return option;
        })
        // console.log(value);
        // console.log(selectedMark);

        // let value = reports.map(report => report.answerId);
        // value = value[0] || null;
        
        // answers.map((option, i) => {
        //     const coid = option.id;
        //     const name = option.label;
    
        //     if (value === coid) {
        //         selectedMark = i;
        //     }
    
        //     marks[i] = {label:name};
        //     return option;
        // });
         
    
        // return <div style={{padding:'0 20px'}}><Slider disabled={disabled} onChange={onChange} marks={marks} max={answers.length-1} defaultValue={selectedMark} />

        return <div className={'plan-slider'} ><Slider onChange={this.onChange} marks={marks} max={options.length-1} value={selectedMark} /></div>;//<Slider marks={marks}    />

    }
}