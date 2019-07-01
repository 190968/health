import React from 'react';
import HeaderPointsPure from '../components/HeaderPoints';
import {notification, Progress} from 'antd';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { withActiveUser, ifModuleExists } from '../../../../../../components/App/app-context';
import {compose, lifecycle} from 'recompose';
import { FormattedMessage, injectIntl } from 'react-intl';
import messages from '../components/HeaderPoints/i18n/en';

export const GET_PATIENT_POINTS_QUERY  = gql`
   query GET_PATIENT_POINTS ($userId: UID!) {
        user (id: $userId) {
            id
            motivation {
                currentLevel {
                    points
                    info {
                        id
                        title
                    }
                    nextLevel {
                        title
                        amount
                    }
                }
            }
        }
    }
`;

const withQuery = graphql(GET_PATIENT_POINTS_QUERY, {
    options: (ownProps) => ({
        variables: {
            userId: ownProps.currentUser.id
        }
    }),
    props: ({  data }) => {
        if (!data.loading) {
            //const {account} = data;
            const {user} = data || {};
            const {motivation} = user || {};
            return {
                motivation: motivation,
                loading: data.loading
            }
        }
        else {
            return {loading: data.loading}
        }
    },
});

const enhance = compose(
    ifModuleExists('points'),
    withActiveUser,
    withQuery,
    injectIntl,
    lifecycle({
        componentDidUpdate(prevProps) {
            const {motivation:prevMotivation} = prevProps || {};
            const {motivation} = this.props;
            if (prevMotivation) {

                const {currentLevel:prevLevel} = prevMotivation || {};
                const {points:prevPoints=0} = prevLevel || {};
                // console.log(prevProps);
                // console.log(this.props);
                const {currentLevel} = motivation || {};
                const {points, nextLevel} = currentLevel || {};




                if (prevPoints < points) {
                    const {amount=0, title:nextLevelTitle} = nextLevel || {};
                    const progress= Math.round(points/amount*100);
                    const pointsToGo = amount-points;


                    //console.log(this.props);
                    notification['success']({
                        message: <FormattedMessage {...messages.newPointsAlert} values={{points: (points-prevPoints)}}   />,
                        description: <div>
                            {/* <Progress type="circle" percent={progress} width={80} /> */}
                            <FormattedMessage values={{points:pointsToGo, title:nextLevelTitle}} {...messages.pointsToGo} />
                            </div>
                        //description: <FormattedMessage {...messages.newPointsAlertDescription} values={{points: (points-prevPoints)}}   />
                      });
                    //console.log('NEW POINTS!!!!');
                }
                // Typical usage (don't forget to compare props):
                // if (this.props.userID !== prevProps.userID) {
                //   this.fetchData(this.props.userID);
                // }
            }
          }
    })
);
export const HeaderPoints = enhance(HeaderPointsPure);
export default HeaderPoints;