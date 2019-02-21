import React from 'react';
import DescriptionList from '../../../../../../../../components/Layout/DescriptionList';
import Description from '../../../../../../../../components/Layout/DescriptionList/Description';
import moment from 'moment';

const TransitionDetails = props => {
    const {transition} = props;
    const {typeTxt, dateTime, dateCreated, notes, source} = transition || {};

    const descriptionDetails = [
        //['Name', user.fullName],
        ['Type', typeTxt],
        ['Date', moment(dateTime).format('lll')],
        ['Created ', moment(dateCreated).format('lll')],
        ['Details', notes],
        ['Source', source],
    ];

    return <DescriptionList col={1} >
                            {descriptionDetails.map((details, i) => {
                                return  <Description key={i} term={details[0]} excludeEmpty >
                                    {details[1]}
                                </Description>;
                            })}
                        </DescriptionList>;
}

export default TransitionDetails;