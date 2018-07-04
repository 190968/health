import TreatmentPlanBuilder from '../components/TreatmentPlanBuilder';
import {withModal} from '../../../../../../../../../../../components/Modal';
import {compose, withProps, withHandlers, withState,defaultProps} from 'recompose';
import {withTreatmentPlanMutation} from '../components/TreatmentPlanBuilder/mutations';
import {withSpinnerWhileLoading} from '../../../../../../../../../../../components/Modal'
const enhanceProps = compose(
    defaultProps({
      treatmentPlan: {id:8283}
    }),
    withTreatmentPlanMutation,

    withProps(props => {
        const {details} = props;
        return {
            // details: {
            //     ...details,
            //     id: '',
            // },
            modalWidth: 900,
            modalFooter:false,
            modalTitle: props.treatmentPlan.id ? 'Edit Treatment Plans' : 'Add Treatment Plan'
        }
    }),
    withHandlers({

    }),
    //enhance,
    withModal,
    withSpinnerWhileLoading,
    withState('tmpElements', 'setTmpElements', props => {
      const  {treatmentPlan={}} = props;
      const {elements=[]} = treatmentPlan;
      return elements;
    }),
);

export default enhanceProps(TreatmentPlanBuilder);
