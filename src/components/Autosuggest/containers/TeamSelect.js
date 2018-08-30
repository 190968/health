import TeamSelectPure from '../components/TeamSelect';
import {compose, withState, withHandlers} from 'recompose';

export const TeamSelect = compose(
    withState('mode', 'setSelectMode', props=> props.mode || ''),
    withState('users', 'setUsers', props=> props.users || ''),
    withHandlers({
        triggerChange: props => () => {
            const onChange = props.onChange;
            if (onChange) {
                console.log(props);
                const {mode, users} = props;
                onChange({mode, users});
            }
        }
    }),
    withHandlers({
        handleMode: props => (e) => {
            const value = e.target.value;
            console.log(value);
            props.setSelectMode(value);
            props.triggerChange();
        },
        handleUsers: props => (users) => {
            //const users = e.target.value;
            props.setUsers(users);
            props.triggerChange();
        }
    }),
)(TeamSelectPure);