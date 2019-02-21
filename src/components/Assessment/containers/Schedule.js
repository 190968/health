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
            // console.log(start_date);
            // console.log(start_date.valueOf());
            // console.log(value);
            // console.log(value.valueOf());
            if (start_date && value && value.valueOf() < start_date.valueOf()) {
                callback('End date is wrong');
            } else {
                callback();
            }
        }

    })
);
export const AssessmentSchedule = enhance(Schedule);