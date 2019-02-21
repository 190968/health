import TreatmentPure from '../components/Treatment';
import { compose, withHandlers } from 'recompose';
import { enhanceHealthRecordManagerStart, enhanceHealthRecordManagerEnd } from '../enhances';
import moment from 'moment';
import { prepareTreatmentElementObjectInput } from '../components/Treatment/containers/ElementManager';

const enhance = compose(
    enhanceHealthRecordManagerStart,
    withHandlers({
        onSubmit: props => (values) => {
            props.form.validateFields((err, values) => {
                if (!err) {
                    let treatment = prepareTreatmentInput(values);
                    
                    props.onHealthItemSubmit({ treatment });
                }
            });
        }
    }),
    enhanceHealthRecordManagerEnd
)
export const TreatmentForm = enhance(TreatmentPure);
export const TreatmentPureForm = TreatmentPure;


export const prepareTreatmentInput = treatment => {
    // const {
    //     //date,
    //     ...otherProps
    // } = values;

    // console.log(values);

    // const {type} = props;
    return prepareTreatmentElementObjectInput({type:'treatment', treatment});
 
}