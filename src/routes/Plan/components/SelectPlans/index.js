/**
 * Created by Павел on 12.02.2018.
 */
import React, { PropTypes } from 'react';
import {Select } from 'antd';
const {Option} = Select;
class SelectPlans extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const  {info,loading} = this.props;
        if (loading) {
            return  <p>Loading</p>;
        }


        console.log(info);
        let selectItem =[];
        info.forEach(item=>{
            selectItem.push(  <Option key={item.id} value={item.plan.title}>{item.plan.title}</Option>)
        })

        return  (

                        <Select style={{ width: 470 }} onChange={this.props.onChange}>
                            {selectItem}
                        </Select>

        );
    }
}
export default SelectPlans;