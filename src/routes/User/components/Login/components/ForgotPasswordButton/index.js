import React from 'react';
import ForgorPasswordRequestModal from '../../containers/ForgorPasswordRequest';

const ForgotPasswordButton = props => {

    return <React.Fragment>
        {props.openModal && <ForgorPasswordRequestModal onHide={props.toggleModal} email={props.email} />}
            <a className="login-form-forgot" onClick={props.toggleModal} >Forgot password</a>
        </React.Fragment>;
}

export default ForgotPasswordButton;