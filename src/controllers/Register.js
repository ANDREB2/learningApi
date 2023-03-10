
const handleRegister = (req, res, db, bcrypt)=>{
	const {name, email, password} = req.body;
	/*bcrypt.hash(password, null, null, function(err, hash){
		console.log(hash);
	});*/
	if(!name || !email || !password)
		return res.status(400).json('incorrect form submission');
	const hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			trx('users').returning('*').insert({
				name: name,
				email: loginEmail[0].email,
				joined: new Date()
			}).then(user => {
				res.json(user[0]);
			})
		}).then(trx.commit).catch(trx.rollback);
	})
	.catch(err => res.status(400).json('Unable to register'));

}

module.exports = {
	handleRegister: handleRegister
}