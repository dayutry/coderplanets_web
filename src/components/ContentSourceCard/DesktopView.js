/*
 *
 * DesktopView
 *
 */

import React from 'react'
import T from 'prop-types'

import { buildLog } from '@/utils'
import CommunityList from '@/components/CommunityList'

import UserList from './UserList'
import {
  Wrapper,
  Divider,
  Title,
  Desc,
  NoMoreDesc,
} from './styles/desktop_view'

/* eslint-disable-next-line */
const log = buildLog('c:DesktopView:index')

const DesktopView = ({
  data: { communities, pagedCommentsParticipators: users },
}) => {
  return (
    <Wrapper>
      <Title>所属社区</Title>
      <Desc>
        <CommunityList
          items={communities}
          emptyHint={<NoMoreDesc>不属于任何社区</NoMoreDesc>}
        />
      </Desc>

      {users.totalCount !== 0 && (
        <>
          <Divider />
          <Title>参与讨论 ({users.totalCount})</Title>
          <Desc noBottom>
            <UserList items={users.entries} />
          </Desc>
          <Divider />
        </>
      )}

      {/*
          <Desc column noBottom>
          <TagList items={data.tags} />
          </Desc>
        */}
    </Wrapper>
  )
}

DesktopView.propTypes = {
  data: T.shape({
    communities: T.arrayOf(
      T.shape({
        id: T.string,
        title: T.string,
        logo: T.string,
        raw: T.string,
      }),
    ),
    pagedCommentsParticipators: T.shape({
      entries: T.array,
      totalCount: T.number,
    }),
    tags: T.arrayOf(
      T.shape({
        id: T.string,
        title: T.string,
        color: T.string,
        raw: T.string,
      }),
    ),
  }),
}

DesktopView.defaultProps = {
  data: {
    communities: [],
    tags: [],
    pagedCommentsParticipators: {
      entries: [],
      totalCount: 0,
    },
  },
}

export default React.memo(DesktopView)
