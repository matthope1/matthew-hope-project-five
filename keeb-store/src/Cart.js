import React, { Component } from 'react'
import firebase from './firebase';
import Product from './Product'

class Cart extends Component {

    constructor(){
        super();
        this.state = {
            cartSlideOut: false,
        }
    }

    handleClick = (event) => {
        event.preventDefault();

        let slideOutDisplay = this.state.cartSlideOut;

        this.setState({
            cartSlideOut: !slideOutDisplay,
        })
    }

    removeFromCart = (product) => {
        const dbRef = firebase.database().ref('cart/')

        let key = product[0];

        dbRef.child(key).remove();
    }

    render() {
        if (this.state.cartSlideOut){
            //slide out cart display
            let total = 0;
            return (
                <div className="slide-out-cart">
                    <div className="slide-out-cart-container">
                        <h1 href="" onClick={this.handleClick}>x</h1>
                        <p>You have {this.props.cartList.length} item(s) in your cart!</p>
                        {this.props.cartList.map((product) => {

                            let name = Object.keys(product[1]);
                            let productInfo = product[1][Object.keys(product[1])];
                            let key = product[0];

                            total = total + parseInt(productInfo.price);

                            return (
                                <div>
                                    <Product removeFromCart={() => this.removeFromCart(product)} key={key} name={name} productInfo={productInfo} />
                                </div>
                            )
                        })}
                        <div className="cart-info">
                            <hr/>
                            <p>Your order total = ${total} </p>
                        </div>
                    </div> 
                </div>
           )
        }
        else {
            return (
                <div className="nav-bar__cart-icon wrapper">
                    <a href="">
                        <i className="fas fa-shopping-cart" onClick={this.handleClick}></i> 
                    </a>
                    <p>{this.props.cartList.length}</p>
                </div>
            )
        }
    }
}

export default Cart;