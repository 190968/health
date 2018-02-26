import React from 'react';

import {Checkbox} from 'antd';
const CheckboxGroup = Checkbox.Group;

export default  class CheckBoxGroup extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {checked: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {


        //onsole.log(value);

        //const checked = e.target.checked ? 1 : 0;
        const {code} = this.props;
        // sending code(category) and value as key=>value, where value will be the key, and 1 (if checked) and 0 if not checked will be the value.
        // before sending this filters to the server, we need to clean it a bit (only send the ones with 1 as value)
        this.props.onSuccess(code, value);// in brackets to get the value of value_id instead of using "value_id" string as key

    }


    render() {
        const{item, code, activeFilters} = this.props;

        const activeFilter = activeFilters[code] || {};
        //const checked = activeFilter[fields.value] || 0;
       
        /*let options = []
         item.items.map((item) => (
             options.push({
            label: item.label,
            value: item.value,
        })));
      */

        return (
                <div>
                    <CheckboxGroup options={item.items}  onChange={this.handleChange} />
                </div>
        )
    }
}