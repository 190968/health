/**
 * Created by Pavel on 06.12.2017.
 */
import {connect} from 'react-redux'


import SettingForm from '../components'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {loadFullUser} from "../../../../../modules/user";
import { message } from 'antd';
import { UserInfoFragment } from '../../../../../fragments';
import { withCurrentUser } from '../../../../../../../queries/user';
import { withLoadingButton } from '../../../../../../../components/Loading';
//import { compose } from 'react-apollo';

const settingUser = gql`
   query getSettings {
    account
    {
      user {
          ...UserInfo
          possibleTitles
          title,
          firstName,
          middleName,
          lastName,
          birthday,
          gender,
          phone {
          code
          number},
          language,
          timezone
          address {
            line1
            line2
            country
            state 
            city
            zipcode
          }
          phoneConfirmed,
          dateFormat
          email      
      }
    }
    
    staticContent {
        languages {
             value
             label
        }
        countries {
            id
            name
            phoneCode
        }
        states {
            id
            name
        }
        timezones {
            id
            name
            offset
        }
    }
    
}
${UserInfoFragment}
`;
const settingUserMutate = gql`
 mutation settingUser($input:UserInput!){
        updateUser(input:$input) {
            ...UserInfo
          title,
          firstName,
          middleName,
          lastName,
          birthday,
          gender,
          phone {code, number},
          language,
          timezone
          address {
            line1
            line2
            country
            state 
            city
            zipcode
          }
          phoneConfirmed,
          dateFormat
          email
        }
    }
    ${UserInfoFragment}
`;

const withQuery = graphql(settingUser,
    {
        props: ({ data}) => {
            if (!data.loading) {
                return {
                    account: data.account,
                    loading: data.loading,
                    countries: data.staticContent.countries,
                    states: data.staticContent.states,
                    languages: data.staticContent.languages,
                    timezones: data.staticContent.timezones
                }

            } else {
                return {loading: data.loading}
            }
        },
    }
)(SettingForm);

const withMutation = graphql(settingUserMutate, {
    props: ({ownProps, mutate}) => ({
        updateInfo: (values) => {
            const {title,firstName, lastName, middleName, birthday, phone, gender, email, timezone, address, language, dateFormat} = values;

            const input = {
                title,
                firstName,
                lastName,
                middleName,
                birthday:birthday.format("YYYY-MM-DD"),
                phone,
                gender,
                email,
                timezone,
                address,
                language,
                dateFormat
    
            };

            ownProps.setLoadingButton(true);
            return mutate({
                variables: {input},
            })
        },
    }),
});

export default withLoadingButton(withCurrentUser(withMutation(withQuery)));