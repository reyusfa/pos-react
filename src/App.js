import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import tw from 'tailwind.macro';
import styled, { createGlobalStyle } from 'styled-components';
import Theme from './components/Theme';
import { Navbar, NavItem, NavItemLink, NavSpacer, NavItemTitle } from './components/Navbar';
import { Container, SidebarContainer, Sidebar, SidebarItem, MainContainer } from './components/Sidebar';
import Welcome from './pages/Welcome';
import Order from './pages/Order';
import Product from './pages/Product';
import Login from './pages/Login';
import Modal, { ModalProvider } from 'styled-react-modal';
import { FormInputData, FormLabel, FormContainer, FormInputGroup, FormButtonData } from './components/Form';
import { ModalButton, FadingBackground } from './components/Modal';
import { AddBox } from 'styled-icons/material';

const SidebarAddBox = styled(AddBox)`
  ${tw`
    text-black hover:text-blue-500
    cursor-pointer
    m-auto
  `}
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #eeeeee;
    margin: 0;
    padding: 0;
    ${tw`font-sans`};
  }
  * {
    box-sizing: border-box;
  }
  a {
    margin: auto;
    padding: auto;
    text-decoration: none;
  }
  input {
    box-sizing: border-box;
  }
  .input {
    transition: border 0.2s ease-in-out;
    min-width: 280px
  }
  .input:focus+.label,
  .input:active+.label,
  .input.filled+.label {
    font-size: .70rem;
    transition: all 0.2s ease-out;
    top: -0.3rem;
    color: #667eea;
  }
  .label {
    transition: all 0.2s ease-out;
    top: 0.3rem;
    left: 0;
  }
  .modal {
    transition: opacity 0.25s ease;
  }
  body.modal-active {
    overflow-x: hidden;
    overflow-y: visible !important;
  }
`;

const Navigation = () => (
  <Navbar>
    <NavItemTitle>Welcome</NavItemTitle>
    <NavItem>
      <Link to="/order">Order</Link>
      <Link to="/product">Product</Link>
    </NavItem>
  </Navbar>
);

class App extends Component {
  render() {
    return (
      <Theme>
        <GlobalStyle />
        <BrowserRouter>
          <Switch>
            <Route path="/order">
              <Container>
                <SidebarContainer>
                  <Sidebar>
                    <SidebarItem>C</SidebarItem>
                    <SidebarItem>R</SidebarItem>
                    <SidebarItem>U</SidebarItem>
                    <SidebarItem>D</SidebarItem>
                  </Sidebar>
                </SidebarContainer>
                <MainContainer>
                  <Navigation />
                  <Order />
                </MainContainer>
              </Container>
            </Route>
            <Route path="/product">
              <Container>
                <SidebarContainer>
                  <Sidebar>
                  </Sidebar>
                  <ModalProvider backgroundComponent={FadingBackground}>
                    <ModalButton label={(<SidebarAddBox size="30" />)}>
                      <form method="post">
                        <FormContainer>
                          <FormInputGroup>
                            <FormInputData name="name" placeholder="Nama Produk" />
                          </FormInputGroup>
                          <FormInputGroup>
                            <FormInputData name="price" placeholder="Harga" />
                          </FormInputGroup>
                          <FormInputGroup>
                            <FormInputData name="description" placeholder="Deskripsi" />
                          </FormInputGroup>
                          <FormButtonData label="Tambahkan" />
                        </FormContainer>
                      </form>
                    </ModalButton>
                  </ModalProvider>
                </SidebarContainer>
                <MainContainer>
                  <Navigation />
                  <Product />
                </MainContainer>
              </Container>
            </Route>
            <Route exact path="/">
              <Container>
                <SidebarContainer>
                  <Sidebar>
                    <SidebarItem>C</SidebarItem>
                    <SidebarItem>R</SidebarItem>
                    <SidebarItem>U</SidebarItem>
                    <SidebarItem>D</SidebarItem>
                  </Sidebar>
                </SidebarContainer>
                <MainContainer>
                  <Navigation />
                  <Welcome />
                </MainContainer>
              </Container>
            </Route>
            <Route path="/login">
              {props => (
                <Login {...props} />
              )}
            </Route>
          </Switch>
        </BrowserRouter>
      </Theme>
    );
  }
}

export default App;

