import React from 'react'
import PropTypes from 'prop-types'

import {Select} from 'antd';
const Option = Select.Option;

export default class PlanDropdown extends React.PureComponent {
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
        this.props.onChange(value, 'dropdown');
    }

    render() {
        const {reportValue, item} = this.props;

        var options = item.options;
        return <Select
            showSearch
            style={{ width: 200 }}
            placeholder={'Select '+item.label}
            optionFilterProp="name"
            onChange={this.onChange}
            /*
            onFocus={handleFocus}
            onBlur={handleBlur}*/
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
        >
            {options.map((option, i) => {
                const coid = option.coid;
                const name = option.name;
                //const description = option.description;
                return <Option key={i} value={coid}>{name}</Option>;
            })}
        </Select>
    }
}