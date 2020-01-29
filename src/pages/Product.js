import React, { Component } from 'react';
import tw from 'tailwind.macro';
import styled from 'styled-components';
import axios from 'axios';
import Modal, { ModalProvider } from 'styled-react-modal';
import { FormInputData, FormLabel, FormContainer, FormInputGroup, FormButtonData } from '../components/Form';
import { ModalButton, FadingBackground } from '../components/Modal';
import { Delete, Edit, Info } from 'styled-icons/material';
import { Navbar, NavItem, NavItemLink, NavSpacer, NavItemTitle, Layout, Container, SidebarContainer, Sidebar, SidebarItem, MainContainer } from '../components/Layout';
import { AddBox } from 'styled-icons/material';

const FormDelete = styled(Delete)`
  ${tw`
    text-gray-800 hover:text-red-600
    cursor-pointer
    m-auto
  `}
`;

const FormInfo = styled(Info)`
  ${tw`
    text-gray-800 hover:text-yellow-600
    cursor-pointer
    m-auto
  `}
`;

const FormEdit = styled(Edit)`
  ${tw`
    text-gray-800 hover:text-blue-600
    cursor-pointer
    m-auto
  `}
`;

const CardContainer = styled.div`
  ${tw`
    flex flex-wrap content-start
    overflow-y-scroll
    p-2
  `}
  height: 90%
`;

const Card = tw.div`
  w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5
  max-w-xs
  p-2
`;

const CardItem = tw.div`
  bg-white
  border border-solid border-gray-400
  hover:border-blue-500
  cursor-pointer
  overflow-hidden
  rounded-lg
  shadow hover:shadow-lg
  relative
`;

const CardTitle = tw.div`
  bg-white
  shadow
  rounded-lg
  py-1 px-2
  m-2
  absolute
  top-0
  left-0
  text-sm
`;

const CardImage = tw.img`
  h-40
  block
  object-cover
  w-full
`;

const CardAction = tw.div`
  flex w-full
`;

const CardActionItem = tw.div`
  w-1/2
  p-2
  text-center
`;

class Product extends Component {
  constructor(props) {
    const data = localStorage.getItem('data');
    super(props);
    this.state = {
      dataProducts: [],
      totalPages: 0,
      limitPages: 10,
      currentPage: 1,
      detailProduct: {},
      newProduct: {},
      search: '',
      name: '',
      sort: 'name.asc',
      page: 1,
      limit: 10,
      token: data ? JSON.parse(data).token : ''
    };
  }
  
  async componentDidMount() {
    await axios.get(`http://localhost:3001/products`, {
      headers: { authorization: this.state.token }
    }).then(res => {
      if(res.data.status === 200) {
        this.setState((prevState, props) => {
          return {
            ...prevState,
            dataProducts: res.data.data,
            totalPages: Math.ceil(res.data.data.length / this.state.limitPages) || 0
          }
        });
        console.log(res.data.data.length);
      } else {
        console.log(res.data.error);
      }
    });
  }
  
