/**
 * Created by Pavel on 13.12.2017.
 */
import React from 'react';
import {Slider} from 'antd';


export class CheckComponent extends React.Component {

    constructor(props){
        super(props);
        console.log(props,"PROPS--check")
    }

    render() {
        const marks = {
            0: '0',
            99: {
                label: "99",
            },
        };

        const{loading,key} = this.props;
        if(!loading){
            console.log(key,"Slider");
            return (
                <Slider marks={marks}/>
            )
        }


    }
}

export default CheckComponent