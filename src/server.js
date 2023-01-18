const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/Register');
const signin = require('./controllers/SignIn');
const profile = require('./controllers/Profile');
const entrieCount = require('./controllers/EntriesCount');

const db = knex({
	client: 'pg',
	connection: {
		host: 'dpg-cf3vgj9a6gdmd1i55l5g-a.oregon-postgres.render.com',
		user: 'smartbrain_d9m1_user',
		password: 'hv0PuoOBG4ipnLqgFLbtzPnABtwZLfPG',
		database: 'smartbrain_d9m1'
	}
});
//postgres://smartbrain_d9m1_user:hv0PuoOBG4ipnLqgFLbtzPnABtwZLfPG@dpg-cf3vgj9a6gdmd1i55l5g-a.oregon-postgres.render.com/smartbrain_d9m1
/*db.select('*').from('users').then(data => {
	console.log(data);
});*/

const app = express();


app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=>{
	res.send('Homedir');
});

app.post('/signin', signin.handleSignIn(db, bcrypt));

app.post('/register', (req, res) => {
	register.handleRegister(req, res, db, bcrypt)});

app.get('/profile/:id', (req, res) => {
	profile.handleProfile(req, res, db)});

app.put('/image', (req, res) => {
	entrieCount.handleImage(req, res, db)
});

app.post('/imageurl', (req, res)=>{entrieCount.handleApiCall(req, res)});

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
	console.log('App is running', PORT);
});


/*
*/