import React from 'react';
import {Alert} from 'antd';
import { BrahmsElementOutput } from '../../../../../../../../../../components/Brahms/components/View/components/Output';
import { validateBrahms } from '../../../../../../../../../../components/Brahms/utils';

export const AssessmentBodyScore = props => {
    const {assessment, report} = props;
    const {points, maxPoints} = report || {};
    const {getBrahmsRules=[]} = assessment || {};

    const brahms = validateBrahms({rules:getBrahmsRules, value:points});
    // console.log(brahms, 'brahmsbrahmsbrahmsbrahms');

    const message = 'You scored '+points+' out of '+maxPoints+' points';
    return <>
        {points > 0 && <Alert message={message} type="info" showIcon style={{marginBottom:5}} />}
        {(brahms && brahms.length > 0) && <div style={{marginTop:10}}><BrahmsElementOutput rules={brahms} isToggled showToggler={false} /></div> }
    </>;
}