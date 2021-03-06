import gql from 'graphql-tag';
import { UserInfoFragment } from '../../../User/fragments';
import { TreatmentElementFragment, TreatmentInfoFragment } from '../../../Health/components/fragments';
import { BrahmsFragment } from '../../../../components/Brahms/fragments';
import { FootnoteFragment } from '../../../../components/Footnote/fragments';

export const PlanCardFragment = gql`
        fragment PlanCardInfo on Plan {
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

export const UserPlanPureFragment = gql`
    fragment UserPlanPure on UserPlan {
            id
            approved
            canChangeSchedule
            canReport
            canEdit
            startDate
            endDate
            dows
            lastUsedDate
    }
        
`;

export const UserPlanOnlyUserFragment = gql`
 fragment UserPlanOnlyUser on UserPlan {
        ...UserPlanPure
        user {
            ...UserInfo
        }
             
    }
    ${UserPlanPureFragment}   
    ${UserInfoFragment}
`;


export const UserPlanOnlyFragment = gql`
 fragment UserPlanOnly on UserPlan {
        ...UserPlanPure
        plan {
                ...PlanCardInfo
            }
    }
    ${UserPlanPureFragment}   
    ${PlanCardFragment}
`;


export const UserPlanFragment = gql`
    fragment UserPlanInfo on UserPlan {
            ...UserPlanPure
            plan {
                ...PlanCardInfo
            }
            user {
                ...UserInfo
            }
    }
    ${UserPlanPureFragment}   
    ${PlanCardFragment}
    ${UserInfoFragment}
`;

export const PathwayCardFragment = gql`
        fragment PathwayCardInfo on Pathway {
            id
            title
            description
            version
            versionNote
            showByElement
        }
`;


export const FieldReportFragment = gql`
    fragment FieldReportInfo on FieldReport {
        id
        fieldId
        fieldType
        value
        optionId
    }
`;




export const ElementLinkFragment = gql`
    fragment LinkElement on PlanElementLink {
        id
        label
        url
        description

}
`;

export const ElementTextFragment = gql`
    fragment TextElement on PlanElementText {
        id
        text
        tipType
        iconAlign
        color
        icon {
            id
            url
        }
    }
`;

export const ElementClinicalNoteFragment = gql`
    fragment ClinicalNoteElement on PlanElementClinicalNote {
        id
        title
        note
        attachments {
            id
            type
            label
            url
            size
        }
        footnote {
            ...Footnote
        }
    }
    ${FootnoteFragment}
`;

export const ElementOptionsFragment = gql`
    fragment OptionsElement on PlanElementChecklist {
        id
        label
        isVertical
        options:optionsWithFootnote {
            id
            label
            footnote {
                ...Footnote
            }
        }
        footnote {
            ...Footnote
        }
    }
    ${FootnoteFragment}
`;

export const ElementScaleFragment = gql`
    fragment ScaleElement on PlanElementScale {
          id
          label
          scaleId
          options {
            id
            label
          }
    }
`;

export const ElementMediaFragment = gql`
    fragment MediaElement on PlanElementMedia {
        id
        label
        description
        mediaType:type
        source
        url
        urlConverted
        embedHtml
        filename
        filesize
    }
`;

export const ElementApFragment = gql`
    fragment ApPlanElement on Plan {
        ...PlanCardInfo
    }
    ${PlanCardFragment}
`;



export const TreatmentBlockElementFragment = gql`
    fragment TreatmentBlockElement on TreatmentBlockElement {
        ... on PlanElementText {
          ...TextElement
        }
        ... on PlanElementLink {
          ...LinkElement
        }
    }
     ${ElementLinkFragment}
     ${ElementTextFragment}
`;


export const ElementTreatmentFragment = gql`
    fragment TreatmentPlanElement on Treatment {
          id
          title
          elements {
                ...TreatmentElementInfo
          }
    }
   ${TreatmentElementFragment}
`;



export const ElementTrackerReportFragment = gql`
    fragment TrackerReportFields on TrackerReport {
            id
            time,
            date
            reportKey
            columnId
            isCritical
            value
            valueFormatted
            comments
    }
`;




export const ElementTrackerFragment = gql`
    fragment TrackerElement on Tracker {
        id
        label
        textBefore
        description
        graph
        allowMultipleReports
        parentId
        units {
            id
            name
        }
        inputMask
       
        targets {
            id
            title
            value
        }
        
        criticalRange {
            min
            max
        }
        normalRange {
            min
            max
        }
        isGlobal
        isCritical
    }
`;
/*
 targets (date:$date) @include(if: $date) {
            id
            title
            value
        }
 */

export const ElementCalculatorFragment = gql`
    fragment CalculatorElement on PlanElementCalculator {
        id
        title
        formulaString
        tokens {
           ...TrackerElement 
           getLastReport {
                ...TrackerReportFields
           }
        }
        calculatorCustomFields {
            id
            label
        }
    }
    ${ElementTrackerReportFragment}
    ${ElementTrackerFragment}
