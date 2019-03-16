// import BuildBody from '../components/Pathway/BuildBody';
import React from 'react';
import PathwayElements from '../../../../Plan/components/PlanLayout/components/PathwayBody';
import {PlanElementPureFragment} from "../../../../Plan/components/Plan/fragments";

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose, defaultProps } from 'recompose';



const PB_PLAN_BODY_QUERY = gql`
    query PB_PATHWAY_BODY ($id: UID!) {
        getPathway (id: $id) {
            id
            title
            description
            elements {
                ...PlanElement,
            }
        }
    }
    ${PlanElementPureFragment}
`;


// 1- add queries:
const withQuery = graphql(
    PB_PLAN_BODY_QUERY,
    {
        options: (ownProps) => {
            return {
            variables: {
                id: ownProps.plan.id,
            }}
        },
        props: ({ ownProps, data }) => {
            const plan = data.getPathway || {};
            const {elements=[]} = plan || {};
            return {
                loading: data.loading,
                plan: plan,
                elements: elements,
            }

        },
    }
);



const enhance = compose(
    withQuery,
    defaultProps({
        isBuilderMode:true,
        mode: 'pathway'
    })
)

export default enhance(PathwayElements);