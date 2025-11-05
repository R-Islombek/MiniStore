import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Card.css';

const Card = () => {
  const [cartItems, setCartItems] = useState([]);

  // LocalStorage dan savat ma'lumotlarini o'qish
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Mahsulot miqdorini oshirish
  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Mahsulot miqdorini kamaytirish
  const decreaseQuantity = (id) => {
    const updatedCart = cartItems.map(item =>
      item.id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Mahsulotni savatdan o'chirish
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Umumiy summani hisoblash
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  // Savat bo'sh bo'lsa
  if (cartItems.length === 0) {
    return (
      <div className="card-page">
        <div className="container">
          <div className="empty-cart">
            <div className="empty-cart__icon">🛒</div>
            <h2 className="empty-cart__title">Savat bo'sh</h2>
            <p className="empty-cart__text">Sizning savatingizda hali mahsulot yo'q</p>
            <Link to="/" className="empty-cart__button">
              Xaridni davom ettirish
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-page">
      <div className="container">
        <h1 className="card-page__title">Savat</h1>
        
        <div className="card-content">
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__image">
                  <img src={item.image} alt={item.title} />
                </div>
                
                <div className="cart-item__info">
                  <h3 className="cart-item__title">{item.title}</h3>
                  <p className="cart-item__price">{item.price}</p>
                  {item.discount && (
                    <p className="cart-item__old-price">{item.discount}</p>
                  )}
                </div>

                <div className="cart-item__quantity">
                  <button 
                    className="quantity-btn"
                    onClick={() => decreaseQuantity(item.id)}
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="quantity-number">{item.quantity}</span>
                  <button 
                    className="quantity-btn"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item__total">
                  ${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}
                </div>

                <button 
                  className="cart-item__remove"
                  onClick={() => removeFromCart(item.id)}
                >
                  🗑️
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3 className="summary-title">Buyurtma xulosasi</h3>
            
            <div className="summary-row">
              <span>Jami:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>
            
            <div className="summary-row">
              <span>Yetkazib berish:</span>
              <span>Bepul</span>
            </div>
            
            <div className="summary-row summary-total">
              <span>Umumiy summa:</span>
              <span>${getTotalPrice().toFixed(2)}</span>
            </div>

            <button className="checkout-btn">
              To'lovga o'tish
            </button>

            <Link to="/" className="continue-shopping">
              Xaridni davom ettirish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;