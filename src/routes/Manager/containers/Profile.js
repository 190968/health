import Profile from '../components/Profile';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {CancerFragment} from "../components/Cancers/containers/CancerManager";

const GET_PROFILE  = gql`
 query GET_PROFILE($user_id:UID) {
  patient(id: $user_id) {
    id
    fullName
    thumbs {
      original
      small
      large
      medium
      wide
    }
    gender
    genderText
     age
     addressText
     phoneFormatted
     birthday
     email
     getUserNetwork {
        id
        joinedDate
        lastLoginDate
     }
     
     getAdherence {
        medications {
            level
            color
            description
        }
        total {
            level
            color
            description
        }
     }
     
     
     getInsurance {
        memberId
        groupNumber
        payer {
            id
            name
        }
     }
    
  }
}


`;
// health {
//     getCurrentCancers {
//         id,
//             title,
//             code
//     }
//     getCurrentStage {
//
//     }
// }

const withQuery = graphql(GET_PROFILE, {
    options: (ownProps) => {
        return{
            variables: {
                user_id:ownProps.match.params.id
            }
        }
    },
    props: ({ data }) => {
        if (!data.loading) {
            return {
                user: data.patient,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});


export default withQuery(Profile);