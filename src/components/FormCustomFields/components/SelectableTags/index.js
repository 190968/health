import React from 'react';
import { Tag } from 'antd';
import { compose,  withStateHandlers } from 'recompose';

const CheckableTag = Tag.CheckableTag;

//const tagsFromServer = ['Movies', 'Books', 'Music', 'Sports'];

const SelectableTagsPure = props => {
    const { label, selectedTags, tags=[], handleChange, selectAll, useAll=false } = props;
    return (
      <div>
        <h6 style={{ marginRight: 8, display: 'inline' }}>{label}</h6>

        {useAll && <CheckableTag
            key={'all'}
            checked={selectedTags.length === 0}
            onChange={selectAll}
          >
            All
          </CheckableTag>}
        {tags && tags.map(tag => (
          <CheckableTag
            key={tag.value}
            checked={selectedTags.indexOf(tag.value) > -1}
            onChange={checked => handleChange(tag.value, checked)}
          >
            {tag.label}
          </CheckableTag>
        ))}
      </div>
    );
}

const enhance = compose(
    withStateHandlers(
        ({ selectedTags = [], tags=[], defaultSelectAll }) => {
            // if (selectedTags.length == 0 && defaultSelectAll) {
            //     return {
            //         selectedTags:tags.map(tag =>tag.value)
            //     }
            // }
            return {
                selectedTags: selectedTags
            }
        },
        {
            handleChange: (state, props) => (tag, checked) => {
                const { selectedTags } = state;
                const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);

                props.onChange(nextSelectedTags);
                return {
                    selectedTags:nextSelectedTags
                }
            },
            selectAll: (state, props) => () => {
                props.onChange();
                return {
                    selectedTags:[]
                }
            }
        }
    )
);

export const SelectableTags = enhance(SelectableTagsPure);