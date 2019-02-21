import {Form, message} from 'antd';
import { compose, defaultProps, renderComponent, withHandlers , withProps, withState} from 'recompose';
import { withDrawer } from '../../../../../../../../components/Modal';
import { getTreatmentElementLabel } from '../../../../../../../Plan/components/PlanLayout/components/PlanElementBuilder/components/TreatmentElementBuilder/components/TreatmentBlockOptionSelect';


export const withTreatmentFormElementStart = compose(
   // withHealthRecordQuery,
    //withHealthItemMutation,
    defaultProps({
        hideHealthData:true
    }),
    Form.create(),
    // withHandlers({
    //     onChange: props => (input) => {
    //         const {elements, onChange, ...otherInput} = input;
    //         console.log(props);
    //         console.log(input);
    //         const hide = message.loading('Saving...');
    //         // if (props.createHealthRecord) {
    //         //     props.createHealthRecord(input).then(({data}) => {
    //         //         hide();
    //         //         message.success('Added')
    //         //         props.onHide();
    //         //     })
    //         // } else if (props.updateHealthRecord) {
    //         //     props.updateHealthRecord(input).then(({data}) => {
    //         //         hide();
    //         //         message.success('Updated')
    //         //         props.onHide();
    //         //     })
    //         // }
    //     }
    // }),
);


export const withTreatmentFormElementEnd = compose(
    withProps(props => {
        const {type} = props;
        return {
            modalTitle: getTreatmentElementLabel({type}),
            modalWidth: 800
        }
    }),
    withDrawer
)
