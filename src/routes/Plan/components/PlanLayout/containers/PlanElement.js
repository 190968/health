import React from 'react'

import PlanElement from '../components/PlanElement'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';


const reportOnField = gql`
    mutation planFieldReport($id: ID!, $date: Date!, $value: [String], $upid: ID!) {
        planElementReport(id:$id, upid: $upid, date: $date, value: $value)
    }
`;



export const PlanElementWithMutation = graphql(reportOnField, {
    props: ({ mutate }) => ({
        makeReport: (upid, id, date, value) => {
            return mutate({
                variables: { upid:upid, id: id, date: date, value:value},
            })
        },

    }),
});


export default PlanElementWithMutation(PlanElement);
