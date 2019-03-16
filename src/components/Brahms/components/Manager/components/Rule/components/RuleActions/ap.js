import React from 'react';
import {List, Icon, Popconfirm} from 'antd';
import ActionPlanSelect from '../../../../../../../Autosuggest/containers/PlanSelect';
import { compose,withStateHandlers, withHandlers } from 'recompose';
import { ListWithMessage } from '../../../../../../../UI/List';

export const BrahmsRuleActionApPure = props => {
    const {plans=[], appendPlan} = props;

    const plan = plans.length > 0 ? plans[0] : null;
    return <>
    <ActionPlanSelect onChange={appendPlan} getFullInfo excludePlans={plans} value={plan} />
    {/* <ListWithMessage
        emptyMessage={false}
        size="small"
        // footer={<ActionPlanSelect onChange={appendRule} />}
        dataSource={plans}
        renderItem={plan => {
            const actions = [<PlanpDeleteButton plan={plan} onDelete={props.deletePlan} />];
            
            return <List.Item key={plan.id}  actions={actions} >{plan.title}</List.Item>;
        }}
    /> */}
    
    </>
}


const BrahmsRuleDeleteButtonPure = props => {
    return <Popconfirm title={"Delete?"} onConfirm={props.onDelete} okText="Yes" cancelText="No">
    <Icon type="close-circle" theme="outlined" />
</Popconfirm>
}

 const PlanpDeleteButton = withHandlers({
    onDelete: props => () => {
        const {onDelete, plan, ruleIndex} = props;
        if (onDelete) {
            onDelete(plan);
        }
    }
})(BrahmsRuleDeleteButtonPure);

const enhance = compose(
    withStateHandlers( props => {
        const {value} = props;
        const {plans} = value || {};
        return {plans};
    }, {
        appendPlan: (state, props) => (answer) => {
            let {plans=[]} = state;
            // plans = [...plans, answer];
            plans = [answer];
            // console.log(plans);
            //const input = prepareBrahmsApActionInput(plans);
            props.onChange({plans});
            return {
                plans
            }
        },
        deletePlan: (state, props) => (plan) => {
            let {plans=[]} = state;
            const {id} = plan;
            plans = plans.filter(p => p.id !== id);
            props.onChange({plans});
            return {
                plans
            }
        },
    })
);
export const BrahmsRuleActionAp = enhance(BrahmsRuleActionApPure);


export const prepareBrahmsApActionInput = plans => {
    return {
        plans: plans.map(p=>p.id)
    };
}
