import Accept from '../components/Accept';
import { withAcceptFollowUpMutation } from '../mutations';
import { compose, withHandlers } from 'recompose';
import {message} from 'antd';

const enhance = compose(
    withAcceptFollowUpMutation,
    withHandlers({
        onSubmit: props => () => {
            props.acceptFollowUp().then(() => {
                message.success('Done');
                if (props.refetch) {
                    props.refetch();
                }
            })
        }
    })
);

export const FollowUpAcceptButton = enhance(Accept);