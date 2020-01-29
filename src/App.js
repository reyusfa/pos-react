import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import tw from 'tailwind.macro';
import styled, { createGlobalStyle } from 'styled-components';
//import Theme from './components/Theme';
import Welcome from './pages/Welcome';
import Order from './pages/Order';
import Product from './pages/Product';
import Login from './pages/Login';
import Modal, { ModalProvider } from 'styled-react-modal';
import { FormInputData, FormLabel, FormContainer, FormInputGroup, FormButtonData } from './components/Form';
import { ModalButton, FadingBackground } from './components/Modal';
import { AddBox } from 'styled-icons/material';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import { Navbar, NavItem, NavItemLink, NavSpacer, NavItemTitle, Layout, Container, SidebarContainer, Sidebar, SidebarItem, MainContainer } from './components/Layout';
import { Add, Widgets, ShoppingCart } from 'styled-icons/material';

const SidebarAddBox = styled(AddBox)`
  ${tw`
    text-black hover:text-blue-500
    cursor-pointer
    m-auto
  `}
`;

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }
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

const SidebarOrder = () => (
  <Sidebar>
    <SidebarItem>
      <Link to="/order"><ShoppingCart size="25" /></Link>
    </SidebarItem>
    <SidebarItem>
      <Link to="/product"><Widgets size="25" /></Link>
    </SidebarItem>
  </Sidebar>
);

class App extends Component {
  constructor(props){
    const data = localStorage.getItem('data');
    super(props);
    this.state = {
      isLogin: false,
      token: data ? JSON.parse(data).token : '',
      newProduct: {}
    }
  }
  
  componentDidMount() {
  }

  onImageInput = (event) => {
    event.preventDefault();
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        image: event.target.files[0]
      }
    });
  }

  onNameInput = (event) => {
    event.preventDefault();
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        name: event.target.value
      }
    });
  }

  onCategoryIdInput = (event) => {
    event.preventDefault();
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        category_id: event.target.value
      }
    });
  }

  onPriceInput = (event) => {
    event.preventDefault();
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        price: event.target.value
      }
    });
  }

  onDescriptionInput = (event) => {
    event.preventDefault();
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        description: event.target.value
      }
    });
  }
  
  onProductSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', this.state.newProduct.image);
    formData.append('name', this.state.newProduct.name);
    formData.append('category_id', this.state.newProduct.category_id);
    formData.append('price', this.state.newProduct.price);
    formData.append('description', this.state.newProduct.description);
    await axios.post(`http://localhost:3001/products`, formData, {
      headers: {
        authorization: this.state.token
      }
    }).then(res => {
      if(res.data.status === 200) {
        this.setState({newProduct: []})
      }
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  }
  
  render() {
    const renderHome = () => (
      <Layout
        sidebar={<SidebarOrder />}
        main={<Welcome {...this.props} />}
      />
    );
    const renderOrder = () => (
      <Layout
        sidebar={<SidebarOrder />}
        main={<Order {...this.props} />}
      />
    );
    const renderProduct = () => (
      <Layout
        sidebar={<SidebarOrder />}
        main={<Product {...this.props} />}
      />
    );
    console.log(this.state.newProduct);
    return (
        <BrowserRouter>
        <GlobalStyle />
          <Switch>
            <AuthenticatedRoute exact path="/" component={renderHome} />
            <AuthenticatedRoute path="/order" component={renderOrder} />
            <AuthenticatedRoute exact path="/product" component={renderProduct} />
            <Route path="/product/old">
              <Container>
                <SidebarContainer>
                  <Sidebar>
                  </Sidebar>
                  <ModalProvider backgroundComponent={FadingBackground}>
                    <ModalButton label={(<SidebarAddBox size="30" />)} ref={this.Modal}>
                      <FormContainer>
                        <FormInputGroup>
                          <FormInputData type="file" name="image" handleChange={(event) => {this.onImageInput(event)}} />
                        </FormInputGroup>
                        <FormInputGroup>
                          <FormInputData name="name" placeholder="Nama Produk" handleChange={(event) => this.onNameInput(event)} />
                        </FormInputGroup>
                        <FormInputGroup>
                          <FormInputData name="category_id" placeholder="Kategori" handleChange={(event) => this.onCategoryIdInput(event)} />
                        </FormInputGroup>
                        <FormInputGroup>
                          <FormInputData name="price" placeholder="Harga" handleChange={(event) => this.onPriceInput(event)} />
                        </FormInputGroup>
                        <FormInputGroup>
                          <FormInputData name="description" placeholder="Deskripsi" handleChange={(event) => this.onDescriptionInput(event)} />
                        </FormInputGroup>
                        <FormButtonData label="Tambahkan" handleClick={(event) => this.onProductSubmit(event)} />
                      </FormContainer>
                    </ModalButton>
                  </ModalProvider>
                </SidebarContainer>
                <MainContainer>
                  <Navigation />
                  <Product />
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
    );
  }
}

export default App;

