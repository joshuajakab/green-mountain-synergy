import React from 'react';
import { SquarePaymentsForm, 
    CreditCardInput,
  } from 'react-square-web-payments-sdk';
  
  const MyPaymentForm = () => (
    <SquarePaymentsForm
      /**
       * Identifies the calling form with a verified application ID
       * generated from the Square Application Dashboard.
       */
      applicationId={process.env.REACT_APP_APPLICATION_ID}
      /**
       * Invoked when payment form receives the result of a tokenize generation request.
       * The result will be a valid credit card or wallet token, or an error.
       */
      cardTokenizeResponseReceived={(token, buyer) => {
        console.info({ token, buyer });
      }}
      /**
       * This function enable the Strong Customer Authentication (SCA) flow
       *
       * We strongly recommend use this function to verify the buyer and
       * reduce the chance of fraudulent transactions.
       */
      createVerificationDetails={() => ({
        amount: '1.00',
        /* collected from the buyer */
        billingContact: {
          addressLines: ['123 Main Street', 'Apartment 1'],
          familyName: 'Doe',
          givenName: 'John',
          countryCode: 'GB',
          city: 'London',
        },
        currencyCode: 'GBP',
        intent: 'CHARGE',
      })}
      /**
       * Identifies the location of the merchant that is taking the payment.
       * Obtained from the Square Application Dashboard - Locations tab.
       */
      locationId={process.env.REACT_APP_LOCATION_ID}
    >
      <CreditCardInput />
    </SquarePaymentsForm>
  );
  
  export default MyPaymentForm;
