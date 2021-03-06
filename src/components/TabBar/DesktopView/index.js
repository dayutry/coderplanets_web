/*
 * TabBar
 */

import React from 'react'
import T from 'prop-types'

import { TYPE, THREAD, C11N } from '@/constant'
import { buildLog, sortByIndex } from '@/utils'

import NormalView from './NormalView'
import BriefView from './BriefView'

import { mapAlias } from '../alias'

/* eslint-disable-next-line */
const log = buildLog('c:TabBar:index')

const TabBar = ({ source, active, onChange, layout, communityRaw }) => {
  const aliasSource = mapAlias(source, communityRaw)
  const sortedSource = sortByIndex(aliasSource)

  return (
    <div id={TYPE.APP_TABBER_ID}>
      {layout === C11N.BRIEF ? (
        <BriefView source={sortedSource} active={active} onChange={onChange} />
      ) : (
        <NormalView source={sortedSource} active={active} onChange={onChange} />
      )}
    </div>
  )
}

TabBar.propTypes = {
  onChange: T.func,
  source: T.arrayOf(
    T.shape({
      title: T.string,
      raw: T.string,
      alias: T.string,
      icon: T.oneOfType([T.string, T.node]),
      localIcon: T.string,
    }),
  ).isRequired,
  active: T.string,
  layout: T.oneOf([C11N.DIGEST, C11N.DIGEST_ROW, C11N.BRIEF]),
  // for alias usage
  communityRaw: T.string,
}

TabBar.defaultProps = {
  active: THREAD.POST,
  onChange: log,
  layout: C11N.DIGEST,
  communityRaw: 'home',
}

export default React.memo(TabBar)
