import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { CohortFragment, CohortPureFragment, CohortUsersFragment, UserCohortPureFragment } from "./fragments";
import { UserInfoFragment } from "../../../User/fragments";

export const GET_COHORTS_QUERY = gql`    
    query GET_COHORTS ($search: String) {
        management {
            getCohorts (search: $search) {
                edges {
                    ...CohortPure  
                }
            }
        }
    }
    ${CohortPureFragment}
`;

export const withCohortsQuery = graphql(
    GET_COHORTS_QUERY,
    {
        options: (ownProps) => {
            // const {userAssessment} = ownProps;
            // const {id} = userAssessment || {};
            return {
                variables: {
                    // userId: ownProps.user.id,
                    // id,
                },
                fetchPolicy: 'network-only',
            }
        },
        props: ({ ownProps, data }) => {

            const {getCohorts} = data.management || {};
            const {totalCount, edges} = getCohorts || {};
            return {
                cohorts: edges,
                total: totalCount,
                loading: data.loading,
                refetch: data.refetch,
                doSearch(search) {
                    return data.refetch({
                        search: search
                    });
                }
            }
        },
    }
);


const GET_COHORT_QUERY = gql`    
    query GET_COHORT ($id: UID!) {
        management {
            getCohort (id: $id) {
                ...Cohort
                createdBy {
                    ...UserInfo
                }   
            }
        }
    }
    ${CohortFragment}
    ${UserInfoFragment}
`;

export const withCohortQuery = graphql(
    GET_COHORT_QUERY,
    {
        options: (ownProps) => {
            // const {userAssessment} = ;
            // get from url
            // console.log(ownProps);
            const {params} = ownProps.match || {};
            const {id:idFromUrl} = params || {};
            // console.log(ownProps);
            const {id=idFromUrl} = ownProps.cohort || {};
            return {
                variables: {
                    // userId: ownProps.user.id,
                     id,
                },
            }
        },
        props: ({ ownProps, data }) => {
            // console.log(ownProps);
            // console.log(data);
            const {getCohort} = data.management || {};
            const {getCohortManagers} = getCohort || {};
            const {edges=[]} = getCohortManagers || {};
            return {
                cohort: getCohort,
                managers: edges,
                loading: data.loading,
                refetch: data.refetch
            }
        },
    }
);



const GET_COHORT_USERS_QUERY = gql`    
    query GET_COHORT_USERS ($id: UID!) {
        management {
            getCohort (id: $id) {
                id
                ...CohortUsers 
            }
        }
    }
    ${CohortUsersFragment}
`;

export const withCohortUsersQuery = graphql(
    GET_COHORT_USERS_QUERY,
    {
        options: (ownProps) => {
            console.log(ownProps);
            const {id} = ownProps.cohort || {};
            return {
                variables: {
                     id,
                },
            }
        },
        props: ({ ownProps, data }) => {
            // const {cohort} = data.cohort || {};
            // const {getCohortUsers} = cohort || {};
            const {getCohort} = data.management || {};
            const {getCohortUsers} = getCohort || {};
            const {totalCount, edges=[]} = getCohortUsers || {};
            return {
                cohortUsers: edges,//[...cohort.getCohortUsers.edges, ...edges],
                total:totalCount,
                loading: data.loading,
                refetch: data.refetch
            }
        },
    }
);

const GET_COHORT_TEAM_QUERY = gql`    
    query GET_COHORT_TEAM ($id: UID!) {
        management {
            getCohort (id: $id) {
                id
                getCohortTeam {
                    edges {
                        ...UserCohortPure
                        user {
                            ...UserInfo
                        }
                    }
                    totalCount
                }
            }
        }
    }
    ${UserCohortPureFragment}
    ${UserInfoFragment}
`;

export const withCohortTeamQuery = graphql(
    GET_COHORT_TEAM_QUERY,
    {
        options: (ownProps) => {
            const {id} = ownProps.cohort || {};
            return {
                variables: {
                     id,
                },
            }
        },
        props: ({ ownProps, data }) => {
            // const {cohort} = data.cohort || {};
            // const {getCohortUsers} = cohort || {};
            const {getCohort} = data.management || {};
            const {getCohortTeam} = getCohort || {};
            const {totalCount, edges=[]} = getCohortTeam || {};
            return {
                cohortTeam: edges,//[...cohort.getCohortUsers.edges, ...edges],
                total:totalCount,
                loading: data.loading,
                refetch: data.refetch
            }
        },
    }
);

