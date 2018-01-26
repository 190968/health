/**
 * Created by Pavel on 06.12.2017.
 */
import {connect} from 'react-redux'
import {} from '../modules/setting'


import SettingForm from '../components'
import {graphql} from 'react-apollo';
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
          firstName,
          middleName,
          lastName,
          birthday,
          gender,
          phone,
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
`;
const settingUserMutate = gql`
 mutation settingUser($input:UserInput!){
        updateUser(input:$input) {
          id,
          title,
          firstName,
          middleName,
          lastName,
          birthday,
          gender,
          phone,
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
`;

const withQuery = graphql(settingUser,
    {
        props: ({ownProps, data}) => {
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
    props: ({mutate}) => ({
        updateInfo: input => {
            return mutate({
                variables: {input},
            })
        },
    }),
});


const mapStateToProps = (state) => {

    return {};
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    onSubmit: (values) => {
        console.log(values);

        const {title,firstName, lastName, middleName, birthday, prefix, phone, gender, email, timezone, address, language, dateFormat} = values;

        const input = {
            title,
            firstName,
            lastName,
            middleName,
            birthday:birthday.format("YYYY-MM-DD"),
            phone: [prefix, phone],
            gender,
            email,
            timezone,
            address,
            language,
            dateFormat

        };
        ownProps.updateInfo(input).then(({data}) => {
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