import gql from "graphql-tag";
import { CountryInfoFragment } from "../Address/fragments";

export const PhoneInfoFragment = gql`
    fragment PhoneInfo on Phone {
        country {
            ...CountryInfo
        }
        number
        phoneNumberFormatted
        type
    }
    ${CountryInfoFragment}
`;