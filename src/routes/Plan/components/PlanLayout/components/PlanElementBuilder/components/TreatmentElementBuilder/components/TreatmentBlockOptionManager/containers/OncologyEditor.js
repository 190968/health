import { compose, withHandlers , withProps} from 'recompose';
import {withTreatmentItemModal} from '../modal';
import { OncologyPureForm, prepareOncologyInput }  from '../../../../../../../../../../Health/components/Forms/containers/Oncology';

const enhance = compose(
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareOncologyInput(values);
                    props.onSubmit(input)
                }
            });
        },
    }),
    withTreatmentItemModal
)
const Enhanced = enhance(OncologyPureForm);
export default Enhanced;