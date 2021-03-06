const functions = require("firebase-functions");
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const { Client, Environment } = require('square');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
dotenv.config();
const mailchimp = require("@mailchimp/mailchimp_marketing")
const md5 = require("md5")

const app = express();
const corsOptions = {
  exposedHeaders: 'Authorization',
  origin: true
};
app.use(cors(corsOptions));
app.use(express.json());

const accessToken = process.env.ACCESS_TOKEN

const client = new Client({
  environment: Environment.Production,
  //environment: Environment.Sandbox,
  accessToken: accessToken,
})

//client.basePath = 'https://connect.squareupsandbox.com';
client.basePath = 'https://connect.squareup.com'
 
//--------------------Square APIs---------------------------------------//

app.post('/process-payment', async (req, res) => {
  const request_params_pay = req.body;
  console.log('Someone making payment');
  console.log(request_params_pay.amount)

  const fixedAmount = (request_params_pay.amount * 100).toFixed(0)

  console.log(fixedAmount)

 

  const request_body = {
    sourceId: request_params_pay.sourceId,
    idempotencyKey: request_params_pay.idempotencyKey,

    amountMoney: {
      amount: fixedAmount,
      currency: 'USD'
    }
  }


  try {
    const response = await client.paymentsApi.createPayment(request_body);
    res.status(200).json({
      'title': 'Payment Successful',
      'result': 'Payment Successful'
    });
    //console.log(response.result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      'title': 'Payment Failure',
      'result': error.response
    });
  }
})


app.post('/customer', async (req, res) => {
  console.log('adding customer to square')
  const request_params_customer = req.body;
  try {
    const response = await client.customersApi.createCustomer({
      givenName: request_params_customer.givenName,
      familyName: request_params_customer.familyName,
      emailAddress: request_params_customer.emailAddress

    });

    //console.log(response.result);
  } catch (error) {
    console.log(error);
  }
})

app.post('/subscription', async (req, res) => {
  console.log('Monthly Subscription');
  const request_params_subscription = req.body;
  const idempotency_key = uuidv4();

  try {
    const response = await client.subscriptionsApi.createSubscription({
      idempotencyKey: idempotency_key,
      locationId: process.env.LOCATION_ID,
      planId: request_params_subscription.planId,
      customerId: request_params_subscription.customerId,
      startDate: request_params_subscription.startDate,
      priceOverrideMoney: {
        amount: (request_params_subscription.amount * 100).toFixed(0),
        currency: 'USD'
      }
    });
  
    console.log(response.result);
  } catch(error) {
    console.log(error);
  }
})

app.post('/order', async (req, res) => {
  console.log('adding order to square')
  const request_params_order = req.body;
  const idempotency_key = uuidv4();
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
      idempotencyKey: idempotency_key
    });
  
    //console.log(response.result);
  } catch(error) {
    console.log(error);
  }
})

app.post('/item', async (req, res) => {
  console.log('adding item to square')
  const request_params_item = req.body;
  const idempotency_key = uuidv4();

  try {
    const response = await client.catalogApi.upsertCatalogObject({
      idempotencyKey: idempotency_key,
      object: {
        type: 'ITEM',
        id: '#123',
        itemData: {
          abbreviation: request_params_item.abbreviation,
          categoryId: request_params_item.productCategory,
          variations: [
            {
              type: 'ITEM',
              id: '#123',
              itemData: {
                name: request_params_item.productName,
                productType: 'REGULAR'
              },
              itemOptionData: {
                description: request_params_item.productDesc
              }
            }
          ]
        }
        
      }
    });
  
    console.log(response.result);
  } catch(error) {
    console.log(error);
  }
})

//--------------------------------MailChimp APIs--------------------------------//

app.post('/subscribe', async (req, res) => {
  console.log('someone subscribing')
  mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: 'us4',
  });

  const { email, tags } = req.body

  const subscriberHash = md5(email.toLowerCase());
  const listId = process.env.MAILCHIMP_LIST_ID;

  try {

    const response = await mailchimp.lists.setListMember(
      listId,
      subscriberHash,
      {
        email_address: email,
        status_if_new: 'subscribed',
      })
      const existingTags = response.tags.map((tag) => tag.name);
    const allUniqueTags = [...new Set([...existingTags, ...tags])];
    const formattedTags = allUniqueTags.map((tag) => {
        return {
          name: tag,
          status: 'active',
        };
    });
    const updateSubscriberTags = await mailchimp.lists.updateListMemberTags(
        listId,
        subscriberHash,
        {
          body: {
            tags: formattedTags,
          },
      
    }
    );
    
      res.sendStatus(200)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      'title': 'Subscribe Failed',
      'result': error.response
    });
  }
})

//-----------------------------------Send Emails---------------------------//

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_PASSWORD
  }
});

app.post('/confirmation', (req, res, next) => {
  const request_params = req.body

  console.log('sending confirmation email')
  console.log(request_params.email)
  const mail = {
    from: 'greenmountainsynergy@gmail.com',
    to: `${request_params.email}, greenmountainsynergy@gmail.com`,
    subject: 'Order Confirmation',
    html: `<p>Thank you ${request_params.firstName} ${request_params.lastName} for your order of $${request_params.total}! <br> <br> Notes for order: <br> ${request_params.notes} <br> <br> It will be shipped to: <br> ${request_params.firstName} ${request_params.lastName} <br> ${request_params.line1} <br> ${request_params.line2} <br> ${request_params.city},  ${request_params.state} ${request_params.zip_code} <br> Feel free to reply to this email with any questions, comments or changes to shipping address. <br> <br> Thanks, <br> The Team at Green Mountain Synergy </p>`
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: err
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
  console.log('someone emailing')

  const mail = {
    from: `${request_params.contactEmail}`,
    to: `greenmountainsynergy@gmail.com`,
    subject: `${request_params.contactSubject} from ${request_params.contactName}`,
    html: `${request_params.contactMessage} Sent from website by ${request_params.contactName} ${request_params.contactEmail}`
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




app.get('*', (req, res) => {
  res
    .status(404)
    .send('Its working.');
});

exports.api = functions.https.onRequest(app);
