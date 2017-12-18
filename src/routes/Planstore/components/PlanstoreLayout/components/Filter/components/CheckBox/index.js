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
        console.log(e.target.params.value,"state --- checked");

        const value_id = e.target.params.value;
        const code = this.props.code;
        //console.log(code);
        this.props.onSuccess({code: value_id});
        // this.props.code - this is key in filters. For c
        //this.props.store.dispatch(setFilter({code: value_id}));

        // set filter shuold update filters. {"filters": {this.props.code:[value_id]},"page": 5}

        //надо передать {"filters": {"category":[1]},"page": 5}

    }


    render() {
        const{loading,fields} = this.props;
        //console.log(fields);
        if(!loading){
            return (
                    <div>
                          <Checkbox params={fields} onChange={this.handleChange}>{fields.text}</Checkbox>
                    </div>
            )
        }
    }
}

export default CheckComponent;