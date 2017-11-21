import { connect } from 'react-redux'
import { loginUserRequest, loginUserSuccess, loginUserError} from '../modules/login'
//import { logoutUser} from '../modules/user'

//import LogoutForm from '../components/logoutComponent'
import { gql,graphql } from 'react-apollo';


const logoutUser = gql`
    mutation loginUser($email: Email! $password: String!){
        login(email: $email, password: $password) {
            user{id}, token
        }
    }
`;



const withMutation = graphql(loginUser, {
    props: ({ mutate }) => ({
        logoutUser: input => {
            return mutate()},
    }),
});

const mapStateToProps = (state) => {
    //console.log(state.user);
    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
        token: state.user.token
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: ({ email, password }) => {
        //dispatch(loginUserRequest({ email }));

        ownProps.loginUser({ email:email, password:password })
            .then(({data}) => {
                const token = data.login.token;
                //console.log(data);
                //console.log(token);
                dispatch(setUserToken({token}));
                dispatch(loginUserSuccess({token}));
            }).catch((error) => {
            dispatch(loginUserError({
                error,
            }));
        });
    },
});


export default withMutation(connect(mapStateToProps, mapDispatchToProps)(LogoutForm));