import React from 'react';
import tw from 'tailwind.macro';
import { Navbar, NavItem, NavItemLink, NavSpacer, NavItemTitle, Layout, Container, SidebarContainer, Sidebar, SidebarItem, MainContainer } from '../components/Layout';

const Greeting = tw.div`
  flex-grow
  text-xl text-bold text-red
`;

const Welcome = () => {
  return (
    <MainContainer>
      <Navbar>
        <NavItem>Welcome</NavItem>
      </Navbar>
      <Greeting>Welcome</Greeting>
    </MainContainer>
  );
}

export default Welcome;

