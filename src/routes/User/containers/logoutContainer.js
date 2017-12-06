import { connect } from 'react-redux'
import { logoutUserRequest, logoutUserSuccess,logoutUserError} from '../modules/logout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import LogoutForm from '../components/logoutComponent'

const logoutUser = gql`
mutation logout{
    logout
}
`;



const withMutation = graphql(logoutUser, {
    props: ({ mutate }) => ({
        logoutUser: input => {
            return mutate () ;
        },
    }),
});


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
});


export default withMutation(connect(mapStateToProps, mapDispatchToProps)(LogoutForm));