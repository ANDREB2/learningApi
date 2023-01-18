const cp = require('./ConfigPerfil');
const {ClarifaiStub, grpc} = require('clarifai-nodejs-grpc');

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", `Key ${cp.getPAT}`);


const handleApiCall = (req, res)=>{
	stub.PostModelOutputs(
	    {
	    	user_app_id: {
			    "user_id": cp.getUSER_ID,
			    "app_id": cp.getAPP_ID
			},
	        // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
	        model_id: cp.getMODEL_ID,
	        version_id: cp.getMODEL_VERSION_ID,
	        inputs: [{data: {image: {url: req.body.inputUrl}}}]
	    },
	    metadata,
	    (err, response) => {
	        if (err) {
	            console.log("Error: " + err);
	            return;
	        }

	        if (response.status.code !== 10000) {
	            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
	            return;
	        }

	        console.log("Predicted concepts, with confidence values:")
	        for (const c of response.outputs[0].data.concepts) {
	            console.log(c.name + ": " + c.value);
	        }
	        res.json(response);
	    }
	);
};

const handleApiCall1 = (req, res)=>{
    const data = cp.urlImg(req.body.inputUrl);
	//const data = cp.predict;
    const saida = ()=>{
    	if(data){
	    	return data.then((data1)=> {
	    		
	    		    		const dados = data1.outputs[0].data.regions[0].region_info.bounding_box;
	    		    		//console.log('resultado',(dados));
	    		    		return res.json(data1);
	    		    	}
	    	);
    	}
    }
    
    saida();
};

const handleImage = (req, res, db)=>{
	const {id} = req.body;

	db('users').where({id}).increment('entries',1)
	.returning('entries').then(entries =>{
		res.json(entries[0].entries);
	}).catch(err => res.status(400).json('Unable to get entries!'));
};

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}