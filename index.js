const express = require('express')
const app= express()
const mysql = require('mysql');
const cors = require('cors');
app.use(cors());
app.use(express.json());
const multer = require("multer")
const dotenv=require('dotenv')
const Razorpay = require("razorpay");
const nodemailer = require('nodemailer')

dotenv.config();

//let uid="guru@gmail.com"; //
let today=new Date();
dd=today.getDate();
mm=today.getMonth()+1
yy=today.getFullYear()
let cdate=yy+"-"+mm+"-"+dd;
let ctime=today.toLocaleTimeString();


app.listen(3001, () => {
    console.log("running on port 3001");
});

app.get("/",(req,res) => {
    res.send("Hello World React..!");
});

const dbcon = mysql.createConnection({
    host: "localhost",
    "user":"root",
    "password": "",
    "database": "food_order",
})
// end database connection code

dbcon.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });


// Login Authentication code
app.post('/login',(req,res) => {
    logdata=req.body.logindata
    username=logdata.username
    password=logdata.password
    dbcon.query("SELECT * from login where username =? AND password = ?",[username,password],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
           res.send(result); }     
    }
    );
});

// Signup Insert Code
app.post('/signup',(req,res) => {
    signupdata=req.body.signupdata
    fullname=signupdata.fullname
    city=signupdata.city
    address=signupdata.address
    pincode=signupdata.pincode
    email=signupdata.email
    contact=signupdata.contact
    password=signupdata.password
    utype="user"
    //const sql="insert into login(username,password,utype)values(?,?,?)";
    dbcon.query("insert into user_reg(fullname,city,address,pincode,email,contact)values(?,?,?,?,?,?)",
    [fullname,city,address,pincode,email,contact],
    (err,result)=> {
        if(err){console.log(err);}
        else{
            dbcon.query("insert into login(username,password,utype)values(?,?,?)",
            [email,password,utype])
            res.send(result); 
        }     
    });  
});


// Food Item Insertion
// image storage config
let imgconfig = multer.diskStorage({
    destination:(req,file,callback) =>{
        callback(null,"../client/public/upload/"); 
        //callback(null,"./client/public/");       
    },
    filename:(req,file,callback) =>{
        callback(null,`image-${Date.now()}.${file.originalname}`)
    }
 })

 // image filter
 const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)}
    else{
        callback(null,Error("only image is allowed"))}
 }

 let upload = multer({
    storage:imgconfig,
    fileFilter:isImage
 })

app.post("/fooditem",upload.single("file"),(req,res)=> {
    console.log("Hey Food Item");
    //fdata=req.formValues
    category=req.body.category
    item_name=req.body.item_name
    qty=req.body.qty
    price=req.body.price
    const {filename}=req.file
    console.log(req.file)
    const sql="insert into food_items(category,item_name,qty,price,file) values(?,?,?,?,?)";
        dbcon.query(sql,[category,item_name,qty,price,filename],(err,result)=>{
            if(err){
                console.log(err);}
            else{
                res.send(result);}
        });
    });
 
// fetching the list of food items
    app.get('/home',(req,res) => {
        dbcon.query("select * from food_items",(err,result) => {
            if(err){
            console.log(err);}
            else{
                res.send(result);}
        });
    });


// Send Order

app.post('/sendorder/:id',(req,res) => {
    console.log("Order Sent")
    qty=req.body.qty,
    id=req.body.id
    uid=req.body.uid
    const q="select * from food_items where id=?";
    dbcon.query(q,[id],(err,result) => {
        if(err){
        console.log(err);}
        else{
            const price=result[0].price
            const total=price*qty
            
            dbcon.query("insert into customer_orders(user_id,qty,price,total,order_date,order_time,payment_status,order_status,pid,delivered_status)values(?,?,?,?,?,?,?,?,?,?)",
            [uid,qty,price,total,cdate,ctime,'pending','pending',id,'pending'])
            //console.log(result[0].price)
            res.send(result);

        }
    });
});


// get user order list by user id
app.get('/myorder/:id',(req,res) => {
    const uid=req.params.id;
    const q="select a.id,a.pid,a.user_id,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,b.item_name from customer_orders as a join food_items as b on a.user_id=? and a.pid=b.id";
    dbcon.query(q,[uid,1],(err,result) => {
        if(err){
        console.log(err);}
        else{
            res.send(result);}
    });
});


// Order Confirm by user

app.post('/orderconfirm/:id',(req,res)=> {
    const id=req.params.id
    console.log("Hey"+id)
    let status='confirmed'
     dbcon.query("update customer_orders set order_status='Confirmed' where id = ?",[id],(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });


 // Do Payment through razorpay  
app.post('/paybill/:id',(req,res) => {
    console.log("Payment Inserted")
    const id=req.params.id
    price=req.body.price,
    payment_id=req.body.payment_id
    uid=req.body.uid
    const status='Paid'
    const q="update customer_orders set payment_status=? where id=?";
    dbcon.query(q,[status,id],(err,result) => {
        if(err){
        console.log(err);}
        else{ 
            dbcon.query("insert into payment(order_id,user_id,amount,paid_date)values(?,?,?,?)",
            [id,uid,price,cdate,payment_id])
            //console.log(result[0].price)
            res.send(result);

        }
    });
});

// Send an Email Notifications
app.get('/sendmail/',async(req,res) => {
    let testAccount = await nodemailer.createTestAccount();
     // connect with the smtp
    let transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "g7892712433@gmail.com",
      pass: "deevawzolibybpol",
    },
  });

  let info = await transporter.sendMail({
    from: '"Gururaj" <g7892712433@gmail.com>', // sender address
    to: "shwetha.k667@gmail.com", // list of receivers
    subject: "Hello Bhavani", // Subject line
    text: "Hello Dear Friend", // plain text body
    html: "<b>Hello Bhavani</b>", // html body
  }); 
  console.log("Message sent: %s", info.messageId);
  res.json(info);

   //res.send("Send an Email")
});


