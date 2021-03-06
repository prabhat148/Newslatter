const express = require('express');
const bodyParser = require('body-parser');
const Request = require('request');
const https = require('https');



const app = express()

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended:true}))

app.get('/',function(req,res){

    res.sendFile(__dirname +'/signup.html')
  
})



app.post('/',function(req,res){

    const fname = req.body.fname;
    const lname = req.body.lname ;
    const email = req.body.email;

    console.log(fname,lname,email);

    const data = {
        members:[
            {
                email_address: email,
                status:'subscribed',
                merge_fields: {
                    FNAME:fname,
                    LNAME:lname,
                }

            }
        ]
    };
    const josonData = JSON.stringify(data);

    const url = "https://us1.api.mailchimp.com/3.0/lists/dce7618d36"

    const option = {
        method:'Post',
        auth:"ktitoo:d98501b82c4520a1e849c8717f09a244-us1"
    }

   const request = https.request(url,option,function(response){

           if (response.statusCode === 200) 
           {
              res.sendFile(__dirname +'/success.html'); 
           }else{
               res.sendFile(__dirname +'/failor.html');
           }

        response.on(data,function(data){


        })

    })

    request.write(josonData);
    request.end();

})

app.post('/failor',function (req,res) {

    res.redirect('/');
    
})

app.listen(process.env.PORT || 3000);

// api d98501b82c4520a1e849c8717f09a244-us1

// dce7618d36