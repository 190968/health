import React from 'react';
import { List, Input, Divider} from 'antd';
import { PubMedViewArticleButton } from './containers/PubMedViewArticleButton';
const Search = Input.Search;

const PubMedArticles = props => {
    const {loading=false, articles=[], doSearch} = props;
    //console(props);
    return <React.Fragment>
        <Search
        placeholder="Search for PubMed Article"
        onSearch={doSearch}
        enterButton
        />
        <Divider />
        <List
    itemLayout={'vertical'}
    loading={loading}
    dataSource={articles}
    renderItem={article => (
      <List.Item key={article.id}>
        <List.Item.Meta
          title={<PubMedViewArticleButton article={article} />}
           description={article.pubYear}
        />
      </List.Item>
    )}
  /></React.Fragment>
}

export default PubMedArticles