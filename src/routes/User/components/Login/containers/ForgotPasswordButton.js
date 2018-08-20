import ForgotPasswordButton from '../components/ForgotPasswordButton';
import { compose, withState, withHandlers } from 'recompose';


const enhance = compose(
    withState('openModal', 'setOpenModal', false),
    withHandlers({
        toggleModal: props => () => {
            props.setOpenModal(!props.openModal);
        }
    })
);

export default enhance(ForgotPasswordButton);