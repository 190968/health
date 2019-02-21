import gql from 'graphql-tag';

export const BrahmFragment = gql`
    fragment Brahm on Brahm {
        id
    }
`;

export const BrahmFullFragment = gql`
    fragment BrahmFull on Brahm {
        ...Brahm
    }
    ${ BrahmFragment }
`;

export const BrahmManageFragment = gql`
    fragment ProviderManage on Provider {
        ...Brahm
    }
    ${ BrahmFragment }
`;