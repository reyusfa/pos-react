import React, { Component } from 'react';
import tw from 'tailwind.macro';
import styled from 'styled-components';
import axios from 'axios';
import qs from 'qs';
import Modal, { ModalProvider } from 'styled-react-modal';
import { FormInputData, FormLabel, FormContainer, FormInputGroup, FormButtonData } from '../components/Form';
import { ModalButton, FadingBackground } from '../components/Modal';
import { Delete, Edit, Info } from 'styled-icons/material';

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
      detailProduct: {},
      token: data ? JSON.parse(data).token : ''
    };
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
  
  productEdit = async (event, id) => {
    event.preventDefault();
    const data = {
      id: this.state.detailProduct.id,
      name: this.state.detailProduct.name,
      price: this.state.detailProduct.price,
      description: this.state.detailProduct.description,
      image: this.state.detailProduct.image
    };
    const body = qs.stringify(data);
    
    await axios.put(`http://localhost:3001/products/${id}`, body, {
      headers: {
        authorization: this.state.token,
        'Content-Type': 'application/json'
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
        image: event.target.value
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
  
  onCategoryIdChange = (event) => {
    event.preventDefault();
    this.setState({
      detailProduct: {
        ...this.state.detailProduct,
        category_id: event.target.value
      }
    });
  }
  
  async componentDidMount() {
    await axios.get('http://localhost:3001/products', {
      headers: { authorization: this.state.token }
    }).then(res => {
      if(res.data.status === 200) {
        this.setState({ dataProducts: res.data.data });
      } else {
        console.log(res.data.error);
      }
    });
  }
  
  render() {
    console.log(this.state.token);
    const products = this.state.dataProducts.map(product => {
      return (
        <Card key={product.id}>
          <CardItem>
            <CardImage src={`http://localhost:3001/${product.image || 'public/images/image-placeholder.jpg'}`} alt={product.name} />
            <CardTitle>{product.name}</CardTitle>
            <CardAction>
              <CardActionItem>
                <ModalButton label={(<FormInfo onClick={(event) => {this.productInfo(product.id)}} size="20" />)}>
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
              </CardActionItem>
              <CardActionItem>
                <FormEdit size="20" onClick={(event) => {this.productDelete(product.id)}} />
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
      <CardContainer>
        <ModalProvider backgroundComponent={FadingBackground}>
        {products}
        </ModalProvider>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <CardImage src="https://violetoon.com/wp-content/uploads/2018/09/placeholder-600x273.jpg" />
            <CardTitle>Test</CardTitle>
            <CardAction>
              <CardActionItem>
                <FormEdit size="20" />
              </CardActionItem>
              <CardActionItem>
                <FormDelete size="20" />
              </CardActionItem>
            </CardAction>
          </CardItem>
        </Card>
      </CardContainer>
    );
  }
}

export default Product;

