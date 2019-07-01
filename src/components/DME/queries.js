import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { DmeReferralFragment } from './fragments';

export const GET_PATIENT_DME_REFERRALS_QUERY = gql`    
query GET_PATIENT_DME_REFERRALS ($userId:UID, $cursors:CursorInput)  {
    patient (id:$userId) {
        id
        getDmeReferrals (cursors: $cursors)  {
            edges {
                ...DmeReferral
            }
            totalCount
        }
    }
}
${DmeReferralFragment}
`;

const GET_PATIENT_DME_REFERRAL_QUERY = gql`    
query GET_PATIENT_DME_REFERRAL ($userId:UID, $id:UID!)  {
    patient (id:$userId) {
        id
        getDmeReferral (id: $id)  {
            ...DmeReferral
        }
    }
}
${DmeReferralFragment}
`;


export const withPatientDmeReferralsQuery = graphql(
    GET_PATIENT_DME_REFERRALS_QUERY,
    {
        // skip: (props) =>  {
        //     const {id} = props.plan || {};
        //     return !id;
        // },
        options: (ownProps) => {
            const { user } = ownProps;
            const { id } = user || {};
            return {
                variables: {
                    userId: id
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const { getDmeReferrals } = data.patient || {};
            const { edges, totalCount } = getDmeReferrals || {};
            return {
                dmeReferrals: edges,
                total: totalCount,
                loading: data.loading,
            }
        },
    }
);



export const withPatientDmeReferralQuery = graphql(
    GET_PATIENT_DME_REFERRAL_QUERY,
    {
        // skip: (props) =>  {
        //     const {id} = props.plan || {};
        //     return !id;
        // },
        options: (ownProps) => {
            const { user, dmeReferral } = ownProps;
            const { id:userId } = user || {};
            const {id} = dmeReferral || {};
            return {
                variables: {
                    userId,
                    id
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {dmeReferral:dmeReferralInit} = ownProps;
            const { dmeReferral=dmeReferralInit } = data.patient || {};
            return {
                dmeReferral,
                loading: data.loading,
            }
        },
    }
);