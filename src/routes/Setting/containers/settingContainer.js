/**
 * Created by Pavel on 06.12.2017.
 */
import { connect } from 'react-redux'
import { } from '../modules/setting'


import SettingForm from '../components/settingComponents'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const settingUser = gql`
   query getSetting{
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


const withMutation = graphql(settingUser);

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