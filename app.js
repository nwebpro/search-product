// Load Data call the api
const loadAllProducts = async() => {
    const url = `https://fakestoreapi.com/products`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Set Category Menu Left Side
const setAllMenu = async() => {
    const data = await loadAllProducts();
    const ul = document.getElementById('all-menus');
    const uniqueArray = [];
    for (const product of data) {
        if(uniqueArray.indexOf(product.category) === -1){
            uniqueArray.push(product.category);
            const li = document.createElement('li');
            li.innerHTML = `
                <li>${product.category}</li>
            `;
            ul.appendChild(li);
        }
    }
}
  
setAllMenu();

// Search Product
const searchCategory = document.getElementById('search-category');
searchCategory.addEventListener('keypress', async(event) => {
    // Add Spinner
    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden');

    if(event.key === 'Enter'){
        const searchValue = searchCategory.value;
        const allProducts = await loadAllProducts();
        spinner.classList.add('hidden');

        const foundProducts = allProducts.filter(product => product.category.includes(searchValue));
        const productContainer = document.getElementById('products-container');
        const notFound = document.getElementById('not-found');
        productContainer.textContent = ``;
        notFound.textContent = ``;
        if(foundProducts.length === 0){
            notFound.innerHTML = `<h2 class="text-2xl text-orange-500 text-center">Not Found</h2>`
        }
        foundProducts.forEach(product => {
            const div = document.createElement('div');
            const {category, image, title, description} = product;
            div.innerHTML = `
                <div class="card card-compact bg-base-100 shadow-xl">
                    <figure><img src="${image}" class="h-80 w-full" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${category}</h2>
                        <p>${title.length > 20 ? title.slice(0, 20) : title}</p>
                        <div class="card-actions justify-end">
                            <label onclick="showModal('${description}', '${image}')" for="my-modal-3" class="btn modal-button btn-primary">Show Details</label>
                        </div>
                    </div>
                </div>
            `;
            productContainer.appendChild(div);
        })
    }
})

// Show Modal
const showModal = (description, image) => {
    const modalBody = document.getElementById('modal-body');
    modalBody.textContent = ``;
    modalBody.innerHTML = `
        <figure><img src="${image}" class="h-80 w-full" alt="Shoes" /></figure>
        <p class="py-4">${description}</p>
    `;
}
  

// loadAllProducts('');