import { connect } from 'react-redux'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import LogoutForm from '../components/Logout'
import { logoutUser } from '../modules/user';

const logoutUserQuery = gql`
    mutation logout{
        logout
    }
`;



const LogoutFormWithMutation = graphql(
    logoutUserQuery
);


const mapStateToProps = (state) => {
    //console.log(state.user);
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        //token: state.user.token
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({

    logout: () => {
        //console.log(ownProps);

        ownProps.mutate().then((data) => {
            console.log(data);
            if (!data.loading) {

                dispatch(logoutUser());

                ownProps.history.push('/')

            }
        })
        //

    },

});

export default LogoutFormWithMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutForm));