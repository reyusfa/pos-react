import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import tw from 'tailwind.macro';
import { Remove, Add, Delete } from 'styled-icons/material';
import { Navbar, NavItem, NavItemLink, NavSpacer, NavItemTitle, Layout, Container, SidebarContainer, Sidebar, SidebarItem, MainContainer } from '../components/Layout';

const FormInputData = tw.input`
  appearance-none
  border border-solid border-gray-300
  focus:border-blue-500 hover:border-blue-500
  outline-none
  px-3 py-2
  rounded-sm
  text-md
  w-full
`;

const CardContainer = tw.div`
  w-full sm:w-1/2 md:w-1/3 lg:w-1/4
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

const CardLabel = tw.div`
  border border-solid border-gray-300
  bg-white
  font-bold
  shadow-md
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

const CardTitle = tw.div`
  py-1 px-2
  overflow-hidden
`;

const CardProduct = (props) => {
  return (
    <CardContainer>
      <CardItem onClick={props.onClick}>
        <CardImage src={props.image} alt={props.title} />
        <CardLabel>{props.label}</CardLabel>
        <CardTitle>{props.title}</CardTitle>
      </CardItem>
    </CardContainer>
  );
}

const ReduceIcon = styled(Remove)`
  ${tw`
    text-blue-500
    cursor-pointer
  `}
`;

const AddIcon = styled(Add)`
  ${tw`
    text-blue-500
    cursor-pointer
  `}
`;

const DeleteIcon = styled(Delete)`
  ${tw`
    text-gray-400 hover:text-red-500
    cursor-pointer
    absolute
    right-0
    mx-2
  `}
`;

const OrderContainer = tw.div`
  flex flex-wrap
  h-full
  mx-auto
  w-full
`;

const OrderCartContainer = tw.div`
  bg-white
  shadow
  w-1/3
`;

const OrderCartItemContainer = tw.div`
`;

const OrderCartItem = tw.div`
  p-2
`;

const OrderCartItemName = tw.div`
  font-bold
  font-lg
`;

const OrderCartItemQuantity = styled.div`
  ${tw`
    mt-2
  `}
  span {
    ${tw`
      font-bold
      m-2
    `}
  }
`;

const OrderCartSubtotal = tw.div`
  mt-2
  font-bold
`;

const OrderProductContainer = styled.div`
  ${tw`
    flex flex-wrap content-start
    overflow-y-scroll
    p-2
    w-2/3
  `}
  height: 90%;
`;

const OrderCartCheckoutContainer = tw.div`
  absolute
  bottom-0
`;

const OrderCartCheckout = tw.div`
  cursor-pointer
  p-3
  m-2
  text-lg
  font-bold
  border border-solid border-blue-500 hover:border-blue-700
  bg-blue-400
  hover:bg-blue-600
  text-white
  rounded
  text-center
  w-40
`;

const OrderCartTotal = tw.div`
  p-3
  mx-2 my-20
  text-lg
  font-bold
  absolute
  right-0
  bottom-0
  border-t-2 border-b-0 border-l-0 border-r-0 border-solid border-black
  w-40
  text-right
`;

