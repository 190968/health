import { defineMessages } from 'react-intl';

export const MedsI18nEn = defineMessages({
    "medication": {
        "id": "medication",
        "defaultMessage": "Medication",
        "description": "Medication"
    },
    "meds": {
        "id": "meds",
        "defaultMessage": "Medications",
        "description": "Medications"
    },
    "myMeds": {
        "id": "meds.title",
        "defaultMessage": "{title}",
        "description": "My Medications"
    },
    "noMeds": {
        "id": "meds.noMeds",
        "defaultMessage": "No Medications",
        "description": "No Medications"
    },
    "takeTimesHours": {
        "id": "meds.takehourly",
        "defaultMessage": 'Take {times} {times, plural, one {time} other {times}} a day',
        "description": "Take {times} times a day"
    },
    "takeTimesDaily": {
        "id": "meds.takedaily",
        "defaultMessage": 'Take {quantity} x {dosage} {timesPerDay} {timesPerDay, plural, one {time} other {times}} a day',
        "description": "Take {quantity} x {dosage} {timesPerDay} {timesPerDay, plural, one {time} other {times}} a day"
    },
    "reported": {
        "id": "meds.reported",
        "defaultMessage": '{progress, plural, =0 {Not Reported Yet} other {You are on {progress}% on Track}}',// {reported}/{total} reported',
        "description": "{progress, plural, =0 {Not Reported Yet} other {You are on {progress}% on Track}"
    },
    "takeButton": {
        "id": "meds.button.take",
        "defaultMessage": '{isTaken, select, true {Already Taken} false {Take {quantity} {form} Now}}',
        "description": "take button"
    },
    "untake": {
        "id": "meds.button.untake",
        "defaultMessage": 'Untake',
        "description": "{reported}/{total} reported"
    },
    "untakeConfirm": {
        "id": "meds.button.confirm.untake",
        "defaultMessage": 'Are you sure You want to Untake this meds?',
        "description": "Are you sure You want to Untake this meds?"
    },
    "alongDay": {
        "id": "meds.alongDay",
        "defaultMessage": 'Take Along the day',
        "description": 'Take Along the day'
    },
    "atTimes": {
        "id": "meds.atTimes",
        "defaultMessage": 'Take At Specific Times',
        "description": 'Take At Specific Times'
    },
    "asNeeded": {
        "id": "meds.asNeeded",
        "defaultMessage": 'Take As Needed',
        "description": 'Take As Needed'
    },
    "text": {
        "id": "meds.text",
        "defaultMessage": '{type, select, as_needed {As Needed} other {Any time}}',
        "description": 'Text'
    },
    "pillsPerDay": {
        "id": "meds.pills.day",
        "defaultMessage": '{pills} {pills, plural, one {pill} other {pills}} per Day',
        "description": 'Text'
    },
    "details": {
        "id": "meds.details",
        "defaultMessage": 'Details',
        "description": 'Details'
    },
    "form": {
        "id": "meds.form",
        "defaultMessage": 'Form',
        "description": 'Form'
    },
    "prescription": {
        "id": "meds.prescription",
        "defaultMessage": 'Prescription',
        "description": 'Prescription'
    },
    "period": {
        "id": "meds.period",
        "defaultMessage": 'Period',
        "description": 'Period'
    },
    "completed": {
        "id": "meds.completed",
        "defaultMessage": 'Completed',
        "description": 'Completed'
    },
    "prescriber": {
        "id": "meds.prescriber",
        "defaultMessage": 'Prescriber',
        "description": 'Prescriber'
    },
    "directions": {
        "id": "meds.directions",
        "defaultMessage": 'Directions',
        "description": 'Directions'
    },
    "purpose": {
        "id": "meds.purpose",
        "defaultMessage": 'Purpose',
        "description": 'Purpose'
    },
    "sideEffects": {
        "id": "meds.sideEffects",
        "defaultMessage": 'Side Effects',
        "description": 'Side Effects'
    },
    "reaction": {
        "id": "meds.reaction",
        "defaultMessage": 'Reaction',
        "description": 'Reaction'
    },
    "severity": {
        "id": "meds.severity",
        "defaultMessage": 'Severity',
        "description": 'Severity'
    },
    "added": {
        "id": "meds.added",
        "defaultMessage": 'Added',
        "description": 'Added'
    },
});

export default MedsI18nEn;