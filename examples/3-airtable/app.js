const result = document.querySelector('.result')
const fetchData= async()=>{
    try {
const {data} =await axios.get('/api/3-complete')
const info=data.map((item)=>{
    const {id,name,url,price}=item
    return `<a href='product.html?id=${id}' class="product">
    <img
      src="${url}"
      alt="${name}"
    />
    <div class="info">
      <h5>${name}</h5>
      <h5 class="price">$${price}</h5>
    </div>
  </a> `
}).join('')
result.innerHTML=info

    } catch(error){
result.innerHTML=`<h2>${error.message}</h2>`
    }
}

fetchData()