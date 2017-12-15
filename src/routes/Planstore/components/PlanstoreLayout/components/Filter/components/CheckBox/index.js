import React from 'react';
import {Checkbox} from 'antd';


export class CheckComponent extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        const{loading,fields} = this.props;
        if(!loading){
            return (<div>
                <Checkbox onChange={this.handleChange}>{fields.text}</Checkbox>
                </div>
            )
        }
    }
}

export default CheckComponent