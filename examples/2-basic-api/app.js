const result = document.querySelector('.result')

const fetchData= async()=>{
    try {
const {data} =await axios.get('/api/2-basic')
const info=data.map((item)=>{
    const {id,name,image:{url},price}=item
    return `<article class="product" key=${id}>
    <img
      src="${url}"
      alt="${name}"
    />
    <div class="info">
      <h5>${name}</h5>
      <h5 class="price">$${price}</h5>
    </div>
  </article> `
}).join('')
result.innerHTML=info

    } catch(error){
result.innerHTML=`<h2>${error.message}</h2>`
    }
}

fetchData()