import React from 'react';
import DescriptionList from '../../../../../../../../components/Layout/DescriptionList';
import Description from '../../../../../../../../components/Layout/DescriptionList/Description';
import moment from 'moment';

const VisitDetails = props => {
    const {visit} = props;
    const {id,
        isFollowUp,
        visitType,
        visitTypeTxt,
        dateTime,
        patient,
        subjective,
        objective,
        soapPlan,
        soapAssessment} = visit || {};

    const descriptionDetails = [
        ['Subjective', subjective],
        //['Name', user.fullName],
        ['Type', visitTypeTxt],
        ['Date', moment(dateTime).format('lll')],
       
    ];

    return <DescriptionList col={1} >
                            {descriptionDetails.map((details, i) => {
                                return  <Description key={i} term={details[0]} excludeEmpty >
                                    {details[1]}
                                </Description>;
                            })}
                        </DescriptionList>;
}

export default VisitDetails;