`;



export const ElementAliasFragment = gql`
    fragment AliasPlanElement on PlanElementAlias {
        id
        label
        btnLabel
        hasElement
    }
`;
/*
 ${TreatmentBlockElementFragment}
element {
                    ...TreatmentBlockElement
                }
 */


export const PlanElementReportFragment = gql`
        fragment PlanElementReport on PlanBodyElementReport {
            id
            value
            valueId
            date
            attachments {
                id
                type
                label
                url
                size
            }
        }
`;

export const PlanElementFragment = gql`
            fragment PlanElementWithReports on PlanBodyElement {
            id
            itemId
            itemType
            type
            typeText
            isAnswerBasedElement
            hasChildren
            reports (date: $date) {
                ...PlanElementReport
            }
            footnote
            reference
            itemInfo {
               
                ... on PlanElementChecklist {
                  ...OptionsElement
                }
                ... on PlanElementScale {
                  ...ScaleElement
                }
                
                ... on PlanElementTextInput {
                  id
                  label
                  isLong
                  isDate
                  isTime
                }
                
                ... on PlanElementText {
                  ...TextElement
                }
                  ... on PlanElementClinicalNote {
                  ...ClinicalNoteElement
                }
                
                ... on PlanElementLink {
                  ...LinkElement
                }
                
                 ... on Tracker {
                    ...TrackerElement
                    reports (date: $date){
                        id
                        time,
                        date
                        reportKey
                        columnId
                        isCritical
                        value
                        valueFormatted
                        comments
                    }
                }
                ... on PlanElementMedia {
                    ...MediaElement
                }
                ... on PlanElementLine {
                    id
                    height
                    color
                }
                
                ... on Assessment {
                    id
                    name
                }
                
                ... on Treatment {
                    ...TreatmentPlanElement
                }
                ... on Plan {
                    ... ApPlanElement
                }
                 ... on PlanElementCalculator {
                    ...CalculatorElement
                }
            }
            getBrahmsRules {
                ...Brahms
            }
        }
        ${ElementMediaFragment}
        ${ElementLinkFragment}
        ${ElementTextFragment}
        ${ElementClinicalNoteFragment}
        ${ElementOptionsFragment}
        ${ElementScaleFragment}
        ${ElementTreatmentFragment}
        ${ElementApFragment}
        ${ElementTrackerFragment}
        ${ElementCalculatorFragment}
        ${BrahmsFragment}
        ${PlanElementReportFragment}
`;

export const PlanElementPureFragment = gql`
    fragment PlanElement on PlanBodyElement {
            id
            itemId
            itemType
            type
            typeText
            hasChildren
            isAnswerBasedElement
            schedule {
                type
                startDate
                endDate
                relativeStartDate
                relativeEndDate
                dows
                specificDays
                specificDates
            }
            footnote
            reference
            itemInfo {
               
                ... on PlanElementChecklist {
                  ...OptionsElement
                }
                ... on PlanElementScale {
                  ...ScaleElement
                }
                 
                ... on PlanElementTextInput {
                  id
                  label
                  isLong
                  isDate
                  isTime
                }
                
                ... on PlanElementText {
                  ...TextElement
                }
                
                 ... on PlanElementClinicalNote {
                  ...ClinicalNoteElement
                }
                
                ... on PlanElementLink {
                    ...LinkElement
                }
                
                 ... on Tracker {
                     ...TrackerElement
                }
                ... on PlanElementMedia {
                    ...MediaElement
                }
                ... on PlanElementLine {
                    id
                    height
                    color
                }
                
                 ... on Assessment {
                    id
                    name
                }
                
                ... on Treatment {
                    ...TreatmentPlanElement
                }
                
                ... on PlanElementAlias {
                    ... AliasPlanElement
                    elementRoute
                }
                ... on Plan {
                    ... ApPlanElement
                }
                ... on PlanElementCalculator {
                    ...CalculatorElement
                }
            }
            getBrahmsRules {
                ...Brahms
            }
        }
        ${ElementMediaFragment}
        ${ElementLinkFragment}
        ${ElementTextFragment}
        ${ElementClinicalNoteFragment}
        ${ElementOptionsFragment}
        ${ElementScaleFragment}
        ${ElementTreatmentFragment}
        ${ElementAliasFragment}
        ${ElementApFragment}
        ${ElementCalculatorFragment}
        ${ElementTrackerFragment}
        ${BrahmsFragment}
`;



export const PathwayConnectedElementsFragment =  gql`
   fragment PathwayConnectedElements on Pathway {
        id
        getConnectedElements {
            parentId
            parentValue
            element {
                ...PlanElement
            }
        }
   }
    ${PlanElementPureFragment}
 `;
