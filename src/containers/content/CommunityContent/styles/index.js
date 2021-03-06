import styled from 'styled-components'

import { theme, cs } from '@/utils'

export const Wrapper = styled.div.attrs((props) => ({
  'data-test-id': props.testId,
}))`
  ${cs.flex('justify-center')};
  min-height: 70vh;
  width: 100%;

  ${cs.media.tablet`
    width: 100%;
    margin: 0;
    padding: .6em;
    padding-top: 0;
    padding-right: 0;
  `};
`
export const InnerWrapper = styled.div`
  margin: ${({ cardView }) => (cardView ? '0 2.5%' : '0 5.5%')};
  margin-top: 20px;
  width: 100%;

  padding: 0 3vw;
  padding-top: ${({ cardView }) => (cardView ? '12px' : '')};
  color: ${theme('font')};
  background: ${theme('content.bg')};

  border: 1px solid;
  border-color: ${theme('content.border')};
  border-radius: 6px;

  ${cs.media.laptopL`
    margin: 0 4.2%;
    margin-left: ${({ cardView }) => (cardView ? '2.5%' : '4.2%')};
    margin-top: 20px;
    padding-top: 8px;
  `};

  ${cs.media.mobile`
    margin: 0 3%;
    margin-left: 2%;
    margin-top: 0px;
    padding-top: 8px;
  `};
`
