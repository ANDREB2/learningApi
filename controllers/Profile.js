const handleProfile = (req, res, db)=>{
	const {id} = req.params;
	db.select('*').from('users').where({id})
	.then(user =>{
		if(user.length)
			res.json(user);
		else res.status(400).json('No such user!!');
	}).catch(err => res.status(404).json('Ops!! Algo errado!'));
	
}

module.exports = {
	handleProfile: handleProfile
}