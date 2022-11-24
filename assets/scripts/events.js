var list = document.getElementById('current-event');

fetch('assets/data/events.json')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => displayCards(data));

// Example - Card
// <div class="card">
//     <img src="assets/img/event/Behavioral-Interview-Prep.png" class="card__image" alt="" />
//     <div class="card__overlay">
//         <div class="card__header">
//             <svg class="card__arc" xmlns="http://www.w3.org/2000/svg"><path /></svg>    //Did not add idk what do o-O                 
//             <img class="card__thumb virtual" src="assets/img/icon-virtual.png" alt="" />
//             <div class="card__header-text">
//                 <h3 class="card__title">Behavioral Interview Prep</h3>            
//                 <span class="card__date">November 29th</span>
//             </div>
//         </div>
//         <p class="card__description">
//             <span class="card__time"> 2PM - 3:30PM | Discord</span><br><br>
//             Members will learn how to prepare for a behavioral interview by reviewing
//             commonly asked questions and hearing advice from officers and Cracking the 
//             Code book.
//             <br><br>
//             We will practice answering questions to improve and prepare for interviews.
//         </p> 
//     </div>
// </div>  

function displayCards(json) {
    json.forEach(event => {
        console.log(event);

        //Event Image
        var imgEvent = document.createElement('img');
        imgEvent.className = "card__image";
        imgEvent.alt = "event image";
        imgEvent.src = event.img;

        //Header
        var icon = document.createElement('img');
        icon.alt = "icon image";
        icon.src = "assets/img/icon-" + event.type + ".png";
        icon.classList.add('card__thumb', event.type);

        var title = document.createElement('h3');
        title.className = "card__title";
        title.textContent = event.title;

        var date = document.createElement('span');
        date.className = "card__date";
        date.textContent = event.date;

        //Add details to Header
        var headerInfo = document.createElement('div');
        headerInfo.className = "card__header-text";
        headerInfo.append(title);
        headerInfo.append(date);

        var cardHeader = document.createElement('div');
        cardHeader.className = "card__header";
        cardHeader.append(icon);
        cardHeader.append(headerInfo);

        //Description
        var time = document.createElement('span');
        time.className = "card__time";
        time.textContent = event.time;

        //Add details to Description
        var cardDescription = document.createElement('p');
        cardDescription.className = "card__description";
        cardDescription.append(time);
        cardDescription.innerHTML += "<br><br>" + event.description;


        //Add details to cardInfo
        var cardInfo = document.createElement('div');
        cardInfo.className = "card__overlay";
        cardInfo.append(cardHeader);
        cardInfo.append(cardDescription);

        //Add details to card
        var card = document.createElement('div');
        card.className = "card";
        card.append(imgEvent);
        card.append(cardInfo);
        list.append(card);  
    })
  
    cardBlog();
}

//Example - Blog Card
// <a href="blog.html">
//     <li>
//         <div class="card">
//             <img src="assets/img/event/past-events.png" class="card__image" alt="" />
//         </div>      
//     </li>  
// </a>
function cardBlog() {
    var blog = document.createElement('a');
    blog.href = "blog.html";

    var card = document.createElement('div');
    card.className = "card";

    var img = document.createElement('img');
    img.className = "card__image";
    img.alt = "blog image";
    img.src = "assets/img/event/past-events.png";
    
    card.append(img); 
    blog.append(card);  
    list.append(blog);  
}

