// import BrahmsRuleActionsPure from '../components/RuleActions';
import {compose, branch, renderComponent, renderNothing, withState} from 'recompose';
import {BrahmsRuleActionGoTo} from '../components/RuleActions/goto';
import {BrahmsRuleActionOutput} from '../components/RuleActions/output';
import {BrahmsRuleActionAp} from '../components/RuleActions/ap';


const enhance = compose(
    withState('aaa', 'aaaa'),
    // branch(props => {
    //     console.log(props);
    //     return props.type === 'output';
    // }, renderComponent(BrahmsRuleActionOutput)),
    branch(props => props.type === 'ap', renderComponent(BrahmsRuleActionAp)),
    branch(props => props.type === 'goto', renderComponent(BrahmsRuleActionGoTo)),
);
export const BrahmsRuleActions = enhance(BrahmsRuleActionOutput);