  productDelete = async (id) => {
    await axios.delete(`http://localhost:3001/products/${id}`, {
      headers: { authorization: this.state.token }
    }).then(res => {
      if(res.data.status === 200) {
        console.log('Delete success!');
        console.log(this.state.dataProducts);
      }
      console.log(res.data);
    }).catch(err => {
      console.log(err);
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
        this.setState()
      }
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  }
  
  productEdit = async (event, id) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', this.state.detailProduct.image);
    formData.append('name', this.state.detailProduct.name);
    formData.append('category_id', this.state.detailProduct.category_id);
    formData.append('price', this.state.detailProduct.price);
    formData.append('description', this.state.detailProduct.description);
    
    await axios.put(`http://localhost:3001/products/${id}`, formData, {
      headers: {
        authorization: this.state.token
      }
    }).then(res => {
      if(res.data.status === 200) {
        console.log('Edit success!');
        console.log(this.state.dataProducts);
      }
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  }
  
  productInfo = async (id) => {
    await axios.get(`http://localhost:3001/products/${id}`, {
      headers: { authorization: this.state.token }
    }).then(res => {
      if(res.data.status === 200) {
        this.setState({ detailProduct: {} });
        this.setState({ detailProduct: res.data.data });
      } else {
        console.log(res.data.error);
      }
      console.log('Product details');
      console.log(res.data.data);
    }).catch(err => {
      console.log(err);
    });
  }
  
  onNameChange = (event) => {
    event.preventDefault();
    this.setState({
      detailProduct: {
        ...this.state.detailProduct,
        name: event.target.value
      }
    });
  }
  
  onImageChange = (event) => {
    event.preventDefault();
    this.setState({
      detailProduct: {
        ...this.state.detailProduct,
        image: event.target.files[0]
      }
    });
  }
  
  onCategoryIdChange = (event) => {
    event.preventDefault();
    this.setState({
      detailProduct: {
        ...this.state.detailProduct,
        category_id: event.target.value
      }
    });
  }
  
  onDescriptionChange = (event) => {
    event.preventDefault();
    this.setState({
      detailProduct: {
        ...this.state.detailProduct,
        description: event.target.value
      }
    });
  }
  
  onPriceChange = (event) => {
    event.preventDefault();
    this.setState({
      detailProduct: {
        ...this.state.detailProduct,
        price: event.target.value
      }
    });
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

  onPriceInput = (event, value) => {
    event.preventDefault();
    this.setState({
      newProduct: {
        ...this.state.newProduct,
        price: value
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
  
  onRequestProducts = async ({ name, sort, limit }) => {
    const _name = this.state.name || '';
    const _sort = this.state.sort || 'name.asc';
    const _page = this.state.page || 1;
    const _limit = this.state.limit || 10;
    if(_name && _name !== '') {
      await axios.get(`http://localhost:3001/products?filter[name]=${_name}&sort=${_sort}&page=${_page}&limit=${_limit}`).then(res => {
        this.setState((prevState, currentProps) => {
          return {
            ...prevState,
            dataProducts: [...res.data.data]
          }
        });
      });
    } else {
      await axios.get(`http://localhost:3001/products?sort=${_sort}&page=${_page}&limit=${_limit}`).then(res => {
        this.setState((prevState, currentProps) => {
          return {
            ...prevState,
            dataProducts: [...res.data.data]
          }
        });
      });
    }
  }
  
  onSelectLimit = (event, limit) => {
    event.preventDefault();
    this.setState((prevState, currentProps) => {
      return {
        ...prevState,
        limit: limit
      }
    });
    this.onRequestProducts({ limit: this.state.limit })
  }
  
  onSearch = async (event, { name, sort, limit }) => {
    event.preventDefault();
    const _name = name || '';
    const _sort = sort || 'name.asc';
    const _page = this.state.page || 1;
    this.setState((prevState, currentProps) => {
      return {
        ...prevState,
        limitPages: limit
      }
    });
    const _limit = this.state.limitPages || 10;
    if(_name && _name !== '') {
      await axios.get(`http://localhost:3001/products?filter[name]=${_name}&sort=${_sort}&page=${_page}&limit=${_limit}`).then(res => {
        this.setState((prevState, currentProps) => {
          return {
            ...prevState,
            dataProducts: [...res.data.data],
            limitPages: _limit
          }
        });
      });
    } else {
      await axios.get(`http://localhost:3001/products?sort=${_sort}&page=${_page}&limit=${_limit}`).then(res => {
        this.setState((prevState, currentProps) => {
          return {
            ...prevState,
            dataProducts: [...res.data.data],
            limitPages: _limit
          }
        });
      });
    }
  }
  
  render() {
    //console.log(this.state.totalPages);
    const Pagination = () => {
      let page = ''
      for(let i = 1; i <= this.state.totalPages; i++) {
        page = page + i;
      }
      return (page)
    };
    const Navigation = () => (
      <Navbar>
        <NavItem>
          <NavItemTitle>Produk</NavItemTitle>
        </NavItem>
        <NavItem>
          <ModalProvider backgroundComponent={FadingBackground}>
            <ModalButton label={(<AddBox size="30" />)} ref={this.Modal}>
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
                  <FormInputData name="price" placeholder="Harga" handleChange={(event) => this.onPriceInput(event, event.target.value)} />
                </FormInputGroup>
                <FormInputGroup>
                  <FormInputData name="description" placeholder="Deskripsi" handleChange={(event) => this.onDescriptionInput(event)} />
                </FormInputGroup>
                <FormButtonData label="Tambahkan" handleClick={(event) => this.onProductSubmit(event)} />
              </FormContainer>
            </ModalButton>
          </ModalProvider>
        </NavItem>
      </Navbar>
    );
    const products = this.state.dataProducts.map(product => {
      return (
        <Card key={product.id}>
          <CardItem>
            <CardImage src={`http://localhost:3001/${product.image || 'public/images/image-placeholder.jpg'}`} alt={product.name} />
            <CardTitle>{product.name}</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormInfo onClick={ async (event) => { await this.productInfo(product.id)}} size="20" />
              </CardActionItem>
              <CardActionItem>
                <ModalProvider backgroundComponent={FadingBackground}>
                  <ModalButton label={(
                  <FormEdit size="20" onClick={(event) => {this.productInfo(product.id)}} />)}>
                    <FormContainer>
                      <FormInputGroup>
                        <img src={this.state.detailProduct.image} />
                        <FormInputData type="file" name="image" handleChange={(event) => {this.onImageChange(event)}} />
                      </FormInputGroup>
                      <FormInputGroup>
                        <FormInputData name="name" placeholder="Nama Produk" defaultValue={this.state.detailProduct.name} handleChange={(event) => {this.onNameChange(event)}} />
                      </FormInputGroup>
                      <FormInputGroup>
                        <FormInputData name="category_id" placeholder="Kategori" defaultValue={this.state.detailProduct.category_id} handleChange={(event) => {this.onCategoryIdChange(event)}} />
                      </FormInputGroup>
                      <FormInputGroup>
                        <FormInputData name="price" placeholder="Harga" defaultValue={this.state.detailProduct.price} handleChange={(event) => {this.onPriceChange(event)}} />
                      </FormInputGroup>
                      <FormInputGroup>
                        <FormInputData name="description" placeholder="Deskripsi" defaultValue={this.state.detailProduct.description} handleChange={(event) => {this.onDescriptionChange(event)}} />
                      </FormInputGroup>
                      <FormButtonData handleClick={(event) => {this.productEdit(event, this.state.detailProduct.id)}} label="Edit" />
                    </FormContainer>
                  </ModalButton>
                </ModalProvider>
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" onClick={(event) => {this.productDelete(product.id)}} />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
      );
    });
    return (
      <MainContainer>
        <Navigation />
        <CardContainer>
          <select onChange={(event) => this.onSearch(event, {sort: event.target.value})}>
            <option value="name.asc">Nama Produk (A - Z)</option>
            <option value="name.desc">Nama Produk (Z - A)</option>
            <option value="price.asc">Harga (0 - 9)</option>
            <option value="price.desc">Harga (9 - 0)</option>
          </select>
          <select onChange={(event) => this.onSelectLimit(event, event.target.value)}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <FormInputData handleChange={(event) => this.onSearch(event, {search: event.target.value})} />
          <ModalProvider backgroundComponent={FadingBackground}>
          {products}
          </ModalProvider>
          <Pagination />
        </CardContainer>
      </MainContainer>
    );
  }
}

export default Product;

