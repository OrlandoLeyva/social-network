const axios = require('axios').default;



function createRemoteConnection(url){
    async function getAll(table){
        try {
            const response = await req('get', table);
            return response;
        } catch (error) {
            throw error
        }
       
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
                reject({
                    url: `${url}/${table}`,
                    message: 'error In axios',
                    details: error
                });
            })
        })
    }

    return {
        getAll
    }
}

module.exports = createRemoteConnection;