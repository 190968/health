import { compose, withHandlers , withProps} from 'recompose';
import {PathologyForm, preparePathologyInput}  from '../../../../../../../../../../Health/components/Forms/containers/Pathology';
import {withTreatmentItemModal} from '../modal';

const enhance = compose(
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const input = preparePathologyInput(values);
                    props.onSubmit(input)
                }
            });
        },
    }),
    withTreatmentItemModal
)
const Enhanced = enhance(PathologyForm);
export default Enhanced;