

import Checklist from '../../../../../../../../../../Plan/components/Plan/components/Checklist';
import { compose, withHandlers, withProps } from 'recompose';

const enhance = compose(
    withHandlers({
        handleReport: props => value => {
            const {handleReport} = props;
            // console.log(props);
            // console.log(value);
            if (handleReport) {
                handleReport(value, 'checklist');
            }
        }
    })
)
export const TimelineElementChecklist = enhance(Checklist);