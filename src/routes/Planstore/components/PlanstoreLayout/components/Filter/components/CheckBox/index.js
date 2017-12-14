import React from 'react';
import {Checkbox} from 'antd';


export class CheckComponent extends React.Component {

    constructor(props){
        super(props);
        //console.log(props,"PROPS--check")
    }

    render() {


        const{loading,key} = this.props;
        if(!loading){
            return (
                <div><Checkbox>{key}</Checkbox></div>
            )
        }


    }
}

export default CheckComponent