import JoinButton from '../components/JoinButton';
import {message} from 'antd';
import { compose, withHandlers } from 'recompose';
import { withProgramJoinMutation } from '../../../mutations';

const enhance = compose(
    withProgramJoinMutation,
    withHandlers({
        joinProgram: props => () => {
            const hide = message.loading('Saving...');
            props.joinProgam().then(() => {
                hide();
                message.success('Joined');
            });
        },
        unjoinProgram: props => () => {
            const hide = message.loading('Saving...');
            props.unjoinProgam().then(() => {
                hide();
                message.success('Unjoined');
            });
        }
    })
);
export const ProgramJoinButton = enhance(JoinButton);