import React from 'react'
import StripeCheckout from 'react-stripe-checkout';

export default class TakeMoney extends React.Component {
    constructor(props) {
        super(props); // Always call super() with props
    }
  onToken = (token) => {
    fetch('/save-stripe-token', {
      method: 'POST',
      body: JSON.stringify(token),
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`);
      });
    });
  }

  // ...

  render() {
    return (
      // ...
      <StripeCheckout
        token={this.onToken}
        stripeKey="pk_test_51QiZLTFg56OMjG6cxTNXT5hcjX3ohnXkZ04nzCptSUsstXKy8AHbWMAahuccyaSeokrDI6gumBlsq99mjyOqm1Xu00m0iUFrdo"
        amount={this.props.order.ticket.price * 100}
        email={this.props.currentUser.email}
      />
    )
  }
}