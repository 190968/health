import gql from 'graphql-tag';
import { PlanElementPureFragment } from '../../routes/Plan/components/Plan/fragments';
import { AddressNoStreetFragment } from '../FormCustomFields/components/Address/fragments';

export const PlanFragment = gql`
    fragment Plan on Plan {
        id
        title
        description
        type
        thumb {
            small
            medium
            large
            wide
        }
    }
`;


export const PlanDetailsFragment = gql`
    fragment PlanDetails on Plan {
        privacy
        visibility
        categories {
            id
            name
            parentCategory {
                id
                name
                parentCategory {
                    id
                    name
                }
            }
        }
        planDetails {
            ribbon {
                id
                label
            }
            language
            languageId
            #screenshots

            isPaid
            price
            pricePromo
            promoStartDate
            promoEndDate

            disclaimer
            consentIsRequired
            location {
                ...AddressNoStreet
            }
            gender
            minAge
            maxAge
            adultsOnly
            outcome
            tags
            source
            associatedPlans {
                id
                name:title
            }
            audience
            requirements
            level
            icd10codes {
                id
                code
                name
            }
        }
    }
    ${AddressNoStreetFragment}
`;




