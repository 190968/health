import React from 'react';
import { Card, Divider } from 'antd';
import { PageHeaderLayout } from '../../../../../../components/Layout/PageHeaderLayout';
import { CohortPatients } from '../../containers/Patients';
import { CohortTeam } from '../../containers/Team';
import moment from 'moment';
import DescriptionList from '../../../../../../components/Layout/DescriptionList/DescriptionList';
// import Avatar from '../../../../../User/components/Avatar';
import AvatarWithName from '../../../../../User/components/AvatarWithName';
import CohortManagerButton from '../Buttons/components/Manage';
import { getCohortFilterLabelValue } from '../../../../../../components/Tables/FilterFields';



const tabList = [
    {
        key: 'population',
        tab: 'Population',
    },
    {
        key: 'team',
        tab: 'Team Members',
    },
];

const CohortView = props => {
    const { cohort, loading, match } = props;
    const { title, description, createdOn, createdBy, ages, gender, codes = [] } = cohort || {};

    const details = [
        ['Description', description],
    ];

    if (!loading) {
        const { min: minAge, max: maxAge } = ages || {};
        const filters = [
            { key: 'gender', content: gender },
            { key: 'age', content: [minAge, maxAge] },
            { key: 'diagnosis', content: codes }
        ];
        filters.map(filter => {
            const { key, content } = filter;
            let { label, value } = getCohortFilterLabelValue(key, content);
            details.push([label, value]);
            return;
        })

    }

    details.push(['Created by ', <AvatarWithName user={createdBy} />]);



    const { tab = 'population', subtab = '' } = match.params || {};

    // const selectedItem = subtab || tab;
    // const openItem = tab;

    // let mainUrl = '/u';
    // if (id !== '') {
    //     mainUrl += '/'+id;
    // }


    let content = null;
    switch (tab) {
        case 'team':
            content = <CohortTeam cohort={cohort} />
            break;
        default:
            content = <CohortPatients cohort={cohort} />
            break;
    }
    return <PageHeaderLayout title={title}
        content=""
        loading={loading}
        action={<React.Fragment>
            Created on {createdOn && moment(createdOn).format('l')} <CohortManagerButton cohort={cohort}  refetch={props.refetch} icon={'edit'} />
        </React.Fragment>}
        content={<DescriptionList details={details} />}

        tabList={tabList}
        activeTab={tab}
        onTabChange={props.handleTabChange}

    >
        {content}

    </PageHeaderLayout>;
}

export default CohortView;