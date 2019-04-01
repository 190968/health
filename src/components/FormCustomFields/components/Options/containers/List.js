import {compose, withHandlers, withStateHandlers} from 'recompose';
import OptionsListPure from '../components/List';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';

const enhance = compose(
    
    withHandlers({
        onChange: props => (rules) => {
            if (props.onChange) {
                // console.log(rules.target.value);
                props.onChange(rules);
            }
        }
    }),
    withStateHandlers( props => {
        const {value} = props;
        const options = value || [];
        // console.log(props);
        // console.log(options, 'optionsoptionsoptions');
        return {options};
    }, {
        add: (state, props) => () => {
            let {options=[]} = state;
            options = [...options, {label: ''}];
            props.onChange(options);
            return {
                options
            }
        },
        appendOption: (state, props) => (answer) => {
            let {options=[]} = state;
            options = [...options, answer];
            // console.log(rules, 'rulesrules');
            props.onChange(options);
            return {
                options
            }
        },

        updateOption: (state, props) => (rule, index) => {
            let {options=[]} = state;
            const {id} = rule || {};
            if (id) {
                // find answer
                const answerIndex = options.findIndex(a => a.id ===id);
                options[answerIndex] = rule;
            } else if (index >= 0) {
                options[index]['label'] = rule;
            }
            // console.log(options);
            props.onChange(options);
            return {
                options
            }
        },
        deleteOption: (state, props) => (rule, index) => {
            let {options=[]} = state;

            const {id} = rule || {};
            // console.log(rule);
            // console.log(index);
            if (id) {
                options = options.filter(a => a.id !== id);
            } else if (index >= 0) {
                options = options.filter((a,i) => i !== index);
            }
            // console.log(options);
            props.onChange(options);
            return {
                options
            }
        },
        onSortEnd : (state, props) => ({oldIndex, newIndex}) => {
            //console.log(1111);
            const options = state.options || [];
            const newOptions = arrayMove(options, oldIndex, newIndex);
            props.onChange(newOptions);
            // console.log(newOptions);
            return {
                options:newOptions
            }
        }
    }),
    SortableContainer
);

export const OptionsList = enhance(OptionsListPure);