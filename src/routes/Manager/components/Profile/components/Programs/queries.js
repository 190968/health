import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { AddressInfoFragment } from "../../../../../../components/FormCustomFields/components/Address/fragments";
import { UserInfoFragment } from "../../../../../User/fragments";

export const GET_NETWORK_PROGRAMS_QUERY  = gql`
query GET_PROGRAMS {
 management {
    getPrograms {
        edges {
           id
           name
           icon
           typeText
           categories {
               id
               name
           }
       }
       totalCount
    }
 }
}
`;

export const withNetworkProgramsQuery = graphql(GET_NETWORK_PROGRAMS_QUERY, {
   options: (ownProps) => {
       return{
           variables: {}
       }
   },
   props: ({ data }) => {

       const {management, refetch} = data;
       const {getPrograms} = management || {};
       const {edges=[], totalCount=0} = getPrograms || {};

       return {loading: data.loading, programs:edges, total: totalCount, refetch }
   },
});


export const NETWORK_PROGRAM_QUERY = gql`
query GET_PROGRAM ($id: UID!, $userId: UID!) {
 management {
    getProgram (id:$id) {
        id
        name
        description
        logo
        icon
        typeText
        categories {
            id
            name
        }
        phone
        fax
        website
        address {
            ...AddressInfo
        }
        bussinessHours
        email
        icon
        #filters
        communities {
            id
            label
        }
        languages {
            id
            label
        }
        genders{
            id
            label
        }
        locations{
            id
            label
        }
        getPatientReferral (userId:$userId) {
            id
            isApproved
        }
    }
 }
}
${AddressInfoFragment}
`;

export const withNetworkProgramQuery = graphql(NETWORK_PROGRAM_QUERY, {
    options: (ownProps) => {
        const {program, patient} = ownProps;
        const {id:userId=''} = patient || {};
        return{
            variables: {id:program.id, userId}
        }
    },
    props: ({ data }) => {
 
        const {management} = data;
        const {getProgram} = management || {};
 
        return {loading: data.loading, program:getProgram }
    },
 });


export const GET_PATIENT_PROGRAMS_QUERY  = gql`
query GET_USER_PROGRAMS($user_id:UID, $status: GeneralStatusEnum) {
 patient(id: $user_id) {
    id
    getPrograms (status: $status) {
        edges {
           id
           program {
               id
               name
               icon
               categories {
                   id
                   name
               }
           }
           joinedDate
           invitedDate
           invitedBy {
               ...UserInfo
           }
           archivedDate
           archivedBy {
                ...UserInfo
           }
       }
       totalCount
    }
 }
}
${UserInfoFragment}
`;

 