import gql from 'graphql-tag';

export const ProgramFragment = gql`
    fragment Program on NetworkProgram {
        id
        title
        typeText
        categories{
            id
            name
        }
        description
        phone
        fax
        website
        bussinessHours
        
    }
`;

export const ProgramFullFragment = gql`
    fragment ProgramFull on NetworkProgram {
        ...Program
        getReviews
        getReferralsCount
    }
    ${ ProgramFragment }
`;

export const ProgramManageFragment = gql`
    fragment ProgramManage on NetworkProgram {
        ...Program
    }
    ${ ProgramFragment }
`;