// Forgot Password
app.post('/forgotpass',(req,res) => {
    const otp=Math.floor(Math.random() * (9999 - 1000 + 1) + 1000)
    username=req.body.email
    console.log(username)
    dbcon.query("SELECT * from login where username =?",[username],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
            let transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                auth: {
                  user: "gurusirsi25@gmail.com",
                  pass: "deevawzolibybpol",
                },
              });
            
              let info = transporter.sendMail({
                from: '"Gururaj" <gurusirsi25@gmail.com>', // sender address
                to: username, // list of receivers
                subject: "ONE TIME PASSWORD", // Subject line
                text: "Your OTP:", // plain text body
                html: "<b>OTP: </b>"+otp, // html body
              }); 
              console.log("Message sent: %s", info.messageId);
            dbcon.query("insert into otp(otp,status)values(?,?)",
            [otp,'active'])
           res.send(result); }     
    }
    );
});


// Otp Verification
app.post('/otp',(req,res) => {
    otp=req.body.otp
    console.log(otp)
    dbcon.query("SELECT * from otp where otp =?",[otp],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
            
           res.send(result); }     
    }
    );
});


// Reset Password Code

app.post('/resetpass',(req,res) => {
    newpass=req.body.newpass
    confirmpass=req.body.confirmpass
    uid=req.body.uid

        dbcon.query("update login set password=? where username =?",[newpass,uid],
    (err,result)=> {
        if(err){
            console.log(err);}
        else{
           res.send(result); }     
    }
    ); 
   
});


// Customer All Orders

// get user order list by user id
app.get('/allorders/',(req,res) => {
    const uid=req.params.id;
    const q="select a.id,a.pid,a.user_id,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,a.delivered_status,b.item_name from customer_orders as a join food_items as b on a.pid=b.id and order_date=?";
    dbcon.query(q,cdate,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});





// Get Individual Customer Data
app.get('/viewcustomer/:user_id',(req,res) => {
    const uid=req.params.user_id;
    console.log(uid)
    const q="select * from user_reg where email=?";
    dbcon.query(q,[uid],(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});


// Delete Order By Admin
app.delete('/deliverybyadmin/:id',(req,res)=> {
    const id=req.params.id
     //console.log("hey"+id);
     dbcon.query("delete from customer_orders where id = ?",id,(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });


 // send to delivery order 

 app.post('/sendtodelivery/:id',(req,res)=> {
    const id=req.params.id
    const status='progressing'
     console.log("hey"+id);

     dbcon.query("update customer_orders set delivered_status=? where id=?",[status,id],(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });

 

 // view all old and new orders
 app.get('/customerordersall/',(req,res) => {
    const uid=req.params.id;
    const status='Paid'
    const q="select a.id,a.pid,a.user_id,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,a.delivered_status,b.item_name from customer_orders as a join food_items as b on a.pid=b.id and payment_status=?";
    dbcon.query(q,status,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});


// fetching Category List

app.get('/categorylist',(req,res) => {
    dbcon.query("select * from category",(err,result) => {
        if(err){
        console.log(err);}
        else{
            res.send(result);}
    });
});


// Get Category Wise Products
app.get('/cat_wise_menu/:cat',(req,res) => {
    const cat=req.params.cat;
    const q="select * from food_items where category=?";
    dbcon.query(q,cat,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});


// Feedback Insertion

app.post('/feedback',(req,res) => {
    feeddata=req.body.feeddata
    uid=req.body.uid
    about_service=feeddata.about_service
    comments=feeddata.comments

    dbcon.query("insert into feedback(user_id,about_service,comments)values(?,?,?)",
    [uid,about_service,comments],
    (err,result)=> {
        if(err){console.log(err);}
        else{
            console.log(uid)
            res.send(result); 
        }     
    });  
});



 // view all old and new orders
 app.get('/serviceorders/',(req,res) => {
    const uid=req.params.id;
    const status='Paid'
    const ostatus='progressing'
    const q="select a.id,a.pid,a.user_id,a.qty,a.price,a.total,a.order_date,a.order_time,a.order_status,a.payment_status,a.delivered_status,b.item_name from customer_orders as a join food_items as b on a.pid=b.id and payment_status=? and delivered_status=?";
    dbcon.query(q,[status,ostatus],(err,result) => {
        if(err){
        console.log(err);}
        else{
            console.log(result)
            res.send(result);}
    });
});



// View feedback details

app.get('/viewfeedback/',(req,res) => {

    const q="select * from feedback";
    dbcon.query(q,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});


// View Food Item List / Admin Panel

app.get('/viewfooditem/',(req,res) => {
    const q="select * from food_items";
    dbcon.query(q,(err,result) => {
        if(err){
        console.log(err);}
        else{
            //console.log(result)
            res.send(result);}
    });
});


// Delete Food Item
app.delete('/deletefood/:id',(req,res)=> {
    const id=req.params.id
     //console.log("hey"+id);
     dbcon.query("delete from food_items where id = ?",id,(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });


// Update Food Delivery Status

app.post('/updatedeliverystatus/:id',(req,res)=> {
    const id=req.params.id
    const status='delivered'
     //console.log("hey" + id);

     dbcon.query("update customer_orders set delivered_status=? where id=?",[status,id],(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });

 // Delete Order By Admin
app.delete('/delorderbyadmin/:id',(req,res)=> {
    const id=req.params.id
     //console.log("hey"+id);
     dbcon.query("delete from customer_orders where id = ?",id,(err,result)=>{
         if(err){console.log(err)}
         else{res.send(result);}
     });
 });
