import gql from 'graphql-tag';

export const CancerStageFragment = gql`
    fragment CancerStage on CancerStage {
        id
        title
        letters
        createdOn
    }
`;

export const CancerStageFullFragment = gql`
    fragment CancerStageFull on CancerStage {
        ...CancerStage
    }
    ${ CancerStageFragment }
`;

export const CancerStageManageFragment = gql`
    fragment CancerStageManage on CancerStage {
        ...CancerStage
        rules {
            id
            stage
            options {
                id
                letter
                name
            }
        }
    }
    ${ CancerStageFragment }
`;