import gql from 'graphql-tag';

export const CancerFragment = gql`
    fragment Cancer on Cancer {
        id
        title
        code
        createdOn
    }
`;

export const CancerFullFragment = gql`
    fragment CancerFull on Cancer {
        ...Cancer
    }
    ${ CancerFragment }
`;

export const CancerManageFragment = gql`
    fragment CancerManage on Cancer {
        ...Cancer
        stage {
            id
            title
            letters
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
        chemotherapies {
            id
            title
        }
    }
    ${ CancerFragment }
`;