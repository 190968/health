import { withStateHandlers} from 'recompose';
import moment from 'moment';
export const withDateState = withStateHandlers(
    (props) => ({
        date: props.date,
    }),
    {
        showDate: (state) => (type) => {
            const { date } = state;
            let newDate = '';
            if (type === 'prev') {
                newDate = moment(date).add(-1, 'days').format('YYYY-MM-DD');
            } else if(type === 'next') {
                newDate = moment(date).add(1, 'days').format('YYYY-MM-DD');
            } else {
                newDate = moment(date).format('YYYY-MM-DD');
            }
            return {date:newDate}
            //props.loadDate(newDate);
        }
    }
)
 