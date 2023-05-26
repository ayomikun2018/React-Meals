import { useRef, useState } from 'react';
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

import classes from './Checkout.module.css';
import CartContext from '../../store/cart-context';
import { useContext } from 'react';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const cartCtx = useContext(CartContext);
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostalCodeIsValid;

    if (!formIsValid) {
      return;
    }
    props.onConfirm({
        name: enteredName,
        street: enteredStreet,
        city: enteredCity,
        postalCode: enteredPostalCode,
    })
    // Submit cart data
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? '' : classes.invalid
  }`;
  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? '' : classes.invalid
  }`;
  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? '' : classes.invalid
  }`;
  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? '' : classes.invalid
  }`;

  const config = {
    public_key: 'FLWPUBK_TEST-5e4ffbb2f58ae0f8eaf6e1e4cfb13141-X',
    tx_ref: Date.now(),
    amount: cartCtx.totalAmount,
    currency: 'NGN',
    payment_options: 'card,mobilemoney,ussd',
    customer: {
      email: 'user@gmail.com',
       phone_number: '070********',
      name: 'john doe',
    },
    customizations: {
      title: 'React Meals',
      description: 'Payment for items in cart',
      logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
    },
  };
  const handleFlutterPayment = useFlutterwave(config);
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postal code (5 characters long)!</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit} onClick={() => {
          handleFlutterPayment({
            callback: (response) => {
               console.log(response);
                closePaymentModal() // this will close the modal programmatically
            },
            onClose: () => {},
          });
        }}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;

//before payment
// import { useRef, useState } from 'react';

// import classes from './Checkout.module.css';

// const isEmpty = (value) => value.trim() === '';
// const isFiveChars = (value) => value.trim().length === 5;

// const Checkout = (props) => {
//   const [formInputsValidity, setFormInputsValidity] = useState({
//     name: true,
//     street: true,
//     city: true,
//     postalCode: true,
//   });

//   const nameInputRef = useRef();
//   const streetInputRef = useRef();
//   const postalCodeInputRef = useRef();
//   const cityInputRef = useRef();

//   const confirmHandler = (event) => {
//     event.preventDefault();

//     const enteredName = nameInputRef.current.value;
//     const enteredStreet = streetInputRef.current.value;
//     const enteredPostalCode = postalCodeInputRef.current.value;
//     const enteredCity = cityInputRef.current.value;

//     const enteredNameIsValid = !isEmpty(enteredName);
//     const enteredStreetIsValid = !isEmpty(enteredStreet);
//     const enteredCityIsValid = !isEmpty(enteredCity);
//     const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

//     setFormInputsValidity({
//       name: enteredNameIsValid,
//       street: enteredStreetIsValid,
//       city: enteredCityIsValid,
//       postalCode: enteredPostalCodeIsValid,
//     });

//     const formIsValid =
//       enteredNameIsValid &&
//       enteredStreetIsValid &&
//       enteredCityIsValid &&
//       enteredPostalCodeIsValid;

//     if (!formIsValid) {
//       return;
//     }
//     props.onConfirm({
//         name: enteredName,
//         street: enteredStreet,
//         city: enteredCity,
//         postalCode: enteredPostalCode,
//     })
//     // Submit cart data
//   };

//   const nameControlClasses = `${classes.control} ${
//     formInputsValidity.name ? '' : classes.invalid
//   }`;
//   const streetControlClasses = `${classes.control} ${
//     formInputsValidity.street ? '' : classes.invalid
//   }`;
//   const postalCodeControlClasses = `${classes.control} ${
//     formInputsValidity.postalCode ? '' : classes.invalid
//   }`;
//   const cityControlClasses = `${classes.control} ${
//     formInputsValidity.city ? '' : classes.invalid
//   }`;

//   return (
//     <form className={classes.form} onSubmit={confirmHandler}>
//       <div className={nameControlClasses}>
//         <label htmlFor='name'>Your Name</label>
//         <input type='text' id='name' ref={nameInputRef} />
//         {!formInputsValidity.name && <p>Please enter a valid name!</p>}
//       </div>
//       <div className={streetControlClasses}>
//         <label htmlFor='street'>Street</label>
//         <input type='text' id='street' ref={streetInputRef} />
//         {!formInputsValidity.street && <p>Please enter a valid street!</p>}
//       </div>
//       <div className={postalCodeControlClasses}>
//         <label htmlFor='postal'>Postal Code</label>
//         <input type='text' id='postal' ref={postalCodeInputRef} />
//         {!formInputsValidity.postalCode && (
//           <p>Please enter a valid postal code (5 characters long)!</p>
//         )}
//       </div>
//       <div className={cityControlClasses}>
//         <label htmlFor='city'>City</label>
//         <input type='text' id='city' ref={cityInputRef} />
//         {!formInputsValidity.city && <p>Please enter a valid city!</p>}
//       </div>
//       <div className={classes.actions}>
//         <button type='button' onClick={props.onCancel}>
//           Cancel
//         </button>
//         <button className={classes.submit}>Confirm</button>
//       </div>
//     </form>
//   );
// };

// export default Checkout;