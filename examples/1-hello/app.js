const result=document.querySelector('.result')

const fetchData= async()=>{
    try{
        const {data}=await axios.get('/api/1-hello')
        result.innerHTML=`<h1>${data}</h1>`
    }catch (error) {
        console.log(error.response.data)

    }
}

fetchData()