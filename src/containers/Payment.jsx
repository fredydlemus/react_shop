import React from 'react';
import AppContext from '../context/AppContext';
import handleSumTotal from '../utils/handleSumTotal';
import { PayPalButton } from 'react-paypal-button-v2';
import { useNavigate } from 'react-router-dom';
import '../styles/components/Payment.css';

const Payment = () => {

    const {state, addNewOrder, removeAllFromCart} = React.useContext(AppContext);
    const {cart, buyer} = state;

    const navigate = useNavigate();

    const paypalOptions = {
        clientIdPaypal: String(process.env.CLIENT_ID_PP),
        intent: 'capture',
        currency: 'USD'
    }

    const buttonStyles = {
        layout: 'vertical',
        shape: 'rect'
    }

    const handlePaymentSuccess = (data) =>{
        
        
        if(data.status === 'COMPLETED'){
            const newOrder = {
                buyer: buyer,
                products: cart,
                payment: data
            }
            addNewOrder(newOrder);
            removeAllFromCart();
            navigate('/checkout/success');
        }
    }

    return (
        <div className="Payment">
            <div className="Payment-content">
                <h3>Resumen del pedido:</h3>
                {cart.map((item) =>(
                    <div className="Payment-item" key={item.id}>
                        <div className="Payment-element">
                            <h4>{item.title}</h4>
                            <span>${' '}{item.price}</span>
                        </div>
                    </div>
                ))}
                <div className="Payment-button">
                    <PayPalButton
                        paypalOptions={paypalOptions}
                        buttonStyles={buttonStyles}
                        amount={handleSumTotal(cart)}
                        onPaymentStart ={() => console.log('Start Payment')}
                        onSuccess={data => handlePaymentSuccess(data)}
                        onError={error => console.log(error)}
                        onCancel={data => console.log(data)}
                    />
                </div>
            </div>
            <div>
                
            </div>
        </div>
    );
}

export default Payment;