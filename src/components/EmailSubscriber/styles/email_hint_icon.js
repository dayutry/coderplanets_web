import styled from 'styled-components'

import Img from '@/Img'
import { theme, cs, animate } from '@/utils'

import { Wrapper as ParentWrapper } from './index'

export const Wrapper = styled.div.attrs((props) => ({
  'data-test-id': props.testId,
}))`
  ${cs.flex('align-center')};
`
export const MailIcon = styled(Img)`
  fill: ${theme('thread.articleDigest')};
  width: 14px;
  height: 14px;
  display: block;
  transform: rotate(10deg);
  margin-right: 12px;

  ${ParentWrapper}:hover & {
    animation: ${animate.shake} 10s linear;
  }
`
export const CurveLineIcon = styled(Img)`
  fill: ${theme('thread.articleDigest')};
  width: 24px;
  height: 24px;
  margin-right: 10px;
  display: block;
  transform: rotateZ(386deg);
`
export const MailBoxIcon = styled(Img)`
  fill: ${theme('thread.articleDigest')};
  width: 20px;
  height: 20px;
  display: block;
`
