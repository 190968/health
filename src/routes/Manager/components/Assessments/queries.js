import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { UserAssessmentReportPureFragment, AssessmentFragment, UserAssessmentFragment, UserAssessmentPureFragment, UserAssessmentReportFragment } from "./fragments";
import { CohortPureFragment } from "../Cohorts/fragments";

const GET_PATIENT_ASSESSMENT_HISTORY_QUERY = gql`    
    query GET_PATIENT_ASSESSMENT_HISTORY($userId: UID!, $id: UID!) {
        patient(id: $userId) {
            id
            getAssessment (id: $id) {
                id
                getHistory {
                    totalCount
                    edges {
                        ...UserAssessmentReportPure
                    }
                }
            }
        }
    }
    ${UserAssessmentReportPureFragment}
`;

export const withUserAssessmentHistoryQuery = graphql(
    GET_PATIENT_ASSESSMENT_HISTORY_QUERY,
    {
        options: (ownProps) => {
            const {userAssessment} = ownProps;
            const {id} = userAssessment || {};
            return {
                variables: {
                    userId: ownProps.user.id,
                    id,
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {

            const {getAssessment} = data.patient || {};
            const {getHistory} = getAssessment || {};
            const {totalCount, edges} = getHistory || {};
            return {
                history: edges,
                total: totalCount,
                loading: data.loading,
            }
        },
    }
);


const GET_ASSESSMENT_QUERY = gql`    
    query GET_ASSESSMENT($id: UID!) {
        getAssessment (id: $id) {
            ...Assessment
        }
    }
    ${AssessmentFragment}
`;

export const withAssessmentQuery = graphql(
    GET_ASSESSMENT_QUERY,
    {
        skip: (props) =>  {
            const {id} = props.assessment || {};
            return !id;
        },
        options: (ownProps) => {
            const {assessment} = ownProps;
            const {id} = assessment || {};
            return {
                variables: {
                    id,
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {getAssessment} = data || {};
            return {
                assessment: getAssessment,
                loading: data.loading,
            }
        },
    }
);



const GET_ASSESSMENT_COHORTS_QUERY = gql`    
    query GET_ASSESSMENT_COHORTS($id: UID!) {
        getAssessment (id: $id) {
            id,
            getCohorts {
                ...CohortPure
            }
        }
    }
    ${CohortPureFragment}
`;
export const withAssessmentCohortsQuery = graphql(
    GET_ASSESSMENT_COHORTS_QUERY,
    {
        options: (ownProps) => {
            const {assessment} = ownProps;
            const {id} = assessment || {};
            return {
                variables: {
                    id,
                },
                // fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {
            const {assessment} = ownProps;
            const {getAssessment} = data || {};
            return {
                assessment: {...assessment, getAssessment},
                loading: data.loading,
            }
        },
    }
);





const GET_USER_ASSESSMENT_QUERY = gql`    
    query GET_USER_ASSESSMENT($id: UID!, $date: Date) {
        getUserAssessment (id: $id) {
            ...UserAssessmentPure
            getLatestReport (date: $date) {
                ...UserAssessmentReport
            }
        }
    }
    ${UserAssessmentPureFragment}
    ${UserAssessmentReportFragment}
`;

export const withUserAssessmentQuery = graphql(
    GET_USER_ASSESSMENT_QUERY,
    {
        options: (ownProps) => {
            const {userAssessment, date} = ownProps;
            const {id} = userAssessment || {};
            return {
                variables: {
                    id,
                    date,
                    // getReport:false
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {

            const {getUserAssessment} = data || {};
            return {
                userAssessment: getUserAssessment,
                loading: data.loading,
            }
        },
    }
);