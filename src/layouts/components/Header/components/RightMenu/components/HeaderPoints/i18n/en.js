/**
 * Created by Павел on 18.04.2018.
 */

import { defineMessages } from 'react-intl';

export default defineMessages({
        'pointsProgress': {
            "id": "points.progress",
            "defaultMessage": "{progress, number}%",
            "description": "Points Progress"
        },
        'points': {
            "id": "points.points",
            "defaultMessage": "You have {points, plural, one {1 point} other {{points, number} points}}",
            "description": "You have Points"
        },
        'pointsToGo': {
            "id": "points.togo",
            "defaultMessage": "{points, plural, one {1 point} other {{points, number} points}} to {title}",
            "description": "Points to go"
        },
        'newPointsAlert': {
            "id": "points.alert.title",
            "defaultMessage": "You received {points, plural, =1 {1 Point} other {{points, number} Points}}",
            "description": "You received points"
        },
        'newPointsAlertDescription': {
            "id": "points.alert.description",
            "defaultMessage": "Points descript",
            "description": "You received points"
        },
        
        
})
