
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
// import { ifModuleExists } from '../../../../../components/App/app-context';




// // Query for grabbing everything for the dashboard items
// export const MedicationPlan11_QUERY = gql`
//     query GET_MEDICATION_PLAN ($user_id: UID!, $date: Date)  {
//             medicationPlan (userId: $user_id) {
//                 id
//                 upid
//                 isPersonal
//                 progress(date: $date) @connection(key: "medProgress", filter: ["date"]) 
//                 ...MedicationsByType
//                 textBefore
//                 textAfter
//         }
//     }
//     ${MedicationsByType}
//     ${MedicationCardInfo}
// `;

// const MedicationPlanBodyWithQuery = graphql(
//     MedicationPlan11_QUERY,
//     {
//         props: ({ data }) => {
//             if (!data.loading) {

//                 return {
//                     info: data.medicationPlan,
//                     loading: data.loading,

//                     loadDate(date, user_id) {

//                         return data.fetchMore({
//                             // query: ... (you can specify a different query. FEED_QUERY is used by default)
//                             variables: {
//                                 // We are able to figure out which offset to use because it matches
//                                 // the feed length, but we could also use state, or the previous
//                                 // variables to calculate this (see the cursor example below)
//                                 date: date,
//                                 user_id: user_id,
//                             },
//                             updateQuery: (previousResult, {fetchMoreResult}) => {
//                                 //return {medicationPlan:{id:29}};

//                                 //fetchMoreResult.date = date;

//                                 if (!fetchMoreResult) { return previousResult; }
//                                 return fetchMoreResult;
//                             },
//                             fetchPolicy: 'cache-first'//'cache-only'//'cache-and-network'
//                         });
//                     }
//                 }

//             } else {

//                 return {loading: data.loading}
//             }
//         },
//         options: (ownProps) => {
//             const userId = ownProps.user ? ownProps.user.id : ownProps.user_id;
//             return {
//                 skip: !ownProps.ready,
//                 variables: {
//                     user_id: userId,
//                     date: ownProps.date,
//                 },
//                 notifyOnNetworkStatusChange: true// adding loading placeholder
//                 //fetchPolicy: 'cache-and-network'//'cache-only'//'cache-and-network'
//             }
//         },
//     }
// )(MedicationPlanBody);

// export default compose(
//     ifModuleExists('meds', 'patient_meds', true)
// )(MedicationPlanBodyWithQuery);