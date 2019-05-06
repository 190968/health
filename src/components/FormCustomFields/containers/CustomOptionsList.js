import {compose, withHandlers, withStateHandlers} from 'recompose';
import CustomOptionsListPure from '../components/CustomOptionsList';
import {SortableContainer, SortableElement, arrayMove, SortableHandle} from 'react-sortable-hoc';

const enhance = compose(
    withHandlers({
        onChange: props => (rules) => {
            // console.log(rules, 'rules');
            if (props.onChange) {
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
            const {blankItem={}} = props;
            options = [...options, blankItem];
            props.onChange(options);
            return {
                options
            }
        },
        appendOption: (state, props) => (answer) => {
            let {options=[]} = state;
            options = [...options, answer];
            props.onChange(options);
            return {
                options
            }
        },

        updateOption: (state, props) => (rule, index) => {
            console.log(rule, 'uupdate');
            console.log(index, 'uupdateIndex');
            let {options=[]} = state;
            const {id} = rule || {};
            if (id) {
                // find answer
                const answerIndex = options.findIndex(a => a.id ===id);
                options[answerIndex] = rule;
            } else if (index >= 0) {
                options[index] = rule;
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

export const CustomOptionsList = enhance(CustomOptionsListPure);