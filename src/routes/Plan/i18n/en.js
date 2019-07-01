import { defineMessages } from 'react-intl';

export const PlanI18nEn = defineMessages({
    "myPlans": {
        "id": "user_aps_title",
        "defaultMessage": "{isSelf, select, true {My } false {{name}}} {type} {count, plural, =0 {} other {({count})}}",
        "description": "My ActionPlans"
    },
    "noPlans": {
        "id": "user_aps_empty",
        "defaultMessage": "No Actionplans",
        "description": "No Actionplans"
    },
    "addAp": {
        "id": "add_ap",
        "defaultMessage": "Add ActionPlan",
        "description": "Add ActionPlan"
    },
    'showStatusActive': {
        "id": "plan.status.active",
        "defaultMessage": "Show Active",
        "description": "Show Active"
    },
    'showStatusCompleted': {
        "id": "plan.status.completed",
        "defaultMessage": "Show Completed",
        "description": "Show Completed"
    },
    'showStatusElapsed': {
        "id": "plan.status.elapsed",
        "defaultMessage": "Show Elapsed",
        "description": "Show Elapsed"
    },
    'showStatusArchived': {
        "id": "plan.status.archived",
        "defaultMessage": "Show Archived",
        "description": "Show Archived"
    },
    'progress': {
        "id": "plan.progress",
        "defaultMessage": "{title} Progress",
        "description": "{Plan title} Progress"
    },
    'startedOn': {
        "id": "started.on",
        "defaultMessage": "Started on",
        "description": "Started on"
    },
    'endsIn': {
        "id": "ends.in",
        "defaultMessage": "Ends in",
        "description": "Ends in"
    },
    'lastReported': {
        "id": "last.reported",
        "defaultMessage": "Last Reported",
        "description": "Last Reported"
    }
    

});