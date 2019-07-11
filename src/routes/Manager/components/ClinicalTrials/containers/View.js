import { withDrawer } from '../../../../../components/Modal';
import { compose, withProps } from 'recompose';
import { ClinicalTrialViewPure } from '../components/ClinicalTrialView';


const enhance = compose(
    withProps(props => {
        const { clinicalTrial} = props;
        const { nctId } = clinicalTrial || {};
        return {
            modalTitle: nctId
        }
    }),
    withDrawer
);

export const TrialViewText = enhance(ClinicalTrialViewPure);