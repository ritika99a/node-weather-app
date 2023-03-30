const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')

const app=express()

//define path for express configuration
const publicDirPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views directory
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirPath))

app.get('',(req, res)=>{
    res.render('index',{
        title: 'Weather app',
        name: 'Ritika Yadav'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About me',
        name: 'Ritika Yadav'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Contact us',
        number: 445676543,
        name: 'Ritika Yadav'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'enter an address to fetch weather details'
        })
    }
    const address=req.query.address
    geocode(address,(error, {latitude, longitude, location}={})=>{
        if(error)
        return res.send({error})
        forecast(latitude,longitude,(error, {summary, temperature, precipitation: rain}={})=>{
            if(error)
            return res.send({error})
            const msg='It is '+temperature+' degress out, and there is '+rain+'% chance of rain'
            res.send({
                address,
                location,
                summary,
                details:msg
            })
        })
    })
    // res.send({
    //     location: 'Sydney',
    //     forecast: 'It is 23 degrees out',
    //     address: req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'help page not found!',
        name: 'Ritika Yadav'
    })
})

app.get('*',(req, res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found!',
        name: 'Ritika Yadav'
    })
})

app.listen(3000,()=>{
    console.log('Server is up and running on port 3000')
})
