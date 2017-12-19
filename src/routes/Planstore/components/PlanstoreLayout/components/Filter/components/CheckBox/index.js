import React from 'react';
import {Checkbox} from 'antd';
import { connect } from 'react-redux'
export class CheckComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {checked: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {

        //console.log(this.props);
        const value_id = e.target.params.value;

        const checked = e.target.checked ? 1 : 0;
        const {code} = this.props;
        // sending code(category) and value as key=>value, where value will be the key, and 1 (if checked) and 0 if not checked will be the value.
        // before sending this filters to the server, we need to clean it a bit (only send the ones with 1 as value)
        this.props.onSuccess(code,  {[value_id]:checked});// in brackets to get the value of value_id instead of using "value_id" string as key

    }


    render() {
        const{loading,fields, code, activeFilters} = this.props;
        if(!loading){
            const activeFilter = activeFilters[code] || {};
            const checked = activeFilter[fields.value] || 0;

            return (
                    <div>
                          <Checkbox checked={checked} params={fields}  onChange={this.handleChange}>{fields.text}</Checkbox>
                    </div>
            )
        }
    }
}

export default CheckComponent;