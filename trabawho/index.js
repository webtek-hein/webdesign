const express = require('express')
const app = express()


app.get('/',(req,res) => {
	res.send('Index Page')
})

app.get('/client/findservice',(req,res) =>{
	res.send('Service List')
})

app.get('/client/transactions',(req,res) =>{
	res.send('Transaction History')
})

app.listen(3000, (err)=>{
	if(err) console.log('Error connecting to port 3000');
	console.log('Connected to Port 3000')
})