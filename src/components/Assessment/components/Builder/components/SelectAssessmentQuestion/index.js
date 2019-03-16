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

     let options = getSections.map(s => {
        const {id, title, getQuestions=[]} = s;
        let children = getQuestions.map(q => {
            const {id, title} = q;
            return {value: id, label: title};
        });
        children.unshift({value:null, label: 'Select Question', disabled:true});
       return {value:id, label:title, children } 
     });
     // add first item as disabled
    //  disabled: true,
     options.unshift({value:null, label: 'Select Section', disabled:true});

    return <Cascader options={options} onChange={onChange} defaultValue={value} style={{width:'100%'}} />
}

export default SelectAssessmentQuestion;