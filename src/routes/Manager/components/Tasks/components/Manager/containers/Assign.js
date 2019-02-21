import TaskAssignPure from '../components/Assign';
import { compose, withReducer, withStateHandlers, withHandlers } from 'recompose';
import { withActiveUser, withActiveNetwork } from '../../../../../../../components/App/app-context';

const enhance = compose(
    //
    // withReducer('toggledOn', 'dispatch', (state, action) => {
    //     switch(action.type) {
    //       case 'SHOW':
    //         return true;
    //       case 'HIDE':
    //         return false;
    //       case 'TOGGLE':
    //         return !state;
    //       default:
    //         return state;
    //     }
    //   }, false),
    withHandlers({
        onChange: props => (input) => {
            //const {type, participants, useAll} = props;
            //console.log(input);
            if (props.onChange) {
                props.onChange(input.type);
            }
        }
    }),
    withStateHandlers(props => {
        const {value} = props;
        return {
            type: value,
            participants: [],
            useAll: false,
            providerId:null
        }
    }, {
        updateType: (state, props) => (e) => {
            const type = e.target.value;
            props.onChange({...state, type});
            return {
                type
            }
        },
        updateParticipants: (state, props) => (participants) => {
            props.onChange({...state, participants});
            return {
                participants
            }
        },
        updateFamilyMembers: (state, props) => (participants) => {
            props.onChange({...state, participants});
            return {
                participants
            }
        },
        updateProvider: (state, props) => (providerId) => {
            props.onChange({...state, providerId});
            return {
                providerId
            }
        },
        updateTeam: (state, props) => (value) => {
            console.log(value);
            const {mode, users} = value;
            const newState = {
                useAll:mode==1,
                participants:users
            };
            props.onChange({...state, ...newState});
            return newState;
        },
        
    }),
    withActiveNetwork,
    // withHandlers({
    //     onChange: props => () => {
    //         const {type, participants, useAll} = props;
    //         console.log(props);
    //         //props.onChange({type, participants, useAll});
    //     }
    // }),
    // withHandlers({
    //     updateType: props => (e) => {
    //         const type = e.target.value;
    //         props.updateType(type);
    //         props.onChange();
    //     },
    //     updateParticipants: props => (participants) => {
    //         props.updateType(participants);
    //         props.onChange();
    //     },
    //     updateTeam: props => (value) => {
    //         props.updateTeam(value);
    //         props.onChange();
    //     },
    // })
);
export const TaskAssign = enhance(TaskAssignPure);
export default TaskAssign;