import React, { Component } from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Nav = tw.nav`
  bg-white
  font-sans
  flex flex-col content-center
  sm:flex-row sm:justify-between
  shadow
  text-center sm:text-left
  sm:items-baseline
`;

const NavItemLink = tw.a`
  text-md
  no-underline
  text-grey-darker
  hover:text-blue-dark
  ml-2
  px-1
`;

const NavItem = styled.div`
  ${tw`
    px-4 py-2
  `};
  a {
    ${tw`
      block
      text-md
      no-underline
      text-gray-600 hover:text-black
    `}
  }
`;

const NavItemTitle = tw.div`
  self-center mr-2
`;

const NavItemText = tw.span`

`;

const NavSpacer = tw.span`

`;

const Navbar = ({children}) => {
  return (
    <Nav>{children}</Nav>
  );
};

const Container = tw.div`
  flex flex-wrap
  mx-auto
  pt-0
`;

const SidebarContainer = tw.div`
  h-screen
  bg-white
  w-15
  shadow
  hidden md:block
`;

const Sidebar = tw.div`
  pt-10
`;

const SidebarItem = styled.span`
  a {
    ${tw`
      block
      text-blue-700
      hover:text-white
      px-2 py-2
    `}
  }
  ${tw`
    bg-white
    hover:bg-blue-500
    block
    cursor-pointer
    m-2
    hover:text-white
    rounded
    hover:shadow focus:shadow
    text-center
    text-blue-700 hover:text-white
  `}
`;

const MainContainer = tw.div`
  flex-1
  max-h-screen
  overflow-hidden
`;

const Layout = (props) => (
  <Container>
    <SidebarContainer>
      {props.sidebar}
    </SidebarContainer>
      {props.navbar}
      {props.main}
  </Container>
);

export {
  Layout,
  Container,
  SidebarContainer,
  Sidebar,
  SidebarItem,
  MainContainer,
  Navbar,
  NavItem,
  NavItemTitle,
  NavItemText,
  NavItemLink,
  NavSpacer
};

