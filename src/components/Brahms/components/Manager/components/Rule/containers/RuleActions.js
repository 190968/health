// import BrahmsRuleActionsPure from '../components/RuleActions';
import {compose, branch, renderComponent, renderNothing, withState} from 'recompose';
import {BrahmsRuleActionGoTo} from '../components/RuleActions/goto';
import {BrahmsRuleActionOutput} from '../components/RuleActions/output';
import {BrahmsRuleActionNotification} from '../components/RuleActions/notification';
import {BrahmsRuleActionCohorts} from '../components/RuleActions/cohorts';
import {BrahmsRuleActionAp} from '../components/RuleActions/ap';


const enhance = compose(
    withState('aaa', 'aaaa'),
    // branch(props => {
    //     console.log(props);
    //     return props.type === 'output';
    // }, renderComponent(BrahmsRuleActionOutput)),
    branch(props => props.type === 'ap', renderComponent(BrahmsRuleActionAp)),
    branch(props => props.type === 'goto', renderComponent(BrahmsRuleActionGoTo)),
    branch(props => props.type === 'notification', renderComponent(BrahmsRuleActionNotification)),
    branch(props => props.type === 'cohorts', renderComponent(BrahmsRuleActionCohorts)),
);
export const BrahmsRuleActions = enhance(BrahmsRuleActionOutput);


export const prepareBrahmsRuleActionsField = (props, type) => {
    console.log(props, 'prepareBrahmsRuleActionsField');

    // switch()

    return props;
}