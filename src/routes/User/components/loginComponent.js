import React, { PropTypes } from 'react';

import {Route } from 'react-router'
const styles = {
    form: {
        marginBottom: 20,
    },
    input: {
        display: 'block',
        width: 200,
        margin: '0 auto 10px auto',
        height: 18,
        fontSize: 14,
        padding: 10,
        outline: 0,
    },
    successMessage: {
        backgroundColor: 'rgb(251, 161, 97)',
        padding: 10,
        width: 300,
        color: 'white',
        margin: '15px auto',
    },
    errorMessage: {
        backgroundColor: 'red',
        padding: 10,
        width: 300,
        color: 'white',
        margin: '15px auto',
    },
};


const redirect = (info) => {
    //console.log(info);
    //history.pushState('/')
}

const LoginForm = ({
                      token,onSubmit,
                      loading,
    from,
                       email,
                      submitButtonLabel,
                      successMessage,
                      errorMessage,
                  }) => (
    <form
        onSubmit={(event) => {
            event.preventDefault();
            const formData = new FormData(event.target);
            return onSubmit({
                email: formData.get('email'),
                password: formData.get('password'),
            });
        }}
        style={styles.form}
    >
        {token ? (
            <Route path="/" component={Counter}/>
        ) : (
            <div>
        <input
            type="text"
            name="email"
            placeholder="email"
            defaultValue={email}
            style={styles.input}
            required
        />
        <input
            type="password"
            name="password"
            placeholder="password"
            defaultValue="Fitango1"
            style={styles.input}
            required
        />

        <div>
            <button
                type="submit"
                className="btn"
            >submit
            </button>
        </div>

        <div>
            {loading && (
                <div style={{ margin: 20 }}>Loading...</div>
            )}

            {successMessage && (
                <div style={styles.successMessage}>{successMessage}</div>
            )}

            {errorMessage && (
                <div style={styles.errorMessage}>{errorMessage}</div>
            )}
        </div>
            </div>
            )}
    </form>
);

LoginForm.propTypes = {
    /*onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    submitButtonLabel: PropTypes.string,
    successMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    email: PropTypes.string,*/
};

LoginForm.defaultProps = {
    loading: false,
    successMessage: '',
    errorMessage: '',
    email: 'kicker@fit.com',
};

export default LoginForm;