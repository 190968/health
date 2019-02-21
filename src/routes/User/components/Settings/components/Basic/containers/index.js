/**
 * Created by Pavel on 06.12.2017.
 */
import {connect} from 'react-redux'


import SettingForm from '../components'
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import {loadFullUser} from "../../../../../modules/user";
import { message } from 'antd';
import { UserSettingInfoFragment } from '../../../../../fragments';
import { withCurrentUser } from '../../../../../../../queries/user';
import { withLoadingButton } from '../../../../../../../components/Loading';
import { prepareAddressInput } from '../../../../../../../components/FormCustomFields/components/Address';
import { preparePhoneInput } from '../../../../../../../components/FormCustomFields/components/Phone';
//import { compose } from 'react-apollo';

const settingUser = gql`
   query getSettings {
    account
    {
      user {
         ...UserSettingInfo   
      }
    }
    
    staticContent {
        languages {
             value
             label
        }
        timezones {
            id
            name
            offset
        }
    }
    
}
${UserSettingInfoFragment}
`;
const settingUserMutate = gql`
 mutation settingUser($input:UserInput!){
        updateUser(input:$input) {
            ...UserSettingInfo
        }
    }
    ${UserSettingInfoFragment}
`;

const withQuery = graphql(settingUser,
    {
        props: ({ data}) => {
            if (!data.loading) {
                return {
                    account: data.account,
                    loading: data.loading,
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
                phone:preparePhoneInput(phone),
                gender,
                email,
                timezone,
                address: prepareAddressInput(address),
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