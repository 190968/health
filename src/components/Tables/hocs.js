import {compose, withHandlers, withStateHandlers} from 'recompose';

export const withTableRowSelection = compose(
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

export const withTableCursors = withHandlers({
    handleTableChange: props => (pagination, filters, sorter, other) => {
      // load more patients
      console.log(props, 'props');
      console.log(other, 'other');
      console.log(pagination);
      console.log(filters);
      console.log(sorter);
      const {field, order} = sorter;
      const {current, pageSize} = pagination;
      //prepare cursor
      var sort = {page:current, pageLimit:pageSize, sort:field, sortOrder: order === 'ascend' ? 'asc' : 'desc'};
      // console.log(pagination);
      // console.log(sort);
      const {loadMoreEntries} = props;
      if (loadMoreEntries) {
        props.loadMoreEntries({cursors: sort});
      }
    }
  })