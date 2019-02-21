import GeneralInfo from '../components/GeneralInfo';
import {compose} from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { PhoneInfoFragment } from '../../../../../../../components/FormCustomFields/components/Phone/fragments';
import { AddressInfoFragment } from '../../../../../../../components/FormCustomFields/components/Address/fragments';

export const GET_PROFILE_DETAILS_QUERY = gql`
    query GET_PROFILE_FORM ($userId: UID!, $useReports: Boolean!) {
    management {
      getProfileForm {
        id
        label
        fields {
          id
          label
          type
          fieldCode
          useValueIdToReport
          isMandatory
          options {
            id
            label
            key
          }

          getChildren {
            id
            label
            type
            fieldCode
            useValueIdToReport
            isMandatory
            options {
              id
              key
              label
            }
          }
          reports (userId:$userId)  @include(if: $useReports) {
              id
              valueId
              value 
              valueObject {
                ...on Address {
                  ...AddressInfo
                }
                ...on Phone {
                  ...PhoneInfo
                }
              }
              fieldCode
          }
        }
      }
    }
  }
  ${PhoneInfoFragment}
  ${AddressInfoFragment}
`;

const withQuery = graphql(GET_PROFILE_DETAILS_QUERY, {
    options: (ownProps) => {
      const {user={}} = ownProps;
      const {id=''} = user;
      return {
          variables: {
              userId: id || '',
              useReports: id !== ''
          },
          fetchPolicy: 'network-only'
      }
    },
    props: ({ ownProps, data }) => {
        const { management = {} } = data;
        const { getProfileForm = [] } = management || {};
        return { loading: data.loading, getProfileForm };
    },
});

// const withQuery = graphql(GET_USER_DETAILS_QUERY, {
//     options: (ownProps) => {
//         return{
//             variables: {
//                 user_id:ownProps.user.id
//             }
//         }
//     },
//     props: ({ data }) => {

//         const {patient={}} = data;

//         return {loading: data.loading, user:patient }
//     },
// });



const enhance = compose(
    withQuery
);


export default enhance(GeneralInfo);