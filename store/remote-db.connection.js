const axios = require('axios').default;



function createRemoteConnection(url){
    async function getAll(table){
        const response = await req('get', table);
        return response;
    }

    async function req(method,table,data){
        return new Promise((resolve,reject)=>{
            axios({
                url: `${url}/${table}`,
                method,
                headers:{
                    "Content-Type":"application/json"
                },
                data:{}
            }).then(response=>{
                resolve(response.data)
                
            }).catch(error=>{
                console.log('rejected');
                reject(error);
            })
        })
    }

    return {
        getAll
    }
}

module.exports = createRemoteConnection;