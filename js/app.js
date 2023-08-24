let slicer = 6;

// console.log(slicer)

const fetchData = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();

  displayCards(data.data.tools);
  dateData(data.data.tools);

}

const dateData = data => {
  if (slicer == 6) {
    data = data.slice(0, slicer)
  }
  else {
    data = data.slice(0, slicer)
  }
  const obj = data.sort(sortByDate);
  document.getElementById("sort-by-date").addEventListener('click', function () {
    console.log("sort by date")

    const cardDiv = document.getElementById("cardsList");
    cardDiv.innerHTML = ``;
    displayCards(obj);
  })
}


function sortByDate(a, b) {
  return new Date(a.published_in).valueOf() - new Date(b.published_in).valueOf();
}

const displayCards = (data) => {
  // console.log(slicer)
  const cardDiv = document.getElementById("cardsList");
  const dataLength = data.length;

  if (dataLength > 6) {
    data = data.slice(0, slicer);
  }
  else {
    data = data.slice(0, slicer);
  }
  for (x in data) {
    const card = cardGenerator(data[x])
    // console.log(card)
    cardDiv.appendChild(card);
  }
  Spinner(false);
}

document.getElementById("show-more").addEventListener('click', function () {
  Spinner(true);
  const cardDiv = document.getElementById("cardsList");
  cardDiv.innerHTML = ``;
  slicer = 12
  fetchData();
})

const Spinner = isLoading => {
  const showMoreButton = document.getElementById("show-more");
  if (isLoading) {
    showMoreButton.classList.add("loading");

  }
  else {
    showMoreButton.classList.remove("loading");

  }
}


const cardGenerator = data => {
  const card = document.createElement('div');
  card.classList.add('cardInfo');
  const orderedList = document.createElement('ul');
  // console.log(data)
  // orderedList.classList.add('list-decimal')
  let counter = 0;
  for (i in data.features) {
    // console.log(i)
    counter++;
    const listData = data.features[i];
    orderedList.innerHTML += `<li>${counter}.  ${listData}</li>`
  }
  // console.log(orderedList);
  console.log(data.id)
  card.innerHTML = `
    <img class="p-3 rounded-3xl" src='${data.image}'/>
    <div class="card-body">
      <h2 class="cardTitleInfo">Features</h2>
      <div class="cardItemInfo" id="card-items">
        ${orderedList.outerHTML}
      </div>
      <span class="border my-5 border-gray-400"></span>
      <div class="flex justify-between">
        <div class="flex-col">
          <h2 class="cardTitleInfo" id="card-title-2">${data.name}</h2>
          <div class="inline-flex gap-3 my-2">
            <img  src="./image/Vector_calendar.png" alt="">
            <p class="dateInfo" id="date-info">${data.published_in}</p>
          </div>
        </div>
        <div class="card-actions p-2">
          <button class="my-5" onclick= fetchModalData('${data.id}')><label for="my-modal-3"><i class="fa-solid fa-arrow-right iconInfo"></i> </label>
          </button>
        </div>
      </div>
    </div>
    
    `
  return card;
}





fetchData();

const fetchModalData = async (id) => {
  console.log(id)
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data)
  displayModalData(data.data);

}
descriptionModal = data => {
  return data.description;
}

price = data => {
  return data.price;
}

featureFunction = data => {
  const unOrderedList = document.createElement("ul")
  unOrderedList.classList.add("modalFeatureText")
  for (i in data) {
    const liData = data[i].feature_name;
    unOrderedList.innerHTML += `<li class="px-2"> ${liData}</li>`;
  };
  return unOrderedList;
}

const integrationFunction = data => {
  console.log()
  const unOrderedList = document.createElement("ul")
  unOrderedList.classList.add("modalFeatureText")
  if (data !== null) {
    for (i in data) {
      const liData = data[i];
      unOrderedList.innerHTML += `<li class="px-2"> ${liData}</li>`;
    };

  }
  else {
    unOrderedList.innerHTML = `<li class="inline text-secondary-regular text-lg"> No data Found </li>`;
  }
  return unOrderedList

}

const imageLoader = data => {
  // const length = data.length;
  // console.log(data)
  return data[0]
}

const displayModalData = data => {
  const description = descriptionModal(data);


  const basicPrice = (data.pricing !== null) ? price(data.pricing[0]) : 'Free of Cost/Basic';
  const proPrice = (data.pricing !== null) ? price(data.pricing[1]) : 'Free of Cost/Pro';
  const enterprisePrice = (data.pricing !== null) ? price(data.pricing[2]) : 'Free of Cost/Enterprise';

  console.log(data.features[1].feature_name)

  const fetureData = featureFunction(data.features)

  console.log(data.integrations)
  const integrationData = integrationFunction(data.integrations);
  // console.log(data.description)
  //console.log(description)
  const modalDiv = document.getElementById("modalDiv");
  modalDiv.innerHTML = ``;
  const modalLeftData = document.createElement("div");
  modalLeftData.classList.add("modalLeftData");
  modalLeftData.innerHTML = ` 
  <h2 class="text-primary text-xl font-semibold">${description}</h2>
    <div class="gridInfo my-4 pt-8">
      <div class="w-10/12"><p class="modalBasic">${basicPrice}</p></div>
      <div class="w-10/12"><p class="modalPro">${proPrice}</p></div>
      <div class="w-10/12"><p class="modalEnterprise">${enterprisePrice}</p></div>    
    </div>
    
    <div class="flex-row md:flex lg:flex justify-between m-2">
    <div class="justify-start">
      <h2 class="cardTitleInfo">Features</h2>
      <div class="mx-4 p-5">
        ${fetureData.outerHTML}
      </div>
    </div>
    <div class="jusify-start">
      <h2 class="cardTitleInfo">Integration</h2>
      <div class="mx-4 p-5">
        ${integrationData.outerHTML}
      </div>
    </div>
  </div>
  `


  const modalRightData = document.createElement("div");
  modalRightData.classList.add("modalRightData");
  const imageData = imageLoader(data.image_link);

  let invisbleClass;
  const accuracyData = data.accuracy.score * 100;
  if (accuracyData > 0) {
    invisbleClass = ''
  }
  else {
    invisbleClass = 'invisible'
  }

  const titleData = data.input_output_examples;
  // console.log(titleData !== null)
  const inputText = (titleData !== null) ? titleData[0].input : "Can you give any example?"
  const outputText = (titleData !== null) ? titleData[0].output : "No! Not Yet! Take a break!!!"


  modalRightData.innerHTML = `
<div class="relative">
  <img  class="p-3 rounded-3xl" src="${imageData}">
  <div class="modalAccuracy ${invisbleClass}">
    <p>${accuracyData}% accuracy</p>
  </div>
</div>
<div class="text-center">
  <h2 class="text-primary text-justify font-semibold text-2xl mx-3 px-3 pt-2">${inputText}</h2>
  <p class="text-secondary-regular text-justify text-2xl mx-3 p-2"></p>${outputText}
</div>
`

  modalDiv.appendChild(modalLeftData);
  modalDiv.appendChild(modalRightData);

}



