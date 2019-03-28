import gql from 'graphql-tag';

export const ChemotherapyFragment = gql`
    fragment Chemotherapy on Chemotherapy {
        id
        title
        createdOn
    }
`;

export const ChemotherapyFullFragment = gql`
    fragment ChemotherapyFull on Chemotherapy {
        ...Chemotherapy
    }
    ${ ChemotherapyFragment }
`;

export const ChemotherapyManageFragment = gql`
    fragment ChemotherapyManage on Chemotherapy {
        ...Chemotherapy
    }
    ${ ChemotherapyFragment }
`;