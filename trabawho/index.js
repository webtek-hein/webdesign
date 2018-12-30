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

//index
app.get('/',(req,res) => {
	db.query(`SELECT uid,s.service_id,address,service_name,CONCAT(user_fname,' ',user_lname) as user from user 
		inner join spservice sps on sps.uid = user.user_id
		inner join services s on sps.service_id = s.service_id`, (error, results, fields) => {
			if (error) throw error;
			console.log(results[0]);
			res.render('index', data = results);

		});
});

app.get('/serviceworks/:id',(req,res) =>{
	db.query(`SELECT work_id,services.service_id,description from work 
			  inner join services on services.service_id = work.service_id where services.service_id = ?`,
			  [req.params.id],(error, results, fields) => {
			if (error) throw error;
			res.json(results)
		});
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