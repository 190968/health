import gql from 'graphql-tag';
import { AddressInfoFragment } from '../../../../components/FormCustomFields/components/Address/fragments';

export const ProgramFragment = gql`
    fragment Program on NetworkProgram {
        id
        title
        programType
        typeText
        categories{
            id
            name
            getSubCategories {
                id
                name
            }
        }
        address {
            ...AddressInfo
        }
        description
        phone
        fax
        website
        businessHours
        logo
    }
    ${AddressInfoFragment}
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