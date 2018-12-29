const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')

const app = express();


const db = mysql.createConnection({
	host	 : 'localhost',
	user	 : 'root',
	password : '',
	database : 'db'
});

db.connect((err) => {
	if (err) throw err;
	console.log('Database Connected')
});

app.use('/assets', express.static('assets'));
app.use(bodyParser.json());
app.set('view engine','ejs');


app.get('/',(req,res) => {
	res.render('index');
});

app.get('/client/findservice',(req,res) =>{
	res.send('Service List');
});

app.get('/client/transactions',(req,res) =>{
	res.send('Transaction History');
});

app.get('/viewprofile',(req,res) =>{
	res.send('Profile');
});

app.post('/client/request',(req,res)=> {
 // client will do request
});

app.post('/client/:action',(req,res)=>{
 // client will view or cancel
 let {action} = req.params;
 res.send(action);
});

app.post('/editprofile/',(req,res)=>{
 // edit profile
});



app.listen(3000, (err)=>{
	if(err) console.log('Error connecting to port 3000');
	console.log('Connected to Port 3000');
});