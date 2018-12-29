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
	db.query(`SELECT CONCAT(u.user_fname," ",u.user_lname) as user,u.address,u.user_id,s.service_id, s.service_name
			  FROM spservice sps 
			  inner join services s on sps.service_id = s.service_id
			  inner join user u on u.user_id = sps.uid;`, (error, results, fields) => {
  			if (error) throw error;
  			console.log(results[0]);
			res.render('index', data = results);

	});
});

app.get('/client/findservice',(req,res) =>{
	res.send('Service List');
});

app.get('/client/transactions',(req,res) =>{
	res.send('Transaction');
});

app.get('/client/history',(req,res) =>{
	res.render('history');
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