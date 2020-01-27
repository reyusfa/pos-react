import React from 'react';
import styled from 'styled-components';
import tw from 'tailwind.macro';

const Container = tw.div`
  flex flex-wrap
  mx-auto
  pt-0
`;

const SidebarContainer = tw.div`
  h-screen
  bg-white
  p-2
  w-15
  shadow
  hidden md:block
`;

const Sidebar = tw.div`
  bg-gray-900
  py-1 px-2
  rounded
  shadow-lg
  text-center
  text-gray-700
`;

const SidebarItem = tw.span`
  block
  cursor-pointer
  my-3
  px-2
  hover:text-white
`;

const MainContainer = tw.div`
  flex-1
  max-h-screen
  overflow-hidden
`;

export {
  Container,
  SidebarContainer,
  Sidebar,
  SidebarItem,
  MainContainer
};

