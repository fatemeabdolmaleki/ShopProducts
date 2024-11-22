const main = document.querySelector('main')
const pop = document.querySelector('.popup')
const searchInp= document.querySelector('.inp>#search')

searchInp.addEventListener('keyup',()=>{
    let temp = searchInp.value.toLowerCase()
    const category = document.querySelectorAll('main>article>h5')
    category.forEach((val)=>{
        if(
            val.innerText.toLowerCase().indexOf(temp) >= 0
        ){
          
            val.parentElement.style.order = '0';
            val.parentElement.style.opacity = '1';

        }else{
            val.parentElement.style.order = '1';
            val.parentElement.style.opacity = '0';
        }
    })
})

getProduct()
function getProduct(){
    fetch('https://fakestoreapi.com/products')
    .then(res=>{
        if(res.ok) return res.json()
        Promise.reject(err)
    })
    .then(data=>{
        data.map((val)=>{
        const article = document.createElement('article')
            article.innerHTML = `
            <figure>
                <img src="${val.image}" alt="">
            </figure>
            <h2>${val.category}</h2>
            <h5>${val.title}</h5>
            <span>$ ${val.price}</span>
            <button onclick="showPop(${val.id})">Show More</button>
            `
            main.appendChild(article)
        })
    })

    .catch((err)=>console.log(err))
}

function showPop(i){
pop.style.left = '0px';
fetch('https://fakestoreapi.com/products/' + i)
.then(res => res.json())
.then(data => {
    pop.querySelector('h2').innerHTML = data.category
    pop.querySelector('h5').innerHTML = data.title
    pop.querySelector('p').innerHTML =data.description
    pop.querySelector('span:nth-of-type(1)').innerHTML = 'remaining count :  '+ data.rating.count
    pop.querySelector('span:nth-of-type(2)').innerHTML ='$ ' + data.price
    pop.querySelector('img').src = data.image
});
}


function myClose(){
     pop.style.left = '-100%'
}

