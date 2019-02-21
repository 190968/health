import { compose, withHandlers , withProps} from 'recompose';
import {withTreatmentItemModal} from '../modal';
import { RadiologyPureForm, prepareRadiologyInput } from '../../../../../../../../../../Health/components/Forms/containers/Radiology';

const enhance = compose(
    withHandlers({
        onSubmit: props => () => {
            const {form} = props;
            form.validateFields((err, values) => {
                if (!err) {
                    const input = prepareRadiologyInput(values);
                    //console.log(input);
                    props.onSubmit(input)
                }
            });
        },
    }),
    withTreatmentItemModal
)
// const Enhanced = enhance(RadiologyForm);
// export default Enhanced;
export default enhance(RadiologyPureForm);