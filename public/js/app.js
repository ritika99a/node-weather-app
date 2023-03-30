console.log('running...')


const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msgone=document.querySelector('#firstmsg')
const msgtwo=document.querySelector('#secondmsg')

weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const location=search.value
    const url='http://localhost:3000/weather?address='+location

    msgone.textContent='Loading...'
    msgtwo.textContent=''

    fetch(url).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                msgone.textContent=data.error
                msgtwo.textContent=''
            } 
            else{
                msgone.textContent=data.location
                msgtwo.textContent=data.summary +'\n' + data.details
            }
        })
    })
})
