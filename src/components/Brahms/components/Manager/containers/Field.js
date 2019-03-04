import BrahmsAsFieldPure from '../components/Field';
import {compose, withHandlers, withStateHandlers} from 'recompose';
import { prepareBrahmsRuleInput, prepareBrahmsRuleField } from './Rule';

const enhance = compose(
    withHandlers({
        onChange: props => (rules) => {
            if (props.onChange) {
                props.onChange(rules);
            }
        }
    }),
    withStateHandlers( props => {
        const {value} = props;
        const rules = value || [];
        return {rules};
    }, {
        appendRule: (state, props) => (answer) => {
            let {rules=[]} = state;
            rules = [...rules, answer];
            // console.log(rules, 'rulesrules');
            props.onChange(rules);
            return {
                rules
            }
        },

        updateRule: (state, props) => (rule, index) => {
            let {rules=[]} = state;

            const {id} = rule || {};
            
            if (id) {
                // find answer
                const answerIndex = rules.findIndex(a => a.id ===id);
                rules[answerIndex] = rule;
            } else if (index >= 0) {
                rules[index] = rule;
            }
            // console.log(rule);
            // console.log(index);
            // console.log(rules);
            props.onChange(rules);
            return {
                rules
            }
        },
        deleteRule: (state, props) => (rule, index) => {
            let {rules=[]} = state;

            const {id} = rule || {};
            
            if (id) {
                rules = rules.filter(a => a.id !== id);
            } else if (index >= 0) {
                rules = rules.filter((a,i) => i !== index);
            }
            // console.log(rule);
            // console.log(index);
            // console.log(rules);
            props.onChange(rules);
            return {
                rules
            }
        },

    })
);
export const BrahmsAsField = enhance(BrahmsAsFieldPure);



export const prepareBrahmsInput = rules => {
    if (rules) {
        return rules.map(r => prepareBrahmsRuleInput(r));
    }
    return null;
}
export const prepareBrahmsRulesField = rules => {
    if (rules) {
        return rules.map(r => prepareBrahmsRuleField(r));
    }
}
