import GlobalSearchDrawerPure from '../components/GlobalSearchDrawer';
import { compose, withProps, mapProps, withStateHandlers, branch, withHandlers } from 'recompose';
import { withDrawer } from '../../../../../../components/Modal';
import { withPatientsSearchQuery } from '../../../../../../components/Autosuggest/containers/PatientSelect';
import { withPeopleSearchQuery } from '../../../../../../components/Autosuggest/containers/PeopleSelect';
import { withPlansSelectQuery } from '../../../../../../components/Autosuggest/containers/PlanSelect';

const withPeopleSearchQueryMap = compose(
	withProps((props) => {
		const { type } = props;
		return { role: type };
	}),
	withPeopleSearchQuery
);

const withPlansSearchQuery = compose(
	withPlansSelectQuery,
	// withProps(props => {
	// 	const {items} = props;
	// })
);

const enhance = compose(
	withProps((props) => {
		return {
			modalWidth: 600,
			modalTitle: false,
			maskClosable: true,
			closable: false
		};
	}),
	withDrawer,
	withStateHandlers(
		(props) => {
			return { type: 'patient', search: '' };
		},
		{
			updateSearchType: (props) => (e) => {
				const type = e.target.value;
				return { type };
			},
			updateSearch: (props) => (search) => {
				return { search };
			}
		}
	),
	branch((props) => props.type === 'patient', withPatientsSearchQuery),
	branch((props) => props.type === 'aps', withPlansSearchQuery),
	branch((props) => props.type != 'patient' && props.type != 'aps', withPeopleSearchQueryMap),
	withHandlers({
		onSearch: (props) => (value) => {
			props.updateSearch(value);
			props.doSearch(value);
		}
	})
);
export const GlobalSearchDrawer = enhance(GlobalSearchDrawerPure);
