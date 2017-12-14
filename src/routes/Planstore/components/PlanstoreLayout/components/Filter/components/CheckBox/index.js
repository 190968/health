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
            console.log(key,"-----key");
            return (
                <Checkbox>{key}</Checkbox>
            )
        }


    }
}

export default CheckComponent