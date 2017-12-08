/**
 * Created by Pavel on 08.12.2017.
 */
import { connect } from 'react-redux'
import { } from '../modules/setting'


import PasswordForm from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const updatePassword=gql`
mutation updatePassword($current_password:String,$password:String,$password_repeat:String) {
       updatePassword(current_password:$current_password,
                      password:$password,
                      password_repeat:$password_repeat)

    }
`;

const withMutation = graphql(updatePassword, {
    props: ({ mutate }) => ({
        updatePassword: input => {
            return mutate({
                 variables:  {current_password: input.current_password, password: input.password,password_repeat:input.password_repeat} ,
            })
        },
    }),
});

const mapStateToProps = (state) => {


    return {
        // view store:
        //currentView:  state.views.currentView,
        // userAuth:
       // token: state.user.token
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props) => {
        const{current_password, password,password_repeat} = props;
        ownProps.updatePassword({current_password:current_password, password:password,password_repeat:password_repeat})
            .then(({data}) => {
               console.log(data);
            }).catch((error) => {
            console.log(error);
        });
    },
});

export default withMutation(connect(mapStateToProps, mapDispatchToProps)(PasswordForm));
