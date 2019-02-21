import RemindersListPure from '../components/RemindersList';
import { compose,  branch, renderComponent } from 'recompose';
import { withDrawer, withSpinnerWhileLoading } from '../../Modal';
import { withRemindersQuery } from './queries';
import { RemindersManagerByTime } from './RemindersManagerByTime';

const enhance = compose(
    withRemindersQuery,
    branch(props => props.simple, renderComponent(RemindersManagerByTime)),
    branch(props => props.drawer, withDrawer),
    withSpinnerWhileLoading
);
export const RemindersList = enhance(RemindersListPure);