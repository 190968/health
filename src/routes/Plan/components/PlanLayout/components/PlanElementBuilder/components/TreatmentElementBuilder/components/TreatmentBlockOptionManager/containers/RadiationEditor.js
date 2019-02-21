import { compose, withHandlers , withProps} from 'recompose';
import {RadiationForm, prepareRadiationInput} from '../../../../../../../../../../Health/components/Forms/containers/Radiation';
import {withTreatmentItemModal} from '../modal';

const enhance = compose(
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareRadiationInput(values);
                    props.onSubmit(input)
                }
            });
        },
    }),
    withTreatmentItemModal
)
const Enhanced = enhance(RadiationForm);
export default Enhanced;