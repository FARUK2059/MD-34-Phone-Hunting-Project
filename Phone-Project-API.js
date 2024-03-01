const loadPhone = async (searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones (phones);
}


const displayPhones = phones => {
    console.log(phones);
    // step : 1 link of id
    const phoneContainer = document.getElementById('phone-container');
    // clear search button
    phoneContainer.textContent = '';

    //  show all button condition
    const showAllContainer = document.getElementById('Show-All-Button');
    if (phones.length > 12) {
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // show display item
    phones = phones.slice(0,12);

    phones.forEach(phone => {
        console.log(phone);
        // step: 2 creat a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 p-4  bg-[#dbeafe] shadow-xl `;
        //  step : 3 set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-end">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
        `;

        //  step: 4 , append child
        phoneContainer.appendChild(phoneCard);
    })

    //  hide Loading
    toggleLoaddingSpinner(false);


}


// handel searsh button

const handelSearch = () => {
    toggleLoaddingSpinner (true);
    // console.log('search handel')
    const searchHander = document.getElementById('search-Fild');
    const searchText = searchHander.value;
    console.log(searchText);
    loadPhone(searchText);
}

// const handelSearch2 = () => {
//     toggleLoaddingSpinner (true);
//     const searchHander = document.getElementById('search-Fild-2');
//     const searchText = searchHander.value;
//     loadPhone(searchText);
// }

const toggleLoaddingSpinner = (isLoading) => {
    const loaddingSpinner = document.getElementById('loadding-Spinner');
    if(isLoading){
        loaddingSpinner.classList.remove('hidden');
    }
    else {
        loaddingSpinner.classList.add('hidden');
    }
}


// loadPhone ();