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

        console.log(this.props);
        const value_id = e.target.params.value;

        const checked = e.target.checked ? 1 : 0;
        const {code, activeFilters} = this.props;
        //const activeFilter = activeFilters[code] || {};
        //console.log(activeFilter);

        this.props.onSuccess(code,  {[value_id]:checked});
        //this.props.onSuccess({[code]: {[value_id]:checked}});

        //

        // this.props.code - this is key in filters. For c
        //this.props.store.dispatch(setFilter({code: value_id}));

        // set filter shuold update filters. {"filters": {this.props.code:[value_id]},"page": 5}

        //надо передать {"filters": {"category":[1]},"page": 5}

    }


    render() {
        const{loading,fields, code, activeFilters} = this.props;

        //console.log(activeFilter);
        //console.log(fields.value);
        // checkmark the proper checkbox by activeFilter


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