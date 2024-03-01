const loadPhone = async (searchText='13', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones (phones, isShowAll);
}


const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    // step : 1 link of id
    const phoneContainer = document.getElementById('phone-container');
    // clear search button
    phoneContainer.textContent = '';

    //  show all button condition
    const showAllContainer = document.getElementById('Show-All-Button');
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    // console.log('is show all', isShowAll);
    // show display item
    if (!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        // console.log(phone);
        // step: 2 creat a div 
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 p-4  bg-[#dbeafe] shadow-xl `;
        //  step : 3 set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name}</h2>
            <p>${phone.slug}</p>
            <div class="card-actions justify-center">
            <button onclick ="handelShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `;

        //  step: 4 , append child
        phoneContainer.appendChild(phoneCard);
    })

    //  hide Loading
    toggleLoaddingSpinner(false);


}

// handel Show Ditails
const handelShowDetails = async(id) => {
    // console.log('clicked show details', id)
    // load single Data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    // console.log(data);
    const phone = data.data;

    showDetails(phone);
}

const showDetails = (phone) => {
    console.log(phone);
    const phoneName = document.getElementById('show-details-phone-name');
    phoneName.innerText = phone.name;
    

    const showDetailsContainer = document.getElementById('show-detail-Container');
    showDetailsContainer.innerHTML = `
    <img class="m-auto p-4 text-center justify-center items-center" src="${phone.image}" alt="">
    <p><span class="text-[black]"> Brand :</span> ${phone.brand}</p>
    <p><span class="text-[black]"> Storage :</span> ${phone.mainFeatures.storage}</p>
    <p><span class="text-[black]"> ChipSet:</span> ${phone.mainFeatures.chipSet}</p>
    <p><span class="text-[black]"> DisplaySize:</span> ${phone.mainFeatures.displaySize}</p>
    <p><span class="text-[black]"> memory:</span> ${phone.mainFeatures.memory}</p>
    <p><span class="text-[black]"> Bluetooth: </span> ${phone.others?.Bluetooth || 'No Bluetooth Available'}</p>
    <p><span class="text-[black]"> GPS: </span> ${phone.others?.GPS || 'No GPS Available'}</p>
    <p><span class="text-[black]"> NFC: </span> ${phone.others?.NFC || 'No NFC Available'}</p>
    <p><span class="text-[black]"> Radio: </span> ${phone.others?.Radio || 'No Radio Available'}</p>
    <p><span class="text-[black]"> USB: </span> ${phone.others?.USB || 'No USB Available'}</p>
    <p><span class="text-[black]"> releaseDate: </span> ${phone.others?.releaseDate || 'No releaseDate Available'}</p>
    <p><span class="text-[black]"> WLAN: </span> ${phone.others?.WLAN || 'No WLAN Available'}</p>
    
    `;
    
    // show modal
    modal.showModal();
}


// handel searsh button
const handelSearch = (isShowAll) => {
    toggleLoaddingSpinner (true);
    // console.log('search handel')
    const searchHander = document.getElementById('search-Fild');
    const searchText = searchHander.value;
    // console.log(searchText);
    loadPhone(searchText, isShowAll);
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

// handel show all
const handelShowAll = () => {
    handelSearch (true);
}


loadPhone ();