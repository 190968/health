/**
 * Created by Pavel on 13.12.2017.
 */
import React from 'react';
import {Checkbox} from 'antd';


export class CheckComponent extends React.Component {

    constructor(props){
        super(props);
    }

    render() {


        const{loading,filters} = this.props;
        if(!loading){
            return (
                <Checkbox>sevwwefewv</Checkbox>
            )
        }


    }
}

export default CheckComponent