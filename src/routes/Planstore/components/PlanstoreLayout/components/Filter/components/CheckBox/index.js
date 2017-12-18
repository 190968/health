import React from 'react';
import {Checkbox} from 'antd';
import { connect } from 'react-redux'
import setFilter from '../../../../../../modules'
export class CheckComponent extends React.Component {

    constructor(props){
        super(props);
        this.state = {checked: false};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        console.log(e.target.params.value,"state --- checked");
        setFilter({"type":"checked"});//надо передать {"filters": {"category":[1]},"page": 5}
        //this.props.fields(+e.target.innerText)
       // this.setState({ checked:!this.state.checked  });

    }


    render() {
        const{loading,fields} = this.props;
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