class Order extends Component {
  constructor(props) {
    super(props);
    const data = localStorage.getItem('data');
    this.state = {
      cart: [],
      order: [],
      totalOrder: 0,
      dataProducts: [],
      user_id: data ? JSON.parse(data).id : '',
      token: data ? JSON.parse(data).token : ''
    }
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
  
  onProductSelect = (event, data) => {
    event.preventDefault();
    if(!this.state.cart.includes(data.product_id)) {
      this.setState((prevState, currentProps) => {
        const calculateTotal = prevState.order.reduce((a, b) => {
          return a + b['subtotal']
        }, 0) + data.price;
        return {
          ...prevState,
          cart: [...prevState.cart, data.product_id],
          order: [...prevState.order, data],
          totalOrder: calculateTotal
        }
      });
    } else {
      this.setState((prevState, currentProps) => {
        const calculateTotal = prevState.order.reduce((a, b) => {
          return a + b['subtotal']
        }, 0) + data.price;
        const newOrder = prevState.order.map(item => {
          if(item.product_id === data.product_id) {
            return {
              name: item.name,
              price: item.price,
              product_id: item.product_id,
              subtotal: item.price * (item.quantity + 1),
              quantity: item.quantity + 1
            }
          } else {
            return item;
          }
        });
        return {
          ...prevState,
          order: [...newOrder],
          totalOrder: calculateTotal
        }
      });
    }
  }
  
  onReduceQuantity = (event, data) => {
    event.preventDefault();
    this.setState((prevState, currentProps) => {
      const calculateTotal = prevState.order.reduce((a, b) => {
        return a + b['subtotal']
      }, 0) - (data.quantity > 1 ? data.price : 0);
      const newOrder = prevState.order.map(item => {
        if(item.product_id === data.product_id && data.quantity > 1) {
          return {
            name: item.name,
            price: item.price,
            product_id: item.product_id,
            subtotal: item.price * (item.quantity - 1),
            quantity: item.quantity - 1
          }
        } else {
          return item;
        }
      });
      return {
        ...prevState,
        order: [...newOrder],
        totalOrder: calculateTotal
      }
    });
  }
  
  onAddQuantity = (event, data) => {
    event.preventDefault();
    this.setState((prevState, currentProps) => {
      const calculateTotal = prevState.order.reduce((a, b) => {
        return a + b['subtotal']
      }, 0) + data.price;
      const newOrder = prevState.order.map(item => {
        if(item.product_id === data.product_id) {
          return {
            name: item.name,
            price: item.price,
            product_id: item.product_id,
            subtotal: item.price * (item.quantity + 1),
            quantity: item.quantity + 1
          }
        } else {
          return item;
        }
      });
      return {
        ...prevState,
        order: [...newOrder],
        totalOrder: calculateTotal
      }
    });
  }
  
  onDeleteItem = (event, data) => {
    event.preventDefault();
    this.setState((prevState, currentProps) => {
      const newCart = this.state.cart.filter(item => {
        return item !== data.product_id;
      });
      const newOrder = this.state.order.filter(item => {
        return item.product_id !== data.product_id;
      });
      const calculateTotal = newOrder.reduce((a, b) => {
        return a + b['subtotal']
      }, 0);
      return {
        ...prevState,
        cart: [...newCart],
        order: [...newOrder],
        totalOrder: calculateTotal
      }
    });
  }
  
  onCheckout = async (event) => {
    const body = {
      user_id: this.state.user_id,
      orders: this.state.order
    };
    if(body.orders.length > 0) {
      await axios.post('http://localhost:3001/orders', body, {
        headers: { authorization: this.state.token }
      }).then(res => {
        console.log(res);
        this.setState({
          cart: [],
          order: []
        });
      }).catch(console.log);
    }
  }
  
  onSearch = async (event, {search}) => {
    const name = search && search !== '' ? `filter[name]=${search}` : '';
    await axios.get(`http://localhost:3001/products?${name}`).then(res => {
      this.setState((prevState, currentProps) => {
        return {
          ...prevState,
          dataProducts: [...res.data.data]
        }
      });
    });
  }
  
  render() {
    console.log(this.state);
    const renderProducts = this.state.dataProducts.map(product => {
      const data = {
        name: product.name,
        price: product.price,
        product_id: product.id,
        subtotal: product.price,
        quantity: 1
      }
      return (
        <CardProduct
          key={product.id}
          image={`http://localhost:3001/${product.image}`}
          label={`${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumSignificantDigits: 1 }).format(product.price)}`}
          title={product.name}
          onClick={(event) => this.onProductSelect(event, data)} />
      );
    });
    const renderCart = this.state.order.map(item => {
      return (
        <OrderCartItem key={item.product_id}>
          <OrderCartItemName>
            {item.name}
            <DeleteIcon
            size="20"
            onClick={(event) => this.onDeleteItem(event, item)} />
          </OrderCartItemName>
          <div style={{display:'flex', justifyContent: 'space-between'}}>
            <OrderCartItemQuantity>
              <span>
                <ReduceIcon
                  size="20"
                  onClick={(event) => this.onReduceQuantity(event, item)} />
              </span>
              <span>
                {item.quantity}
              </span>
              <span>
                <AddIcon
                  size="20"
                   onClick={(event) => this.onAddQuantity(event, item)} />
              </span>
            </OrderCartItemQuantity>
            <OrderCartSubtotal>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.subtotal)}</OrderCartSubtotal>
          </div>
        </OrderCartItem>
      );
    });
    return (
      <MainContainer>
        <Navbar>
          <NavItem>
            <FormInputData placeholder="Cari Nama Produk..." onChange={(event) => this.onSearch(event, {search: event.target.value})} />
          </NavItem>
        </Navbar>
        <OrderContainer>
          <OrderProductContainer>
            {renderProducts}
          </OrderProductContainer>
          <OrderCartContainer>
            <OrderCartItemContainer>
              {renderCart}
            </OrderCartItemContainer>
            <OrderCartTotal>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(this.state.totalOrder)}</OrderCartTotal>
            <OrderCartCheckoutContainer>
              <OrderCartCheckout onClick={(event) => this.onCheckout(event)}>
                Checkout
              </OrderCartCheckout>
            </OrderCartCheckoutContainer>
          </OrderCartContainer>
        </OrderContainer>
      </MainContainer>
    );
  }
}

export default Order;

