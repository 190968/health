import React from 'react';
import {Cascader} from 'antd';
import { getPlanElementLabelFromElement } from '../../../../utils';

const PlanBuilderElementSelect = props => {
    const {plan, onChange} = props;
    const {elements} = plan || {};
    const options = elements.map(s => {
        const {id} = s;
        // console.log(s);
        // const children = getQuestions.map(q => {
        //     const {id, title} = q;
        //     return {value: id, label: title};
        // });
       return {value:id, label:getPlanElementLabelFromElement(s, {showType:true}) /*label:title, children*/ } 
     })

    return <Cascader options={options} onChange={onChange} /* defaultValue={value}*/ style={{width:'100%'}} />

}

export default PlanBuilderElementSelect;