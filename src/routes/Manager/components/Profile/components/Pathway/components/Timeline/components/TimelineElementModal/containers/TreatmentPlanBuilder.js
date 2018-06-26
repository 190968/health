import TreatmentPlanBuilder from '../components/TreatmentPlanBuilder';
import {modalHOC} from '../modal';
import {compose, withProps, withHandlers, withState} from 'recompose';

const enhanceProps = compose(
    withProps(props => {
        const {details} = props;
        return {
            details: {
                ...details,
                id: '',
            },
            showNotes:false,
            modalWidth: 900
        }
    }),
    //enhance,
    modalHOC,
    withState('tmpElements', 'setTmpElements', []),
);

export default enhanceProps(TreatmentPlanBuilder);
