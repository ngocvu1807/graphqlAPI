import React from 'react'
import styled from 'styled-components'
import { BrowserRouter as Router, Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <Wrapper>
      <Router>
        <P>Double-click to edit a todo</P>
        {/* Remove the below line ↓ */}
        <P>
          Template by{' '}
          <StyledLink to="http://sindresorhus.com">Sindre Sorhus</StyledLink>
        </P>
        {/* Change this out with your name and url ↓ */}
        <P>
          Created by <StyledLink to="http://todomvc.com">ntheanh201</StyledLink>
        </P>
        <P>
          Part of <StyledLink to="http://todomvc.com">TodoMVC</StyledLink>
        </P>
      </Router>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  margin: 65px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
`

const P = styled.p`
  line-height: 1;
`

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`
