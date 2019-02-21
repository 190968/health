import TeamSelectPure from '../components/TeamSelect';
import {compose, withStateHandlers, withHandlers} from 'recompose';

export const TeamSelect = compose(
    withHandlers({
        triggerChange: props => (state) => {
            const onChange = props.onChange;
            if (onChange) {
                onChange(state);
            }
        }
    }),
    withStateHandlers( props => {
        const {mode='', users=[]} = props;
        return {mode, users};
    }, {
        handleMode: (state, props) => (e) => {
            const mode = e.target.value;
            const newState = {...state, mode, users:[]};
            props.triggerChange(newState);
            return {mode};
        },
        handleUsers: (state, props) => (users) => {
            //const users = e.target.value;
            const newState = {...state, users};
            props.triggerChange(newState);
            return {users};
        }
    }),
     
)(TeamSelectPure);