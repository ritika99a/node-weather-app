const request=require('request')
const forecast=(latitude, longitude, callback)=>{
    const url='https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/'+latitude+','+longitude+'?units=si'
    request({url, json:true},(error,response)=>{
        if(error)
        callback('Unable to connect to weather services...',undefined)
        else if(response.body.error)
        callback('Incorrect location, retry!',undefined)
        else
        callback(undefined,{
            summary: response.body.daily.data[0].summary,
            temperature: response.body.currently.temperature,
            precipitation: response.body.currently.precipProbability
        })
    })
}

module.exports=forecast