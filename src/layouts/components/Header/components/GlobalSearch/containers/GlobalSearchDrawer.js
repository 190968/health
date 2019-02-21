import GlobalSearchDrawerPure from '../components/GlobalSearchDrawer';
import { compose, withProps, mapProps, withStateHandlers, branch, withHandlers } from 'recompose';
import { withDrawer } from '../../../../../../components/Modal';
import { withPatientsSearchQuery } from '../../../../../../components/Autosuggest/containers/PatientSelect';
import { withPeopleSearchQuery } from '../../../../../../components/Autosuggest/containers/PeopleSelect';

const withPeopleSearchQueryMap = compose(
	withProps((props) => {
		const { type } = props;
		return { role: type };
	}),
	withPeopleSearchQuery
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
	branch((props) => props.type != 'patient', withPeopleSearchQueryMap),
	withHandlers({
		onSearch: (props) => (value) => {
			props.updateSearch(value);
			props.doSearch(value);
		}
	})
);
export const GlobalSearchDrawer = enhance(GlobalSearchDrawerPure);
