let URL = '';

class ConfigPerfil{
    constructor(url){
        this.USER_ID = 'b2';
        //this.USER_ID = 'cefas.andre@gmail.com'
        // Your PAT (Personal Access Token) can be found in the portal under Authentification
        this.PAT = 'a4eb61c9d3884f70b9a2454ee470727c';
        this.APP_ID = 'my-first-application';
        // Change these to whatever model and image URL you want to use
        this.MODEL_ID = 'face-detection';
        this.MODEL_VERSION_ID = '6dc7e46bc9124c5c8824be4822abe105';    
        this.IMAGE_URL = url;
        

        this.raw = JSON.stringify({
            "user_app_id": {
                "user_id": this.USER_ID,
                "app_id": this.APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": URL
                        }
                    }
                }
            ]
        });
        
           
        //console.log(this.MODEL_ID);
    }

    setImageUrl(url){
        //if(url === '') return 'https://th.bing.com/th/id/OIP.cIyTnBZ9HkpaSsI8l2-mjwHaFj?pid=ImgDet&w=3072&h=2304&rs=1';
        URL = url;
        //this.getRaw();
    }

    getRaw(){
        return JSON.stringify({
            "user_app_id": {
                "user_id": this.USER_ID,
                "app_id": this.APP_ID
            },
            "inputs": [
                {
                    "data": {
                        "image": {
                            "url": URL
                        }
                    }
                }
            ]
        });
    }
    getAPP_ID(){
        return this.APP_ID;
    }
    
    getUSER_ID(){
        return this.USER_ID;
    }

    getMODEL_ID(){
        return this.MODEL_ID;
    }

    getPAT(){
        return this.PAT;
    }

    getMODEL_VERSION_ID(){
        return this.MODEL_VERSION_ID;
    }

    setImageUrl(){
        console.log('url setImageUrl', URL);
    }
    
    getRequestOptions(){
        const requestOptions = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + this.PAT
            },
            body: this.getRaw()
        };
        return requestOptions;
    }

    testRequest(){
        if(URL !== ''){
            return fetch("https://api.clarifai.com/v2/models/" + this.getMODEL_ID() + "/versions/" + this.getMODEL_VERSION_ID() + "/outputs", this.getRequestOptions())
            .then(response => response.text())
            .then(result => { 
                    const data = JSON.parse(result);
                    const dados = data.outputs[0].data.regions[0].region_info.bounding_box;
                return data;
            })
            .catch(error => console.log('error', error));
        }else{
            return '';
        }
    }
    
    
}

const CP = new ConfigPerfil();
const insereUrl = (url)=>{
    URL = url;
    return CP.testRequest();
};

const getPAT = CP.getPAT();
const getUSER_ID = CP.getUSER_ID();
const getAPP_ID = CP.getAPP_ID();
const getMODEL_ID = CP.getMODEL_ID();
const getMODEL_VERSION_ID = CP.getMODEL_VERSION_ID();
module.exports = {
    urlImg: insereUrl,
    getPAT: getPAT,
    getUSER_ID: getUSER_ID,
    getAPP_ID: getAPP_ID,
    getMODEL_ID: getMODEL_ID,
    getMODEL_VERSION_ID: getMODEL_VERSION_ID
}