import AddCalendarEventPure from '../components/AddCalendarEvent';
import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import { CalendarEventInfoFragment } from '../fragments';
import { USER_APPOINTMENTS_QUERY } from './Appointments';
import {compose, withHandlers, withProps} from 'recompose';
import {Form, message} from 'antd';
import moment from 'moment';
import { withDrawer } from '../../../components/Modal';
import { withActiveUserSimple } from '../../../components/App/app-context';
import { CalendarI18nEn } from '../components/Calendar/i18n/en';
import { FormattedMessage } from 'react-intl';

export const CALENDAR_EVENT_QUERY = gql`
    query GET_EVENT_INFO {
        
        eventTypes: __type(name: "CalendarEventTypeEnum") {
            name
            enumValues {
              name
              description
            }
        }
        
        eventDurations: __type(name: "CalendarEventDurationEnum") {
            name
            enumValues {
              name
              description
            }
        }
        
        
    }
`;


// 1- add queries:
const withQuery = graphql(
    CALENDAR_EVENT_QUERY,
    {
        options: (ownProps) => ({
            variables: {
               //userId: ownProps.user.id,
               id: ownProps.id
            }
        }),
        props: ({ownProps, data}) => {
            if (!data.loading) {
                return {
                    eventTypes: data.eventTypes.enumValues,
                    eventDurations: data.eventDurations.enumValues,
                    loading: data.loading,
                }
            } else {
                return {loading: data.loading}
            }
        },
    }
);


const CREATE_CALENDAR_EVENT_MUTATION = gql`
    mutation createCalendarEvent($userId: UID!, $input: CalendarEventInput!) {
        createCalendarEvent(userId:$userId, input: $input) {
            ...CalendarEventInfo
        }
    }
    ${CalendarEventInfoFragment}
`;


export const withMutation = graphql(CREATE_CALENDAR_EVENT_MUTATION, {
    props: ({ownProps, mutate}) => ({
        saveEvent: (input) => {
            const {user, mode} = ownProps;
            const {id:userId} = user || {};
            return mutate({
                variables: {id: ownProps.id, userId, input: input},
                update: (store, { data: { createCalendarEvent } }) => {
                    if (createCalendarEvent) {
                        // Read the data from our cache for this query.
                        const info = store.readQuery({
                            query: USER_APPOINTMENTS_QUERY,
                            variables: {
                                userId,
                                mode
                            }
                        });
                        const {user} = info || {};
                        const {getCalendarEvents=[]} = user || {};
 
                        store.writeQuery({
                            query: USER_APPOINTMENTS_QUERY,
                            data: {user: {...user, getCalendarEvents: [...getCalendarEvents, createCalendarEvent]}},
                            variables: {
                                userId,
                                mode
                        }});
                    }
                },
            })
        },

    }),
});

const enhance = compose(
    withQuery,
    withMutation,
    withActiveUserSimple,
    Form.create(),
    withHandlers({
        onSubmit: props => () => {
            const { saveEvent, form } = props;
           
            form.validateFields((err, values) => {
               
                //console.log(err);
                if (!err) {
                    //console.log(values);
                    const {participants=[], date, time, ...otherValues} = values;
                    const input = {...otherValues,
                        date: moment.utc(date).format('YYYY-MM-DD'),
                        time: moment.utc(time).format('HH:mm:ss'),
                        participants:participants.map(participant => participant.id)};
                    const hide = message.loading('Saving...');
                    return saveEvent(input).then(() => {
                        hide();
                        message.success('Saved');
                        props.onHide();
                        if (props.refetch) {
                            props.refetch();
                        }
                    });
                }
            });
        }
    }),
    withProps(props => {
        return {
            modalTitle: <FormattedMessage  {...CalendarI18nEn.addAppointment} />
        }
    }),
    withDrawer

)
export const AddCalendarEvent = enhance(AddCalendarEventPure);
export default AddCalendarEvent;