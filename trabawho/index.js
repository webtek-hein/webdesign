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

app.get('/specifics/:id',(req,res) =>{
	db.query(`SELECT * FROM specifics
		inner join services on services.service_id = specifics.service_id 
		where services.service_id = ?`,
		[req.params.id],(error, results, fields) => {
			if (error) throw error;
			res.json(results)
		});
});

app.get('/search/:value',(req,res) => {
	let where = ``;
	if (req.params.value){
		where = `where s.service_name = "`+req.params.value+`"`;
	}
	db.query(`SELECT uid,s.service_id,address,service_name,CONCAT(user_fname,' ',user_lname) as user from user 
		inner join spservice sps on sps.uid = user.user_id
		inner join services s on sps.service_id = s.service_id ${where}`, 
		(error, results, fields) => {
			if (error) throw error;
			res.json(results)
		});
});

app.get('/transactions',(req,res) =>{
	let client_id = 7;
	db.query(`SELECT r.status,r.req_id, w.description, service_name, specifics,
		CONCAT(u.user_fname,' ',u.user_lname) as serviceprovider,
		DATE_FORMAT(r.date_requested, "%a, %b %d %Y") as date_requested,
		DATE_FORMAT(r.date, "%a, %b %d %Y") as date, 
		CONCAT(TIME_FORMAT(r.from, "%h %i %p"),'-',TIME_FORMAT(r.to, "%h %i %p")) as time 
		FROM requests r inner join user u on u.user_id = r.sp_id
		inner join work w on w.work_id = r.work_id
		inner join services s on s.service_id = w.service_id
		left join specifics spc on spc.specifics_id = r.specifics_id where client_id = ?
		And r.status not in ("rejected,completed")`
		,[client_id],(error, results, fields) => {
			if (error) throw error;
			console.log(results[0]);
			res.render('transaction', data = results);

		});
});

app.get('/history',(req,res) =>{
	res.render('history');
});


app.get('/viewprofile',(req,res) =>{
	res.send('Profile');
});

app.post('/client/request',(req,res)=> {
	let client_id = 7;
	let data = req.body;
 	// client will do request
 	db.query('INSERT INTO requests SET ? , client_id = ? ',[data,client_id], (error, results, fields) => {
 		if (error) throw error;
 		res.json(data);
 	});

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