import SnoozeForm from '../components/Form';
import { compose, withHandlers } from 'recompose';
import { Form, message } from 'antd';
import moment from 'moment';
import { withSnoozeFollowUpMutation } from '../../../mutations';

const enhance = compose(
    withSnoozeFollowUpMutation,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    props.snoozeFollowUp(values).then(() => {
                        message.success('Snoozed');
                        if (props.onHide) {
                            props.onHide();
                        }
                        if (props.refetch) {
                            props.refetch();
                        }
                    });
                }
            });
        },
        disabledDate: props => (current) => {
            const {followUp} = props;
            const {date, time} = followUp || {};
            if (date) {
                const isOff =  current && current < moment(date).startOf('day');
                if (isOff) {
                    return isOff;
                }
            }
            // Can not select days before today and today
            return current && current < moment().startOf('day');
        },
    })
);
export const FollowUpSnoozeForm = enhance(SnoozeForm);