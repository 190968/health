/**
 * Created by Pavel on 13.12.2017.
 */
import React from 'react';
import {Slider} from 'antd';
import { connect } from 'react-redux'

export class CheckComponent extends React.Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        //console.log(e,"slider");
         const value1 = e[0];
        const value2 = e[1];
         const {code} = this.props;
        this.props.onSuccess(code, [value1,value2]);
    }

    render() {
        const marks = {
            0: '0',
            99: {
                label: "99",
            },
        };

        const{loading,fields, code, activeFilters} = this.props;
        if(!loading){
            //console.log(activeFilters[code]);

            const activeFilter = activeFilters[code] || {};
            const min = activeFilter[fields.range.min];
            const max = activeFilter[fields.range.max];
            console.log(min,max);
            return (<div>
                <Slider range marks={marks}  onAfterChange = {this.handleChange}/>
                </div>
            )
        }


    }
}

export default CheckComponent