/**
 * Created by Pavel on 13.12.2017.
 */
import React from 'react';
import {Slider} from 'antd';


export class CheckComponent extends React.Component {

    constructor(props){
        super(props);
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
            return (<div>
                <Slider marks={marks}/>
                </div>
            )
        }


    }
}

export default CheckComponent