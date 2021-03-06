import styled from 'styled-components'

import { theme, cs } from '@/utils'
import Img from '@/Img'

export const Wrapper = styled.div`
  ${cs.flex()};
`
export const Brief = styled.div`
  ${cs.flexGrow('align-center')};
  margin-bottom: 10px;
  margin-left: 10px;
  color: ${theme('thread.articleTitle')};
  &:hover {
    cursor: pointer;
  }
`
export const Title = styled.div`
  font-size: 15.5px;
  @media (max-width: 1450px) {
    max-width: 500px;
  }
  @media (max-width: 1250px) {
    max-width: 450px;
  }
  @media (max-width: 1100px) {
    max-width: 350px;
  }
`
export const TitleLink = styled.div`
  position: relative;
  font-size: 15px;
  margin-top: -1px;
  color: ${theme('thread.articleLink')};
  margin-left: 10px;
  opacity: 0.8;
  text-decoration: underline;
`
export const LinkIcon = styled(Img)`
  fill: ${theme('thread.articleLink')};
  position: absolute;
  top: 6px;
  left: -5px;
  width: 12px;
  height: 12px;
`
export const TagListWrapper = styled.div``
