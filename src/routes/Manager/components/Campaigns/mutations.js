
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { CampaignPureFragment } from './fragments';
import {branch, compose} from 'recompose';
import { withCampaignQuery } from './queries';

const DELETE_CAMPAIGN_MUTATION = gql`
    mutation DELETE_CAMPAIGN($id: UID!){
        deleteCampaign(id:$id)
    }
`;
const CREATE_CAMPAIGN_MUTATION = gql`
    mutation CREATE_CAMPAIGN($input: CampaignInput!){
        createCampaign(input:$input) {
            ...CampaignPure
        }
    }
    ${ CampaignPureFragment }
`;
const UPDATE_CAMPAIGN_MUTATION = gql`
    mutation UPDATE_CAMPAIGN($id: UID!, $input: CampaignInput!){
        updateCampaign(id:$id, input: $input) {
            ...CampaignPure
        }
    }
    ${ CampaignPureFragment }
`;

export const withDeleteCampaignMutation = graphql(DELETE_CAMPAIGN_MUTATION, {
    props: ({ownProps:{campaign}, mutate }) => ({
        deleteCampaign: () => {
            return mutate({variables: { id: campaign.id}});
        },
    }),
});

const withCreateCampaignMutation = graphql(CREATE_CAMPAIGN_MUTATION, {
    props: ({ownProps, mutate }) => ({
        createCampaign: (input) => {
            return mutate({variables: { input }});
        },
    }),
});

const withUpdateCampaignMutation = graphql(UPDATE_CAMPAIGN_MUTATION, {
    props: ({ownProps:{campaign}, mutate }) => ({
        updateCampaign: (input) => {
            return mutate({variables: { id: campaign.id, input}});
        },
    }),
});

const withUpdateCampaignMutationQuery = compose(
    withCampaignQuery,
    withUpdateCampaignMutation
);
export const withCreateOrUpdateCampaign = branch(props => props.campaign, withUpdateCampaignMutationQuery, withCreateCampaignMutation);