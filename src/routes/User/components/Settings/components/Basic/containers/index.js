/**
 * Created by Pavel on 06.12.2017.
 */
import { connect } from 'react-redux'
import { } from '../modules/setting'


import SettingForm from '../components'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
//import { compose } from 'react-apollo';

const settingUser = gql`
   query getSettings {
    account
    {
      user {
          possibleTitles
        id,
          title,
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
const settingUserMutate=gql`
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
)(SettingForm);

const withMutation = graphql(settingUserMutate, {
    props: ({ mutate }) => ({
        updateInfo: input => {
            return mutate({
                variables: {input: {user:input}},
            })},
    }),
});




const mapStateToProps = (state) => {

    return {

    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (values) => {
       //const{first_name,last_name,birthday,gender,email,prefix,phone} = props;


        //

        values.birthday = values.birthday.format("YYYY-MM-DD")
        values.phone = [values.prefix, values.phone];
        delete values.prefix;
        //console.log(birthday);
        //console.log(client);
        //console.log(settingUserMutate);


        console.log(values);
        ownProps.updateInfo(values).then(({data}) => {
            console.log("----settings----");
            console.log(data);
        })

        /*
        console.log(ownProps);
        ownProps.settingUserMutate({user:{first_name:first_name,last_name:last_name,birthday:birthday,gender:gender, email:email, password:password,phone:[prefix,phone] }})
            .then(({data}) => {
                console.log("----settings----");
                console.log(data);
            }).catch((error) => {
            console.log(error);
        });*/
    },
});

//export  withMutation(connect(mapStateToProps, mapDispatchToProps)(SettingForm));
//export default compose(
  //  connect(mapStateToProps, mapDispatchToProps),withMutation,withQuery)((SettingForm));

export default withMutation(connect(
    mapStateToProps,
    mapDispatchToProps
)(withQuery));