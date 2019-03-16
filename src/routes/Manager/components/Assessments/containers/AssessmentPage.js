import AssessementViewPure from '../components/Page';
import {compose, withProps, withState, withHandlers} from 'recompose';
import { withUserAssessmentQuery } from '../queries';
import { getSQLDateToday } from '../../../../../components/Other/utils';
 

const enhance = compose(
    withProps(props => {
        console.log(props);
        const {params} = props.match || {};
        const {id, date=getSQLDateToday()} = params || {};
        // match.params.id,
        return {userAssessment: {id}, asPage:true, date}
    }),
    withUserAssessmentQuery
)

const AssessementPage = enhance(AssessementViewPure);

export default AssessementPage;