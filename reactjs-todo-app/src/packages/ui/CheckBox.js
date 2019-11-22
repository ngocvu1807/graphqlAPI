import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Icon } from './Icon'
import Tickbox from '../../assets/icons/checked.svg'

const propTypes = {
  checked: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string
}

const defaultProps = {
  checked: false,
  onClick: () => {},
  height: '28px',
  width: '28px'
}

const Component = ({ checked, onClick, height, width }) => {
  return (
    <Wrapper height={height} width={width} onClick={onClick}>
      {checked && <Icon height={height} width={width} source={Tickbox} />}
    </Wrapper>
  )
}

Component.propTypes = propTypes
Component.defaultProps = defaultProps
export const CheckBox = Component

const Wrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 10px;
  height: ${props => props.height};
  width: ${props => props.width};
`
