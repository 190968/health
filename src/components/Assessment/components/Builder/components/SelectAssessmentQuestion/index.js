import React from 'react';
import { Cascader } from 'antd';

const SelectAssessmentQuestion = props => {
    console.log(props);
    const {assessment, onChange, value} = props;
      /*

      {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [{
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [{
            value: 'xihu',
            label: 'West Lake',
          }],
        }],
      }
      */
     const {getSections=[]} = assessment || {};

     const options = getSections.map(s => {
        const {id, title, getQuestions=[]} = s;
        const children = getQuestions.map(q => {
            const {id, title} = q;
            return {value: id, label: title};
        });
       return {value:id, label:title, children } 
     })

    return <Cascader options={options} onChange={onChange} defaultValue={value} style={{width:'100%'}} />
}

export default SelectAssessmentQuestion;