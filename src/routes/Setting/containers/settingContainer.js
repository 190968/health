/**
 * Created by Pavel on 06.12.2017.
 */
import { connect } from 'react-redux'
import { } from '../modules/setting'


import SettingForm from '../components/settingComponents'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'react-apollo';

const settingUser = gql`
   query getSettings {
    account
    {
      user {
        id,
        first_name,
        middle_name,
        last_name,
        birthday,
        gender,
        phone,
        language,
        email      
      }
    }
}
`;
const settingGetUser=gql`
 mutation settingUser( $input:AccountInput!){
        account(input:$input) {
      user {
        first_name
      }
        }
    }
`;

const withQuery = graphql(settingUser,
    {
        props: ({ ownProps, data }) => {
            //console.log(data.loading);
            if (!data.loading) {
                return {
                    account: data.account,
                    loading: data.loading
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
);
const withMutation = graphql(settingGetUser, {
    props: ({ mutate }) => ({
        settingGetUser: input => {
            return mutate({
                variables: {input:{user:{first_name:input.first_name,last_name:input.last_name,birthday:input.birthday.format("YYYY-MM -DD"),gender:input.gender, email: input.email, password: input.password,phone: input.phone,prefix:input.prefix }}},
            })},
    }),
});




const mapStateToProps = (state) => {

    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (props) => {
        const{first_name,last_name,birthday,gender,email, password,prefix,phone} = props;

        ownProps.settingGetUser({user:{first_name:first_name,last_name:last_name,birthday:birthday,gender:gender, email:email, password:password,phone:[prefix,phone] }})
            .then(({data}) => {
                console.log("----settings----");
                console.log(data);
            }).catch((error) => {
            console.log(error);
        });
    },
});

//export  withMutation(connect(mapStateToProps, mapDispatchToProps)(SettingForm));
export default compose(connect(mapStateToProps, mapDispatchToProps),withMutation,withQuery)((SettingForm));




//const ProfileWithData = graphql(settingUser)(SettingForm);