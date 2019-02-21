import DeleteButtonPure from '../components/DeleteButton';
import { compose, withHandlers } from 'recompose';
import { withDeleteAdvocateMutation } from '../../../mutations';

const enhance = compose(
    withDeleteAdvocateMutation,
    withHandlers({
        handleDelete: props => () => {
            props.deletePatientAdvocate().then(() => {
                props.onDelete();
            });
        }
    })
);
export const PatientAdvocateDeleteButton = enhance(DeleteButtonPure);