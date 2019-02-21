import TransitionManagerPure from '../components/TransitionManager';
import {compose, withProps, branch, withHandlers} from 'recompose';
import {Form, message} from 'antd';
import { withDrawer, showLoadingMessage } from '../../../../../../../components/Modal';
import { withCreateTransitionMutation, withUpdateTransitionMutation } from '../mutations';




const enhance = compose(
    branch(props => props.transition, withUpdateTransitionMutation, withCreateTransitionMutation),
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            props.form.validateFields((err, values) => {
                if (!err) {
                    const hide = showLoadingMessage();
                    props.onSubmit(values).then(({data})=> {
                        hide('Saved');
                        props.onHide();
                        if (props.refetch) {
                            props.refetch();
                        }
                    });
                }
            });
        },
    }),
    withProps(props => {
        const {user, transition} = props;
        const modalTitle = transition ? 'Edit a Transition for '+user.fullName : 'Add a Transition for '+user.fullName;
        return {
            modalTitle
        }
    }),
    withDrawer
);
export const TransitionManager = enhance(TransitionManagerPure);
export default TransitionManager;