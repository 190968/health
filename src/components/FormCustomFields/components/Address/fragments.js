import gql from "graphql-tag";

export const CountryInfoFragment = gql`
    fragment CountryInfo on Country {
        id
        name
        phoneCode
    }
`;
export const StateInfoFragment = gql`
    fragment StateInfo on State {
        id
        name
    }
`;
export const AddressInfoFragment = gql`
    fragment AddressInfo on Address {
        line1
        line2
        country {
            ...CountryInfo
        }
        state {
           ...StateInfo
        }
        city
        zipcode
    }
    ${CountryInfoFragment}
    ${StateInfoFragment}
`;

