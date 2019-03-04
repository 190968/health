import React from 'react';
import {BrahmsRuleActionGoTo} from './goto.js';
import {BrahmsRuleActionOutput} from './output.js';
import {BrahmsRuleActionAp} from './ap.js';

const BrahmsRuleActions = props => {
    const {type, rule, onChange, ...otherProps} = props

    const defaultProps = {rule, onChange, ...otherProps};
    switch(type) {
        case 'goto':
            return <BrahmsRuleActionGoTo {...defaultProps} />
        case 'stop':
            return null
            break;
        case 'output':
            return <BrahmsRuleActionOutput {...defaultProps}  />
        // case 'notification':

        //     break;
        // case 'cohort':

        //     break;
        case 'ap':
            return <BrahmsRuleActionAp {...defaultProps}  />
        default: return null;
    }
}

export default BrahmsRuleActions;