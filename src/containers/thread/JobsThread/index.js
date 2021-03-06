/*
 *
 * PostsThread
 *
 */

import React from 'react'
import { Waypoint } from 'react-waypoint'

import { ICON_CMD } from '@/config'
import { THREAD } from '@/constant'
import { connectStore, buildLog } from '@/utils'

import TagsBar from '@/containers/unit/TagsBar'

import Sticky from '@/components/Sticky'
import { PublishButton } from '@/components/Buttons'
import Maybe from '@/components/Maybe'
import PagedContents from '@/components/PagedContents'
import ContentFilter from '@/components/ContentFilter'

import PublishNote from './PublishNote'

import {
  Wrapper,
  LeftPart,
  RightPart,
  FilterWrapper,
  PublisherWrapper,
} from './styles'

import {
  useInit,
  inAnchor,
  outAnchor,
  onFilterSelect,
  onUserSelect,
  onPreview,
  onContentCreate,
  onTagSelect,
  onPageChange,
} from './logic'

/* eslint-disable-next-line */
const log = buildLog('C:JobsThread')

const JobsThreadContainer = ({ jobsThread: store }) => {
  useInit(store)

  const {
    pagedJobsData,
    curView,
    filtersData,
    activeTagData,
    activeJob,
    accountInfo,
    curCommunity,
    showPublishNote,
    showFilterBar,
  } = store

  const { totalCount } = pagedJobsData

  return (
    <Wrapper>
      <LeftPart>
        <Waypoint onEnter={inAnchor} onLeave={outAnchor} />
        <Maybe test={showFilterBar}>
          <FilterWrapper>
            <ContentFilter
              thread={THREAD.JOB}
              onSelect={onFilterSelect}
              activeFilter={filtersData}
              accountInfo={accountInfo}
              totalCount={totalCount}
            />
          </FilterWrapper>
        </Maybe>

        <PagedContents
          data={pagedJobsData}
          community={curCommunity.raw}
          thread={THREAD.JOB}
          curView={curView}
          active={activeJob}
          accountInfo={accountInfo}
          onPreview={onPreview}
          onAuthorSelect={onUserSelect}
          onPageChange={onPageChange}
        />
      </LeftPart>

      <RightPart>
        <PublishNote show={showPublishNote} />
        <PublisherWrapper>
          <PublishButton
            label="招贤纳士"
            labelIconSrc={`${ICON_CMD}/look_sb.svg`}
            onPublish={onContentCreate}
          />
        </PublisherWrapper>

        <Sticky offsetTop={50}>
          <TagsBar
            thread={THREAD.JOB}
            active={activeTagData}
            onSelect={onTagSelect}
          />
        </Sticky>
      </RightPart>
    </Wrapper>
  )
}

export default connectStore(JobsThreadContainer)
