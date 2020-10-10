/**
 * Represents a Cart..
 * @constructor
 * @method add - add items to cart.
 * @method remove - remove items from the cart.
 * @method checkout - checkout the cart.
 * @method empty - empty th cart.
 * @property items - read-only - gives the Cart items.
 * @property cost - read-only - gives the cost of item in cart currently
 */

function Cart() {
  const MAX_ALLOWED = 10;
  let cartItems = [];
  let cartCost = 0;

  /**
   * add item to the cart.
   * @param {object} item - {id(number),name(string),price(number)}
   */
  this.add = function (item) {
    try {
      if (cartItems.length === MAX_ALLOWED) {
        throw new Error("Sorry,Cart Full");
      } else {
        cartCost += item.price;
        cartItems.push(item);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /**
   * remove item from cart
   * @param {number} id - id of object to be removed
   */
  this.remove = function (id) {
    try {
      if (this.items.length === 0) {
        throw new Error("Sorry,Cart Empty");
      }
      let costThisItem = 0,
        itemPresent = false;

      for (let item of cartItems) {
        if (item.id === id) {
          itemPresent = true;
          costThisItem = item.price;
        }
      }

      if (itemPresent) {
        cartCost -= costThisItem;
        cartItems = cartItems.filter((item) => item.id !== id);
      } else {
        throw new Error("Item not present in the cart");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  /*Display the total price, print checking out, and empty the Cart*/
  this.checkout = function () {
    console.log(`Total price of the cart: ${cartCost}`);
    console.log("Checking Out ...");
    this.empty();
  };

  /*Empty the cart*/

  this.empty = function () {
    cartCost = 0;
    cartItems.length = 0;
  };

  Object.defineProperties(this, {
    items: {
      // writable: false,
      configurable: false,
      get: function () {
        return cartItems;
      }
    },
    cost: {
      // writable: false,
      configurable: false,
      get: function () {
        return cartCost;
      }
    }
  });
}

/* Testing the CART constructor */

let myCart = new Cart();
myCart.add({ id: 1, name: "pen1", price: 100 });
myCart.add({ id: 2, name: "pen2", price: 200 });
myCart.add({ id: 3, name: "pen3", price: 150 });
myCart.remove(1);
console.log(myCart.items);
console.log(myCart.cost);
myCart.checkout();
myCart.add({ id: 1, name: "pen1", price: 100 });
console.log(myCart.items);
