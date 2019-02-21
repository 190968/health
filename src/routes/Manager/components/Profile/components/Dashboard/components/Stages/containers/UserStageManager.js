import UserStageManagerPure from '../components/UserStageManager';
import { compose, withProps, withHandlers } from 'recompose';
import { Form, message } from 'antd';
import { withDrawer, withSpinnerWhileLoading } from '../../../../../../../../../components/Modal';
import { withUserStagesQuery } from '../queries';
import { withUpdateUserStageMutation } from '../mutations';


const enhance = compose(
    withUserStagesQuery,
    withUpdateUserStageMutation,
    withSpinnerWhileLoading,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {

                if (!err) {
                    const{status, date, time, checklist} = values;
                    let input = {status, date, time, checklist};
                    const hide = message.loading('Saving...');
                    props.updateUserStage(input).then(() => {
                        hide();
                        message.success('Updated');
                        if (props.refetch) {
                            props.refetch();
                        }
                    });
                }
            });
        }
    }),
    withProps(props => {
        return {modalTitle: 'Continuum of care'}
    }),
    withDrawer
);
export const UserStageManager = enhance(UserStageManagerPure);