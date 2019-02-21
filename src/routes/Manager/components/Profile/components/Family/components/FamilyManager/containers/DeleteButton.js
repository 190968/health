import DeleteButtonPure from '../components/DeleteButton';
import { compose, withHandlers } from 'recompose';
import { withDeleteFamilyMutation } from '../../../mutations';

const enhance = compose(
    withDeleteFamilyMutation,
    withHandlers({
        handleDelete: props => () => {
            props.deleteFamilyMember().then(() => {
                props.onDelete();
            });
        }
    })
);
export const FamilyMemberDeleteButton = enhance(DeleteButtonPure);