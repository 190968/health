import Schedule from '../components/Schedule';
import { compose, withHandlers } from 'recompose';

const enhance = compose(
    withHandlers({

        checkStartDate: props => (endValue) => {
            const {form} = props;
            const startValue = form.getFieldValue('endDate');
            if (!endValue || !startValue) {
                return false;
            }
            return endValue.valueOf() > startValue.valueOf();
        },
        checkEndDate: props => (endValue) => {
            const {form} = props;
    
            const startValue = form.getFieldValue('startDate');
            //const startValue = this.state.startValue;
            if (!endValue || !startValue) {
                return false;
            }
            return endValue.valueOf() <= startValue.valueOf();
        },
    
    
        validateEndDate: props => (rule, value, callback) => {
            const {form} = props;
            const start_date = form.getFieldValue('startDate');
            if (start_date && value && value < start_date) {
                callback('End date is wrong');
            } else {
                callback();
            }
        }

    })
);
export const PlanSchedule = enhance(Schedule);