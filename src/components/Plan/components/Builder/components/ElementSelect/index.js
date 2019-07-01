import React from 'react';
import {Cascader} from 'antd';
import { getPlanElementLabelFromElement } from '../../../../utils';

const PlanBuilderElementSelect = props => {
    const {plan, mode,onChange, value} = props;
    // console.log(props);
    const {elements, type} = plan || {};
    let options = [];
    // let defaultValue = [];
    if (type === 'ap') {
        const {lessons, activities} = plan || {};
        let items = mode === 'lesson' ? lessons : activities;
        // work with sections
        options = items.map(s => {
            const {id, title, elements:els} = s;
            // console.log(s);
            const children = els && els.map(q => {
                const {id} = q;
                return {value: id, label: getPlanElementLabelFromElement(q, {showType:true})};
            });
           return {value:id, label:title,  children } 
         })
    } else {
    options = elements.map(s => {
        const {id} = s;
        // console.log(s);
        // const children = getQuestions.map(q => {
        //     const {id, title} = q;
        //     return {value: id, label: title};
        // });
       return {value:id, label: getPlanElementLabelFromElement(s, {showType:true, isBuilderMode:true}) /*label:title, children*/ } 
     })
    }
    return <Cascader options={options} onChange={onChange}  defaultValue={value} style={{width:'100%'}} />

}

export default PlanBuilderElementSelect;