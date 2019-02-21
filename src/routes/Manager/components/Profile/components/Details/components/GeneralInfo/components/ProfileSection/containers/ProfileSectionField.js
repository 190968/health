import {compose} from 'recompose';
import ProfileSectionFieldPure from '../components/Field';
//import DateField from '../components/Date';
//import FullName from '../components/FullName';
import { conditionalWhenThen } from '../../../../../../../../../../../utils/main';


const enhance = compose(
    //conditionalWhenThen({'when': props => props.type === 'full_name',then:FullName}),
    //conditionalWhenThen({'when': props => props.type === 'birthday',then:DateField})
)

export const ProfileSectionField = enhance(ProfileSectionFieldPure);