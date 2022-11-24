var dropdown = document.getElementById('blog-dropdown');
// var defaultYear = document.getElementById("selection").value;
var blog = document.getElementById('blog');

var jsonArr = []
fetch('assets/data/blog.json')
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => displayCards(data));

function loadEvents() {
    console.log(jsonArr);
    if(jsonArr != [] || jsonArr != undefined) {
        displayCards(jsonArr);
    }
    else {
        fetch('assets/data/blog.json')
            .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
            .then(data => displayCards(data));
    }
}

function getEvents(year) {
    var selected = document.getElementById("selection").value;
    console.log(selected);
    return year.year == String(selected);
}

//Example
// <div class="blog-card">
//     <div class="time">
//         <h5>Nov.<br>2nd</h5>
//     </div>
//     <div class="details">
//         <div class="event-title">
//             <img class="in-person" src="assets/img/icon-in-person.png" alt="In Person Event">
//             <h5>Intro to Github</h5>
//         </div>
//         <p>
//             Members learn about GitHub and git in a hands-on workshop. During this workshop
//             members created an SSH key, connected it to their GitHub account, then practiced
//             some git commands. 
//         </p>
//     </div>
// </div>
function displayCards(json) {
    console.log(json);
    if(jsonArr != [] || jsonArr != undefined) {
        jsonArr = json;
    }
    var result = json.filter(getEvents);
    var events = result[0].events;
    console.log(result);
    console.log(events);

    var selected = document.getElementById("selection").value;
    console.log(selected);
    blog.innerHTML = "";
    dropdownForm(selected);

    events.forEach(event => {
        //Time
        var date = document.createElement('div');
        date.className = "date";

        var dateText = document.createElement('h5');
        dateText.innerHTML = event.date;

        date.append(dateText);

        //Title
        var details = document.createElement('div');
        details.className = "details";

        var title = document.createElement('div');
        title.className = "event-title";

        var icon = document.createElement('img');
        icon.className = event.type;
        icon.alt = "icon image";
        icon.src = "assets/img/icon-" + event.type + ".png";

        var eventTitle = document.createElement('h5');
        eventTitle.innerHTML = event.title;

        title.append(icon);
        title.append(eventTitle);

        //Description
        var eventDescription = document.createElement('p');
        eventDescription.innerHTML = event.description;

        //Add details to Description
        details.append(title);
        details.append(eventDescription);

        //Add details to card
        var card = document.createElement('div');
        card.className = "blog-card";
        card.append(date);
        card.append(details);

        //Add details to blog
        blog.append(card);  
    })
}


//Example - Dropdown Select
// <div id="blog-dropdown" class="form-container">
//     <form>
//         <label>Academic Year</label>
//         <select id="selection" class="custom-select">
//             <option selected value="2022-2023">2022-2023</option>
//             <option value="2021-2022">2021-2022</option>
//         </select>
//     </form>
// </div>
function dropdownForm(selected) {
    var dropdownDiv = document.createElement('div');
    dropdownDiv.className = "form-container";
    dropdownDiv.id = "blog-dropdown";

    var form = document.createElement('form');
    var label = document.createElement('label');
    label.innerHTML = "Academic Year";

    var select = document.createElement('select');
    select.className = "custom-select";
    select.id = "selection";
    select.name = "selection"
    // select.onchange = "loadEvents()";
    select.addEventListener('change', loadEvents);

    var years = ['2022-2023', '2021-2022'];
    years.forEach(year => {
        var option = document.createElement('option');
        option.innerHTML = year;
        option.value = year;

        if(year == selected) {
            option.selected = true;
        }
        else {
            option.selected = false;
        }

        select.append(option);
    })

    form.append(label); 
    form.append(select); 
    dropdownDiv.append(form); 
    blog.append(dropdownDiv);  
}