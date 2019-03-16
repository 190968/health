import React from 'react';
import {Icon, Popconfirm} from 'antd';
import { compose,withStateHandlers, withHandlers } from 'recompose';
import CohortSelect from '../../../../../../../Autosuggest/containers/CohortSelect';

export const BrahmsRuleActionCohortsPure = props => {
    const {cohorts, appendCohort} = props;
    return <>
    <CohortSelect onChange={appendCohort} mode={'multiple'} getFullInfo excludeCohorts={cohorts} value={cohorts} />
    </>
}


const BrahmsRuleDeleteButtonPure = props => {
    return <Popconfirm title={"Delete?"} onConfirm={props.onDelete} okText="Yes" cancelText="No">
    <Icon type="close-circle" theme="outlined" />
</Popconfirm>
}

//  const ItemDeleteButton = withHandlers({
//     onDelete: props => () => {
//         const {onDelete, cohort, ruleIndex} = props;
//         if (onDelete) {
//             onDelete(cohort);
//         }
//     }
// })(BrahmsRuleDeleteButtonPure);

const enhance = compose(
    withStateHandlers( props => {
        const {value} = props;
        const {cohorts} = value || {};
        return {cohorts};
    }, {
        appendCohort: (state, props) => (answer) => {
            let {cohorts=[]} = state;
            // console.log(cohorts, 'cohorts');
            // console.log(answer);
            // cohorts = [...cohorts, ...answer];
            props.onChange({cohorts:answer});
            return {
                cohorts
            }
        },
        // deleteCohort: (state, props) => (cohort) => {
        //     let {cohorts=[]} = state;
        //     const {id} = cohort;
        //     cohorts = cohorts.filter(p => p.id !== id);
        //     props.onChange({cohorts});
        //     return {
        //         cohorts
        //     }
        // },
    })
);
export const BrahmsRuleActionCohorts = enhance(BrahmsRuleActionCohortsPure);


export const prepareBrahmsCohortsActionInput = ({cohorts=[]}) => {
    return {
        cohortIds: cohorts.map(p=>p.id)
    };
}
