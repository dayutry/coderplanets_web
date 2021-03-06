import React from 'react'

import { ICON_CMD } from '@/config'
import { parseDomain } from '@/utils'

import AvatarsRow from '@/components/AvatarsRow'
import InlineTags from '@/components/InlineTags'

import {
  Wrapper,
  TitleLink,
  LinkIcon,
  Brief,
  Title,
  TagListWrapper,
} from '../../styles/digest_view/header'

const Header = ({ item, onPreview, onUserSelect }) => {
  return (
    <Wrapper>
      <Brief onClick={() => onPreview(item)}>
        <Title>{item.title}</Title>
        {item.linkAddr && (
          <TitleLink>
            <LinkIcon src={`${ICON_CMD}/link.svg`} />
            <span style={{ marginLeft: 9 }}>{parseDomain(item.linkAddr)}</span>
          </TitleLink>
        )}
        <TagListWrapper>
          <InlineTags data={item.tags} />
        </TagListWrapper>
      </Brief>
      <div>
        <AvatarsRow
          onUserSelect={onUserSelect}
          users={item.commentsParticipators}
          total={item.commentsCount}
        />
      </div>
    </Wrapper>
  )
}

export default Header
