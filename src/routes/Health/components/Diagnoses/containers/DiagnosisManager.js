import DiagnosisManager, {prepareInput} from '../components/DiagnosisManager';
import {compose, withHandlers, branch, renderComponent, withProps} from 'recompose';
import {Form} from 'antd';
import {modalManagerHOC} from '../../modalManager';
import {withMutation} from '../mutations';
import withQuery from '../queries';
import { withModal } from '../../../../../components/Modal';

// add mutations and queries

const enhance = compose(
    Form.create(),
    withQuery,
    withMutation,
    withHandlers({
        onSubmit: props => () => {
            props.form.validateFields((err, values) => {
                if (!err) {

                    const input = prepareInput(values);

                    if (props.addHealthRecord) {
                        props.addHealthRecord(input).then(({data}) => {
                            console.log(data, 'Added');
                            props.onHide();
                        })
                    } else if (props.updateHealthRecord) {
                        props.updateHealthRecord(input).then(({data}) => {
                            console.log(data, 'Updated');
                            props.onHide();
                        })
                    }
                    // this.setState({
                    //     loading: true
                    // });
                    // save the health item
                    //return onSubmit(values);
                }
            });
        }
    }),
    withProps(props => {
        return {
            modalTitle: 'Manage Diagnosis',
            modalWidth: 800
        }
    }),
    withModal
);
export default enhance(DiagnosisManager);