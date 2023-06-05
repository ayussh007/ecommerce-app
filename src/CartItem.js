import React, { useContext } from "react";
import { WishlistContext } from "./WishlistContext";

export default function CartItem({ item, onIncreaseQuantity, onDecreaseQuantity, onRemoveItem }) {
  const { addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  const handleIncreaseQuantity = () => {
    onIncreaseQuantity(item.id);
  };

  const handleDecreaseQuantity = () => {
    onDecreaseQuantity(item.id);
  };

  const handleRemoveItem = () => {
    onRemoveItem(item.id);
  };

  const handleAddToWishlist = () => {
    addToWishlist(item);
    removeFromWishlist(item);
  };
  

  return (
    <div key={item._id} className="card horizontal-container">
      <div className="card-horizontal">
        <img className="card-img horizontal-img" src={item.image} alt={item.title} />
        <div className="card-info">
          <div className="card-title">
            <div>
              <h4>{item.name}</h4>
              <p className="card-description">{item.author}</p>
            </div>
          </div>
          <div className="price">
            <p className="disc-price">₹{item.price}</p>
          </div>
          <div className="qty">
            <button className="minus" onClick={handleDecreaseQuantity}>
              -
            </button>
            <button className="add" onClick={handleIncreaseQuantity}>
              +
            </button>
          </div>
        </div>
      </div>
      <div className="horizontal-btn">
        <button className="remove-btn" onClick={handleRemoveItem}>
          REMOVE
        </button>
        <button className="later-btn" onClick={handleAddToWishlist}>
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}
