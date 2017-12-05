import { connect } from 'react-redux'
import { logoutUserRequest, logoutUserSuccess,logoutUserError} from '../modules/logout'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import LogoutForm from '../components/logoutComponent'

const logoutUser = gql`
mutation logout{

 logout(token:"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjI0MDM4LCJleHBpcmVzIjoxNTEyNDIyNTI4fQ.OdTjMrr1GMoF5yJAng1ROEIf4NzPm_waZC80qaijFPY")
}
`;



const withMutation = graphql(logoutUser, {
    props: ({ mutate }) => ({
        logoutUser: input => {
            return mutate({
                variables: {  },
            })
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
    onSubmit: () => {
        ownProps.logoutUser()
            .then(({data}) => {
                console.log(data+'qwerty');
                window.location.href = "/";
            }).catch((error) => {
            console.log('error');
            dispatch(logoutUserError({
                error,
            }));
        });
    },
});


export default withMutation(connect(mapStateToProps, mapDispatchToProps)(LogoutForm));