import Rule from '../components/Rule';
import { compose, withHandlers, withProps } from 'recompose';
import {Form} from 'antd';
import { withDrawer } from '../../../../Modal';
import { injectIntl } from 'react-intl';
import DefaultI18nEn from '../../../../../i18n/en';
import { prepareBrahmsApActionInput } from '../components/Rule/components/RuleActions/ap';
import { prepareBrahmsOutputActionInput } from '../components/Rule/components/RuleActions/output';
import { prepareBrahmsNotificationActionInput } from '../components/Rule/components/RuleActions/notification';
import { prepareBrahmsCohortsActionInput } from '../components/Rule/components/RuleActions/cohorts';


const enhance = compose(
    Form.create(),
    injectIntl,
    withHandlers({
        onSubmit: props => () => {
            const { form } = props;

            form.validateFields((err, values) => {
                if (!err) {
                    //const input = prepareBrahmsRuleInput(values);
                    console.log(values);
                    props.onChange(values);
                    props.onHide();
                }
            });
        }
    }),
    withProps(props => {

        const { intl, answer } = props;
        const { id } = answer || {};
        const title = intl.formatMessage(DefaultI18nEn.createUpdateSomething, { isUpdate: (id && id !== ''), title: 'Rule' })
        return {
            modalTitle: title,
        }
    }),
    withDrawer
);
export const BrahmsRuleManager = enhance(Rule);

export const prepareBrahmsRuleInput = rule => {
    // console.log(rule, 'rulerulerule');
    const {id,ruleType, ruleValue, ruleValueEnd, ruleValueId, ruleActionType, ruleAction} = rule;
    const value = ruleValue ? parseFloat(ruleValue) : null;
    const valueEnd = ruleValueEnd ? parseFloat(ruleValueEnd) : null;
    let action = {};
    //console.log(ruleActionType);
    if (ruleActionType === "ap") {
        //console.log(ruleAction, rule);
        // const {apActionInput} = ruleAction || {};
        const {plans=[]} = ruleAction || {};
        //action = ruleAction;//prepareBrahmsApActionInput(plans);
        action.apActionInput = prepareBrahmsApActionInput(plans);
    } else if (ruleActionType === "output") {
        //console.log(ruleAction, rule);
        // const {apActionInput} = ruleAction || {};
        //action = ruleAction;//prepareBrahmsApActionInput(plans);
        action.outputActionInput = prepareBrahmsOutputActionInput(ruleAction);
    } else if (ruleActionType === "goto") {
        action.gotoActionInput = ruleAction;//prepareBrahmsOutputActionInput(ruleAction);
    } else if (ruleActionType === "notification") {
        action.notificationActionInput = prepareBrahmsNotificationActionInput(ruleAction);
    } else if (ruleActionType === "cohorts") {
        action.cohortsActionInput = prepareBrahmsCohortsActionInput(ruleAction);
    } else {
        action = ruleAction;
    }
    return {id, ruleType, ruleValue:value, ruleValueEnd:valueEnd, ruleValueId, ruleActionType, ruleAction:action};
}


export const prepareBrahmsRuleField = rule => {
    return rule;
    const {ruleActionType, ruleAction} = rule;
        let ruleActionInput = {};
        switch(ruleActionType) {
            case 'ap':
                ruleActionInput = ruleAction;
                break;
            case 'output':
                ruleActionInput = ruleAction;
                break;
            case 'goto':
                ruleActionInput = ruleAction;
                break;
        }
        //  console.log(ruleActionInput, 'ruleAction');
        return {...rule, ruleAction:ruleActionInput};
}
