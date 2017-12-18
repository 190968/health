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


        const value_id = e.target.params.value;
        const code = this.props.code;
      //  console.log(value_id);
        this.props.onSuccess({[code]: [value_id]});

        // this.props.code - this is key in filters. For c
        //this.props.store.dispatch(setFilter({code: value_id}));

        // set filter shuold update filters. {"filters": {this.props.code:[value_id]},"page": 5}

        //надо передать {"filters": {"category":[1]},"page": 5}

    }


    render() {
        const{loading,fields, activeFilter} = this.props;

        //console.log(fields.value);
        // checkmark the proper checkbox by activeFilter


        if(!loading){
            var check = false;
            console.log(activeFilter.filters,"filter");
            if(activeFilter.filters == fields.value ){
                check = !check;
            }
            return (
                    <div>
                          <Checkbox checked={check} params={fields}  onChange={this.handleChange}>{fields.text}</Checkbox>
                    </div>
            )
        }
    }
}

export default CheckComponent;