/*
 * DrawerStore store
 *
 */

import { types as T, getParent } from 'mobx-state-tree'
import { merge, contains } from 'ramda'

import { TYPE, THREAD } from '@/constant'
import {
  markStates,
  stripMobx,
  lockPage,
  unlockPage,
  Global,
  cs,
  toggleGlobalBlur,
} from '@/utils'
import { User, EmptyAchievement } from '@/model'

const PREVIEWABLE_THREADS = [THREAD.POST, THREAD.JOB, THREAD.VIDEO, THREAD.REPO]
const THREAD_CONTENT_CURD_TYPES = [
  // post
  TYPE.DRAWER.POST_VIEW,
  TYPE.DRAWER.POST_CREATE,
  TYPE.DRAWER.POST_EDIT,
  // job
  TYPE.DRAWER.JOB_VIEW,
  TYPE.DRAWER.JOB_CREATE,
  TYPE.DRAWER.JOB_EDIT,
  // repo
  TYPE.DRAWER.REPO_VIEW,
  TYPE.DRAWER.REPO_CREATE,
  // video
  TYPE.DRAWER.VIDEO_VIEW,
  TYPE.DRAWER.VIDEO_CREATE,
  TYPE.DRAWER.VIDEO_EDIT,
  // mails
  TYPE.DRAWER.MAILS_VIEW,
]

const Animation = T.model('Animation', {
  from: T.optional(T.enumeration('from', ['top', 'bottom']), 'bottom'),
})

const Attachment = T.model('Attachment', {
  id: T.string,
  type: T.optional(
    T.enumeration('type', [...THREAD_CONTENT_CURD_TYPES]),
    TYPE.DRAWER.POST_VIEW,
  ),
  title: T.string,
  body: T.maybeNull(T.string),
  digest: T.maybeNull(T.string),
  author: T.maybeNull(User),
  copyRight: T.optional(T.string, 'original'),
  linkAddr: T.maybeNull(T.string),

  // video spec
  poster: T.maybeNull(T.string),
  thumbnil: T.maybeNull(T.string),
  desc: T.maybeNull(T.string),
  duration: T.maybeNull(T.string),
  publishAt: T.maybeNull(T.string),
  source: T.maybeNull(T.string),
  link: T.maybeNull(T.string),
  originalAuthor: T.maybeNull(T.string),
  originalAuthorLink: T.maybeNull(T.string),
})

const DrawerStore = T.model('DrawerStore', {
  visible: T.optional(T.boolean, false),
  // only works for mobile view
  animation: T.optional(Animation, { from: 'bottom' }),
  windowWidth: T.optional(T.number, 1520),
  type: T.maybeNull(
    T.enumeration('previewType', [
      TYPE.DRAWER.ROOT_STORE,
      // account
      TYPE.DRAWER.ACCOUNT_VIEW,
      TYPE.DRAWER.USER_VIEW,
      TYPE.DRAWER.ACCOUNT_EDIT,
      // article types
      ...THREAD_CONTENT_CURD_TYPES,
      //
      TYPE.DRAWER.C11N_SETTINGS,
      TYPE.DRAWER.MOBILE_NAVI_MENU,
    ]),
  ),
  attUser: T.maybeNull(User),
  attachment: T.maybeNull(Attachment),

  imageUploading: T.optional(T.boolean, false),
  // header:
  // body:
})
  .views((self) => ({
    get root() {
      return getParent(self)
    },
    get media() {
      return self.root.media
    },
    // 预览面板从最右侧滑出的偏移量
    get rightOffset() {
      const { windowWidth } = self
      const { GLOBAL_MAX_WIDTH } = cs
      const MAX_WIDTH = Number(GLOBAL_MAX_WIDTH.slice(0, -2))

      return `${windowWidth <= MAX_WIDTH ? 0 : (windowWidth - MAX_WIDTH) / 2}px`
    },
    get curCommunity() {
      return stripMobx(self.root.viewing.community)
    },
    get curTheme() {
      return self.root.theme.curTheme
    },
    get attachmentData() {
      return stripMobx(self.attachment)
    },
    get attUserData() {
      return stripMobx(self.attUser)
    },
    get modalVisible() {
      return self.visible && Global.innerWidth > cs.mediaBreakPoints.desktopL
    },

    get slideVisible() {
      return self.visible && Global.innerWidth <= cs.mediaBreakPoints.desktopL
    },
  }))
  .actions((self) => ({
    open({ type, data, thread, animation = { from: 'bottom' } }) {
      // NOTE: currently the attachment is only used for article-like content
      if (type === TYPE.DRAWER.USER_VIEW) {
        self.attUser = merge(data, EmptyAchievement)
      } else if (data) {
        self.attachment = merge(data, { type })
      }
      if ((thread, contains(thread, PREVIEWABLE_THREADS))) {
        self.setViewing({ [thread]: data, viewingThread: thread })
      }

      self.visible = true
      self.type = type
      self.animation = animation
      lockPage()
      if (self.media.mobile) {
        toggleGlobalBlur(true)
      }
    },
    setViewing(sobj) {
      self.root.setViewing(sobj)
    },
    close() {
      self.visible = false
      unlockPage()
      if (self.media.mobile) {
        toggleGlobalBlur(false)
      }
      // self.type = TYPE.DRAWER.ROOT_STORE
    },
    mark(sobj) {
      markStates(sobj, self)
    },
  }))

export default DrawerStore
