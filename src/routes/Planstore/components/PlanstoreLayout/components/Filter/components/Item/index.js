/**
 * Created by Pavel on 13.12.2017.
 */
import React from 'react';
import {Checkbox} from 'antd';


export class CheckComponent extends React.Component {

    constructor(props){
        super(props);
        console.log(props,"PROPS--check")
    }

    render() {


        const{loading,filters} = this.props;
        if(!loading){
            console.log(filters,"check");
            return (
                <Checkbox>sevwwefewv</Checkbox>
            )
        }


    }
}

export default CheckComponent