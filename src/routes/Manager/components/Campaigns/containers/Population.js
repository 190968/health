import Population from '../components/Population';
import {  withCampaignPopulationQuery } from '../queries';
import {compose, withProps, withStateHandlers} from 'recompose';
import { withDrawer } from '../../../../../components/Modal';
import { withTableCursors } from '../../../../../components/Tables/hocs';

const enhance = compose(
    withCampaignPopulationQuery,
    withProps(props => {
        const {campaign} = props;
        const {title} = campaign || {};
        return {
            modalTitle: title+' Population',
            modalWidth:800
        }
    }),
    withDrawer,
    withCampaignPopulationQuery,
    withTableCursors,
    
    withStateHandlers( props => {
        return {
            selectedRowKeys: []
        }
    }, {
        selectRow: state => (record) => {
            // console.log(record);
            const selectedRowKeys = [...state.selectedRowKeys];
            if (selectedRowKeys.indexOf(record.id) >= 0) {
              selectedRowKeys.splice(selectedRowKeys.indexOf(record.id), 1);
            } else {
              selectedRowKeys.push(record.id);
            }
            return {selectedRowKeys};
        },
        onSelectedRowKeysChange: state => (selectedRowKeys) => {
            return {selectedRowKeys};
        }
    })
)
export const CampaignPopulation = enhance(Population);
export default CampaignPopulation;