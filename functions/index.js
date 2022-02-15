const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { ApiError, client: square } = require('square');
const { Client, Environment } = require('square');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const accessToken = process.env.ACCESS_TOKEN

const client = new Client({
  environment: Environment.Production,
  accessToken: accessToken,
})

//client.basePath = 'https://connect.squareupsandbox.com';
client.basePath = 'https://connect.squareup.com'

const oauth2 = client.authentications['oauth2'];
oauth2.accessToken = accessToken;

app.post('/process-payment', async (req, res) => {
  const request_params_pay = req.body;
  console.log(request_params_pay);

  // length of idempotency_key should be less than 45
  const idempotency_key = uuidv4();


  /*const request_body = {
    source_id: request_params.token,
    amount_money: {
      amount: (request_params.amount) * 100, 
      currency: 'USD'
    },
    //location_id: request_params.location_id,
    idempotency_key: idempotency_key,
    verificationToken: request_params.token  // ADD this line
  };*/

  const request_body = {
    sourceId: request_params_pay.sourceId,
    idempotencyKey: idempotency_key,

    amountMoney: {
      amount: request_params_pay.amount * 100,
      currency: 'USD'
    }
  }


  try {
    const response = await client.paymentsApi.createPayment(request_body);

    console.log(response.result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      'title': 'Payment Failure',
      'result': 'fail'
    });
  }
})


/* async function createPayment(req, res) {
  const payload = await json(req);

  if (!validatePaymentPayload(payload)) {
    throw createError(400, 'Bad Request');
  }
  await retry(async (bail, attempt) => {
    try {

      const idempotencyKey = payload.idempotencyKey
      const payment = {
        idempotencyKey,
        locationId: payload.locationId,
        sourceId: payload.sourceId,
        amountMoney: {
          amount: '100',
          currency: 'USD',
        },
      };

      if (payload.verificationToken) {
        payment.verificationToken = payload.verificationToken
      }

      const { result, statusCode } = await square.paymentsApi.createPayment(
        payment
      );
      alert('Payment Successful')

      send(res, statusCode, {
        success: true,
        payment: {
          id: result.payment.id,
          status: result.payment.status,
          receiptUrl: result.payment.receiptUrl,
          OrderId: result.payment.orderId,
        },
      });
    } catch (ex) {
      if (ex instanceof ApiError) {
        bail(ex)
      } else {
        alert('Payment Failed');
        throw ex
      }
    }
  })} */
/*
//Make a Payment 

// Set Square Connect credentials and environment
const client = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
})

// Configure OAuth2 access token for authorization: oauth2
//const oauth2 = client.authentications['oauth2'];
//oauth2.accessToken = accessToken;

// Set 'basePath' to switch between sandbox env and production env
// sandbox: https://connect.squareupsandbox.com
// production: https://connect.squareup.com
client.basePath = 'https://connect.squareupsandbox.com';

app.post('/process-payment', async (req, res) => {
  const request_params = req.body;
  console.log('request_params', request_params)

  // length of idempotency_key should be less than 45
  const idempotency_key = uuidv4();

  // Charge the customer's card
  const payments_api = new squareConnect.PaymentsApi();


  const request_body = {
    source_id: request_params.nonce,
    amount_money: {
      amount: (request_params.amount) * 100, 
      currency: 'USD'
    },
    //location_id: request_params.location_id,
    idempotency_key: idempotency_key,
    verificationToken: request_params.token  // ADD this line
  };

  try {
    const response = await payments_api.createPayment(request_body);
    res.status(200).json({
      'title': 'Payment Successful',
      'result': response
    });
  } catch(error) {
    console.log(error.text)
    res.status(500).json({
      'title': 'Payment Failure',
      'result': error.response.text
    });
  }
});
*/






const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD
  }
});

app.post('/confirmation', (req, res, next) => {
  const request_params = req.body


  const mail = {
    from: 'greenmountainsynergy@gmail.com',
    to: `${request_params.email}, greenmountainsynergy@gmail.com`,
    subject: 'Order Confirmation',
    html: `<p>Thank you ${request_params.firstName} ${request_params.lastName} for your order of $${request_params.total}! <br> <br> Notes for order: <br> ${request_params.notes} <br> <br> It will be shipped to: <br> ${request_params.firstName} ${request_params.lastName} <br> ${request_params.line1} <br> ${request_params.line2} <br> ${request_params.city},  ${request_params.state} ${request_params.zip_code} <br> Feel free to reply to this email with any questions, comments or changes to shipping address. <br> <br> Thanks, <br> The Team at Green Mountain Synergy </p>`
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
        status: 'success'
      })
    }
  })
})

app.post('/access', (req, res, next) => {
  const request_params = req.body
  console.log(request_params)

  const mail = {
    from: `${request_params.contactEmail}`,
    to: `greenmountainsynergy@gmail.com`,
    subject: `${request_params.contactSubject} from ${request_params.contactName}`,
    html: `${request_params.contactMessage} Sent from website by ${request_params.contactName}`
  }

  transporter.sendMail(mail, (err, data) => {

    if (err) {
      console.log(`${err}`)
      res.json({
        status: 'fail'
      })
    } else {
      res.json({
        status: 'success'
      })
    }
  })
})

app.post('/customer', async (req, res) => {
  const request_params_customer = req.body;
  try {
    const response = await client.customersApi.createCustomer({
      givenName: request_params_customer.givenName,
      familyName: request_params_customer.familyName,
      emailAddress: request_params_customer.emailAddress

    });

    console.log(response.result);
  } catch (error) {
    console.log(error);
  }
})

app.post('/order', async (req, res) => {
  const request_params_order = req.body;
  try {
    const response = await client.ordersApi.createOrder({
      order: {
        locationId: process.env.LOCATION_ID,
        referenceId: 'my-order-001',
        lineItems: [
          {
            name: request_params_order.productName,
            quantity: request_params_order.quantity,
            basePriceMoney: {
              amount: request_params_order.price,
              currency: 'USD'
            }
          }
        ]
      },
      idempotencyKey: uuidv4()
    });
  
    console.log(response.result);
  } catch(error) {
    console.log(error);
  }
})

app.post('/item', async (req, res) => {
  const request_params_item = req.body;
  const idempotency_key = uuidv4();

  try {
    const response = await client.catalogApi.upsertCatalogObject({
      idempotencyKey: idempotency_key,
      object: {
        type: 'ITEM',
        id: '#Cocoa',
        itemData: {
          name: 'Cocoa',
          description: 'Hot Chocolate',
          abbreviation: 'Ch'
        }
      }
    });
  
    console.log(response.result);
  } catch(error) {
    console.log(error);
  }
})

app.get('*', (req, res) => {
  res
    .status(404)
    .send('404, not found.');
});

exports.api = functions.https.onRequest(app);
