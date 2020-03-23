import React from 'react'
import R from 'ramda'

import { ICON_CMD } from '@config'
import { NON_FILL_COMMUNITY } from '@constant'

import Tabber from '@components/Tabber'
import CommunityStatesPad from '@components/CommunityStatesPad'
import { CommunityHolder } from '@components/LoadingEffects'

import SocialList from './SocialList'

import {
  Wrapper,
  InnerWrapper,
  BannerContentWrapper,
  TabberWrapper,
  CommunityWrapper,
  CommunityLogo,
  LogoWrapper,
  CommunityInfo,
  TitleWrapper,
  Title,
  Desc,
  LogoHolder,
} from './styles/digest_view'

import {
  tabberChange,
  onSubscribe,
  onUndoSubscribe,
  onShowEditorList,
  onShowSubscriberList,
} from './logic'

const CommunityLogoHolder = `${ICON_CMD}/community_logo_holder.svg`

const CommunityBrief = ({ content }) => (
  <CommunityWrapper>
    <LogoWrapper raw={content.raw}>
      {content.logo ? (
        <CommunityLogo
          nonFill={R.contains(content.raw, NON_FILL_COMMUNITY)}
          src={content.logo}
          raw={content.raw}
          loading={<CommunityHolder text={content.raw} />}
        />
      ) : (
        <LogoHolder src={CommunityLogoHolder} />
      )}
    </LogoWrapper>
    <CommunityInfo>
      <TitleWrapper>
        <Title>{content.title}</Title>
      </TitleWrapper>
      <Desc>{content.desc}</Desc>
      <SocialList />
    </CommunityInfo>
  </CommunityWrapper>
)

const DigestView = ({ community, activeThread, layout }) => (
  <Wrapper>
    <InnerWrapper>
      <BannerContentWrapper>
        <CommunityBrief content={community} />
        <CommunityStatesPad
          community={community}
          onSubscribe={onSubscribe}
          onUndoSubscribe={onUndoSubscribe}
          onShowEditorList={onShowEditorList}
          onShowSubscriberList={onShowSubscriberList}
        />
        <TabberWrapper>
          <Tabber
            source={community.threads}
            onChange={tabberChange}
            active={activeThread}
            layout={layout}
            communityRaw={community.raw}
          />
        </TabberWrapper>
      </BannerContentWrapper>
    </InnerWrapper>
  </Wrapper>
)

export default React.memo(DigestView)
