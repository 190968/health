import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ReminderInfoFragment } from './fragments';


const GET_REMINDERS_QUERY = gql`
	query GET_REMINDERS($type: ReminderTypeEnum!, $itemId: UID!, $userId: UID!) {
		getReminders(itemId: $itemId, type: $type, userId:$userId) {
			...ReminderInfo
		}
	}
    ${ReminderInfoFragment}
`;

export const withRemindersQuery = graphql(GET_REMINDERS_QUERY, {
	options: (ownProps) => {
        const {user, reminderInfo } = ownProps;
		const { type, id } = reminderInfo || {};
        const {id:userId} = user || {}
		return {
			variables: {
				type:type,
				itemId:id,
				userId
			},
			fetchPolicy: 'network-only'
		};
	},
	props: ({ data }) => {
		if (!data.loading) {
			return {
				reminders: data.getReminders || [],
				loading: data.loading
			};
		} else {
			return { loading: data.loading };
		}
	}
});