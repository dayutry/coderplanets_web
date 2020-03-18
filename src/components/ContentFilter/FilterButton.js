import React from 'react'

import { ICON_CMD } from '@config'

import { Button } from '@components/Buttons'
import Popover from '@components/Popover'

import { Wrapper, InnerBtnWrapper, FilterIcon } from './styles/filter_button'

import FilterPanel from './FilterPanel'

const FilterButton = ({ thread, onSelect, isLogin, activeFilter }) => (
  <Wrapper>
    <Popover
      placement="bottomLeft"
      trigger="click"
      content={
        <FilterPanel
          thread={thread}
          onSelect={onSelect}
          isLogin={isLogin}
          activeFilter={activeFilter}
        />
      }
    >
      <Button size="small" type="primary" ghost>
        <InnerBtnWrapper>
          综合排序
          <FilterIcon src={`${ICON_CMD}/content_filter.svg`} />
        </InnerBtnWrapper>
      </Button>
    </Popover>
  </Wrapper>
)

export default React.memo(FilterButton)
