import React from 'react'
import styled from 'styled-components'

const defaultProps = {
  height: '20px',
  width: '20px'
}

export const Icon = ({
  source,
  height,
  fill,
  width,
  className,
  isImage = false,
  ...props
}) => {
  if (/.(jpe?g|png|gif|bmp)$/i.test(source) || isImage) {
    return (
      <IconImage
        className={className}
        src={source}
        height={height}
        width={width}
        {...props}
      />
    )
  } else {
    return (
      <IconSource
        className={className}
        fill={fill}
        height={height}
        width={width}
        dangerouslySetInnerHTML={{ __html: source }}
        {...props}
      />
    )
  }
}

Icon.defaultProps = defaultProps

const IconImage = styled.img``

const IconSource = styled.div`
  svg {
    height: ${props => props.height};
    width: ${props => props.width};
  }
  ${props =>
    props.fill &&
    `
    path {
      fill: ${props.fill};
    }
  `};
`
