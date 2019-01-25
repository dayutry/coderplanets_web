/*
 *
 * Modal
 *
 */

import React from 'react'
import PropTypes from 'prop-types'

import { ICON_CMD } from 'config'
import { makeDebugger } from 'utils'
import { Mask, Wrapper, CloseBtn, ChildrenWrapper } from './styles'

/* eslint-disable-next-line */
const debug = makeDebugger('c:Modal:index')

const Modal = ({ children, show, width, showCloseBtn, onClose, mode }) => (
  <Mask show={show} onClick={onClose}>
    <Wrapper width={width} mode={mode}>
      <CloseBtn
        mode={mode}
        src={`${ICON_CMD}/closeBtn.svg`}
        show={showCloseBtn}
        onClick={onClose}
      />
      <ChildrenWrapper onClick={e => e.stopPropagation()}>
        {children}
      </ChildrenWrapper>
    </Wrapper>
  </Mask>
)

Modal.propTypes = {
  // https://www.npmjs.com/package/prop-types
  children: PropTypes.node.isRequired,
  show: PropTypes.bool,
  onClose: PropTypes.func,
  width: PropTypes.string,
  showCloseBtn: PropTypes.bool,
  mode: PropTypes.oneOf(['normal', 'error']),
}

Modal.defaultProps = {
  show: false,
  onClose: debug,
  width: '600px',
  showCloseBtn: false,
  mode: 'normal',
}

export default Modal
