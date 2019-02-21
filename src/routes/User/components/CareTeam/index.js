import React from 'react';
import AvatarWithName from '../AvatarWithName/index';
import { Form,  List, Card } from 'antd';
import {
    FormattedMessage,
} from 'react-intl';
import messages from './i18n/en';
import { ListWithMessage } from '../../../../components/UI/List';


const CareTeam = props => {
    const {members=[],loading, totalCount=0 } = props;
    
    return <Card loading={loading} title={<FormattedMessage values={{isSelf:true, count:totalCount}} {...messages.myCareTeam} />}>
        <ListWithMessage
            emptyMessage={<FormattedMessage values={{isSelf:true, count:totalCount}} {...messages.noCareTeam} />}
            split={false}
            loading={loading}
            grid={{gutter: 10, xs: 3, md: 1, lg: 2/*, xl: 4*/}}
            dataSource={members}
            renderItem={person => (
                <List.Item key={person.id}>
                    <AvatarWithName user={person.user} truncate />
                </List.Item>
            )}
        />
    </Card>;
}

export default CareTeam;

// class CareTeam extends React.Component {

//     render() {
//         const  {info,loading} = this.props;
//         if (loading) {
//             return  <Card loading title="CareTeam" >
//                 Loading</Card>;
//         }
//         const {intl}=this.props;
//         const  {careTeam} = info;
//         const  {edges} = careTeam;
//         console.log(intl.messages.user_careteam_title);
//         const title = intl.messages.user_careteam_title;
//         const count = this.props.info.careTeam.totalCount > 0 ?  " ("+this.props.info.careTeam.totalCount+")":"";
//         return edges.length > 0 ?
//             ( <Card title={title+count}>
//                 <List
//                     split={false}
//                     loading={loading}
//                     grid={{gutter: 10, xs: 3,   md: 1, lg: 2/*, xl: 4*/}}
//                     dataSource={edges}
//                     renderItem={person => (
//                         <List.Item key={person.id}>
//                                     <Link to={'/u/'+person.id} style={{color: 'inherit'}}>
//                                         <AvatarWithName user={person.user} />
//                                     </Link>
//                         </List.Item>
//                     )}
//                 />
//             </Card>) : null;
//     }
// }
// const WrappedCareTeam = Form.create()(CareTeam);
// export default injectIntl(WrappedCareTeam);