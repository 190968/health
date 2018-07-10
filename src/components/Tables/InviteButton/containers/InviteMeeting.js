
import InviteMeeting from '../components/InviteMeeting';
import {compose,withHandlers, withState} from 'recompose';
const enhance = compose(
    withState('visibleModal', 'setOpenManager', false),
        withHandlers({
            openModal: props => () => {
                props.setOpenManager(true);
            },
            hideModal: props => () => {
                props.setOpenManager(false);
            }
        })
);
export default enhance(InviteMeeting);