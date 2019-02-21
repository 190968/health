import AllergyPure from '../components/Allergy';
import { compose, withHandlers } from 'recompose';
import { enhanceHealthRecordManagerStart, enhanceHealthRecordManagerEnd } from '../enhances';
import moment from 'moment';
 
const enhance = compose(
    enhanceHealthRecordManagerStart,
    withHandlers({
        onSubmit: props => (values) => {
            props.form.validateFields((err, values) => {
                if (!err) {
                    const {type} = props;
                    if (type === 'med_allergy') {
                        const med_allergy = prepareAllergyInput(values);
                        props.onHealthItemSubmit({med_allergy});
                    } else {
                        const allergy = prepareAllergyInput(values);
                        props.onHealthItemSubmit({allergy});
                    }
                }
            });
        }
    }),
    enhanceHealthRecordManagerEnd
)
export const AllergyForm = enhance(AllergyPure);
export const AllergyPureForm = AllergyPure;


export const prepareAllergyInput = values => {
    const {
        date,
        ...otherProps
    } = values;

    return {
            date:moment(date).format('YYYY-MM-DD'),
            ...otherProps
    }
}