import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Nav = tw.nav`
  bg-white
  font-sans
  flex flex-col content-center
  sm:flex-row sm:justify-between
  shadow
  text-center sm:text-left
  px-6 py-3
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
  ${tw`sm:mb-0 self-center`};
  a {
    ${tw`text-md no-underline text-gray-600 hover:text-black px-4 py-3 w-full`}
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

export {
  Navbar,
  NavItem,
  NavItemTitle,
  NavItemText,
  NavItemLink,
  NavSpacer
};

