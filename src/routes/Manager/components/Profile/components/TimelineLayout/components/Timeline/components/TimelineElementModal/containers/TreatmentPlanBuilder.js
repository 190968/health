import TreatmentPlanBuilder from '../components/TreatmentPlanBuilder';
import {withModal} from '../../../../../../../../../../../components/Modal';
import {compose, withProps, withHandlers, withState,defaultProps} from 'recompose';
import {withTreatmentPlanMutation} from '../components/TreatmentPlanBuilder/mutations';
import {withSpinnerWhileLoading} from '../../../../../../../../../../../components/Modal'
const enhanceProps = compose(
    defaultProps({
      treatmentPlan: {/*id:8307*/}
    }),
    withTreatmentPlanMutation,
    withState('tmpElements', 'setTmpElements', props => {
        const  {treatmentPlan={}} = props;
        const {elements=[]} = treatmentPlan;
        return elements;
      }),
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
        // onSubmit: props => () => {
        //     const {tmpElements=[]} = props;
 
        //     console.log(tmpElements);
        //     console.log(props);
        //     // const elements = caseElements.map((element, i) => {
        //     //     const {id, timelineId, notes} = element;
        //     //     return {id, timelineId, notes}
        //     // });
 
        //     // props.createTumorboardCase(elements).then(() => {
        //     //     props.onHide();
        //     // });
        //     // now just save in memory
        //     //const tumorCase = {id:'', patient:props.user, elements:tmpElements};
        //     //props.onFinish(tumorCase);
        //     props.onHide();
        // }
    }),
    //enhance,
    withModal,
    withSpinnerWhileLoading,
    
);

export default enhanceProps(TreatmentPlanBuilder);
