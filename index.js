var express =require('express');
var rapid = require('eway-rapid');
var app =express();
// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

app.use(express.static(__dirname+'/public'))
// index page 
app.get('/', function(req, res) {
    res.render('ewayform');
});

app.get('/payment',function(req,res){
    // eWAY Credentials
    console.log("sahi hai")
    var apiKey   = 'F9802CeMRcGMDgRk/UY2Bbj0Spq+RfP1FcwTRMw2wPl934139TJYH7slK+FDdKbBYsmHmU',
    password = 'mMGgQJJJ',
    rapidEndpoint = 'Production'; // Use 'Production' when you go live

var client = rapid.createClient(apiKey, password, rapidEndpoint);

client.createTransaction(rapid.Enum.Method.TRANSPARENT_REDIRECT,{
    "Customer": {
       "Reference": "A12345",
       "Title": "Mr.",
       "FirstName": "John",
       "LastName": "Smith",
       "CompanyName": "Demo Shop 123",
       "JobDescription": "Developer",
       "Street1": "Level 5",
       "Street2": "369 Queen Street",
       "City": "Sydney",
       "State": "NSW",
       "PostalCode": "2000",
       "Country": "au",
       "Phone": "09 889 0986",
       "Mobile": "09 889 6542",
       "Email": "ankit.shrivastava00@gmail.com",
       "Url": "http://www.ewaypayments.com"
    },
    "ShippingAddress": {
       "ShippingMethod": "NextDay",
       "FirstName": "John",
       "LastName": "Smith",
       "Street1": "Level 5",
       "Street2": "369 Queen Street",
       "City": "Sydney",
       "State": "NSW",
       "Country": "au",
       "PostalCode": "2000",
       "Phone": "09 889 0986"
    },
    "Items": [
     {
       "SKU": "12345678901234567890",
       "Description": "Item Description 1",
       "Quantity": 1,
       "UnitCost": 400,
       "Tax": 100,
       "Total": 500
     },
     {
       "SKU": "123456789012",
       "Description": "Item Description 2",
       "Quantity": 1,
       "UnitCost": 400,
       "Tax": 100,
       "Total": 500
     }
    ],
    "Options": [
     {
       "Value": "Option1"
     },
     {
       "Value": "Option2"
     }
    ],
    "Payment": {
       "TotalAmount": 1000,
       "InvoiceNumber": "Inv 21540",
       "InvoiceDescription": "Individual Invoice Description",
       "InvoiceReference": "513456",
       "CurrencyCode": "AUD"
    },
    "RedirectUrl": "http://www.eway.com.au",
    "DeviceID": "D1234",
    "CustomerIP": "127.0.0.1",
    "PartnerID": "ID",
    "TransactionType": "Purchase",
    "Capture": true
})// See the JSON tab for all the available response properties

.then(function (response) {

    if (response.getErrors().length == 0) {
        var accessCode = response.get('AccessCode');
        var formUrl = response.get('FormActionURL');
                console.log("accessCode : ",accessCode)
                console.log("formUrl : ",formUrl)

    } else {
        response.getErrors().forEach(function(error) {
            console.log("Response Messages: " + rapid.getMessage(error, "en"));
        });
    }
})
.catch(function(reason) {
    reason.getErrors().forEach(function(error) {
        console.log("Response Messages: " + rapid.getMessage(error, "en"));
    });
});

});
app.listen(2000,function(){
    console.log("Start")
});


