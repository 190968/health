import React from 'react'
import PropTypes from 'prop-types'

import {Select} from 'antd';
const Option = Select.Option;

export default class PlanDropdown extends React.PureComponent {
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
        this.setState({value:value});
        this.props.onChange(value, 'dropdown');
    }

    render() {
        const {item} = this.props;
        const {value} = this.state;
        //console.log(reports);
        const options = item.options;
        return <Select
            showSearch
            style={{ width: 200 }}
            placeholder={'Select '+item.label}
            optionFilterProp="name"
            value={value}
            onChange={this.onChange}
            /*
            onFocus={handleFocus}
            onBlur={handleBlur}*/
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            {options.map((option, i) => {
                const coid = option.value;
                const name = option.label;
                //const description = option.description;
                return <Option key={i} value={coid}>{name}</Option>;
            })}
        </Select>
    }
}