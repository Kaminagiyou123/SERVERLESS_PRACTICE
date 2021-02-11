const result = document.querySelector('.result')
const fetchData= async()=>{
    result.innerHTML=`<h2>loading...</h2>`
    try {
const id=window.location.search

const data =await axios.get(`/api/3-complete${id}`)
const {data:{fields}}=data
const {name,image,price,description}=fields
result.innerHTML= `<h1 class="title">${name}</h1>
    <article class="product">
      <img class="product-img"
      src=${image[0].url}
      alt="utopia sofa"
      />
      <div class="product-info">
        <h5 class="title">${name}</h5>
        <h5 class="price">$${price}</h5>
        <p class="desc">${description}</p>
      </div>
    </article>`
    }
catch(error){
result.innerHTML=`<h2>${error.response.data}</h2>`
}
}
fetchData()