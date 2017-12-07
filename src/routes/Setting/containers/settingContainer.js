/**
 * Created by Pavel on 06.12.2017.
 */
import { connect } from 'react-redux'
import { } from '../modules/setting'


import SettingForm from '../components/settingComponents'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

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


const withMutation = graphql(settingUser,
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

const mapStateToProps = (state) => {

    return {
        //account:withMutation.data
    };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    // onSubmit: (props) => {
    //     const{first_name,last_name,birthday,gender,email, password,password_repeat,prefix,phone} = props;
    //
    //     ownProps.settingUser()
    //         .then(({data}) => {
    //
    //         }).catch((error) => {
    //         console.log(error);
    //     });
    // },
});


export default withMutation(connect(mapStateToProps, mapDispatchToProps)(SettingForm));
//const ProfileWithData = graphql(settingUser)(SettingForm);