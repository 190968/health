import { Form } from 'antd';
import { compose, withHandlers, withProps, withStateHandlers } from 'recompose';
import RemindersManagerByTimePure from '../components/RemindersManagerByTime';
import { withUpdateRemindersMutation } from './mutations';
import {withDrawer, withSpinnerWhileLoading} from '../../Modal';
import { withLoadingButton } from '../../Loading';
const defaultReminder = { i: 0, time: '00:00:00', email: true, notification: true, sms: false };

const enhance = compose(
	Form.create(),
	withUpdateRemindersMutation,
	withLoadingButton,
	withHandlers({
		onSubmit: (props) => () => {
            const { form} = props;
			form.validateFields((err, values) => {
				if (err) {
					return;
                }
				const {reminders} = values;
                //console.log(values);
				//const {reaction, severity} = values;
				//this.props.addReaction(values);
				props.setLoadingButton(true);
                props.updateReminders(reminders).then(data => {
					props.setLoadingButton(false);
					props.onHide();
                });
				// form.resetFields();
				// hide the modal
				//this.setState({ showAdd: false });
			});
		}
	}),
	withDrawer,
	withSpinnerWhileLoading,
    withStateHandlers(
		(props) => {
			const { reminders = [] } = props;
			const reminderFinal = reminders.map((reminder, i) => {
				return { ...reminder, i };
			});
			return { reminders: reminderFinal };
		},
		{
			deleteReminder: (props) => (reminderToDelete) => {
				const { reminders } = props;
				const newReminders = reminders.filter((reminder, i) => {
					return reminder.i !== reminderToDelete.i
				});
				return { reminders: newReminders };
			},
            handleAddLine: (state, props) => () => {
				const { reminders = [] } = state;

				// find max i
				var max = Math.max.apply(
					null,
					Object.keys(reminders).map(function(e) {
						return reminders[e]['i'];
					})
				);

				let newReminder = { ...defaultReminder, i: max + 1 };
				return {reminders: [ ...reminders, newReminder ]};
			}
		}
	),
    withProps(props => {
		const {times=[], reminders=[]} = props;
        let newReminders = [];
        if (times.length > 0) {
            newReminders = times.map((time, i) => {
				// find reminder for this time
				const reminder = reminders.find(reminder => {
					return reminder.time === time;
				});
                if (!reminder) {
                    return  {...defaultReminder, i, time};
                }
                return {...reminder, i};
            });
        } else {
            newReminders = reminders.map((reminder, i) => ({...reminder, i}));
		}
        return  {
            reminders:newReminders,
            editableTime: times.length == 0
        }
    }),
    
);
export const RemindersManagerByTime = enhance(RemindersManagerByTimePure);
