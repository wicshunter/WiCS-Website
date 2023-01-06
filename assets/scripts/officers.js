/******************************* Current Officers *******************************/

var currentOfficers = document.getElementById('current-officers');
fetch('assets/data/officers.json')
  .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
  .then(data => displayCurrent(data));

/******************************* Current Officer Card - Example
<div class="officer-card">
    <div class="card-align">
        <img src="assets/img/officers/Kelly-Camacho.jpg" alt="">
        <div class="card-info">
            <h2 class="name">Kelly Camacho</h2>
            <h4>President</h4>
            <p>Computer Science Major <br> Media Studies Focus Study</p>
            <div class="card-icons">
                <a href="mailto: ksophia.martinez@gmail.com">
                    <i class="fa fa-google"></i>
                </a>
                <a href="https://www.linkedin.com/in/kelly-camacho/">
                    <i class="fa fa-linkedin"></i>
                </a>
                <a href="https://github.com/k-sophia">
                    <i class="fa fa-github"></i>
                </a>
            </div>
        </div>
    </div>
</div>
*******************************/
function displayCurrent(json) {
    console.log("current");

    var result = json[0].current;
    console.log(result);
    result.forEach(officer => {

        //Officer Image
        var img = document.createElement('img');
        img.alt = "officer image";
        img.src = officer.img;

        //Officer Information
        var name = document.createElement('h2');
        name.className = "name";
        name.innerHTML = officer.name;

        var role = document.createElement('h4');
        role.innerHTML = officer.role;

        var board = document.createElement('h9');
        name.innerHTML = officer.board;

        var description = document.createElement('p');
        description.innerHTML = officer.description;

        //Officer Socials
        var socials = ["google", "linkedin", "github"];
        var icons = document.createElement('div');
        icons.className = "card-icons";
        socials.forEach(type => {
             var a = document.createElement('a');
             a.href = officer.social[type];

             var i = document.createElement('i');
             i.classList.add('fa', 'fa-' + [type]);

             a.append(i);
             icons.append(a);
        })

        //Add details to card alignment
        var cardInfo = document.createElement('div');
        cardInfo.className = "card-info";
        cardInfo.append(name);
        cardInfo.append(board);
        cardInfo.append(role);
        cardInfo.append(description);
        cardInfo.append(icons);


        //Add details to card alignment
        var cardAlign = document.createElement('div');
        cardAlign.className = "card-align";
        cardAlign.append(img);
        cardAlign.append(cardInfo);

        //Add details to card
        var card = document.createElement('div');
        card.className = "officer-card";
        card.append(cardAlign);

        currentOfficers.append(card);  
    })
}


/******************************* Past Officers *******************************/
var dropdown = document.getElementById('officer-dropdown');
var selectOfficers = document.getElementById('select-officers');

var jsonArr = []
fetch('assets/data/officers.json')
    .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
    .then(data => displayPrevious(data));

function loadEvents() {
    console.log(jsonArr);
    if(jsonArr != [] || jsonArr != undefined) {
        displayPrevious(jsonArr);
    }
    else {
        fetch('assets/data/officers.json')
            .then(res => res.json()) // the .json() method parses the JSON response into a JS object literal
            .then(data => displayPrevious(data));
    }
}

function getOfficers(officer) {
    var selected = document.getElementById("selection").value;
    var served = officer.served;
    if(served.includes(selected)) {
        return officer;
    }
}

/******************************* Previous Officer Card - Example
<div class="past-card">
    <img src="assets/img/officers//Kelly-Camacho.jpg" alt="">
    <div class="past-align">
        <div class="past-info">
            <h5> Kelly Camacho <br> President</h5>
            <h6 class="year-served">2021-2022</h6>
        </div>
        <div class="past-icons">
            <a href="mailto: ksophia.martinez@gmail.com">
                <i class="fa fa-google"></i>
            </a>
            <a href="https://www.linkedin.com/in/kelly-camacho/">
                <i class="fa fa-linkedin"></i>
            </a>
            <a href="https://github.com/k-sophia">
                <i class="fa fa-github"></i>
            </a>
        </div>
    </div>
</div>
*******************************/
function displayPrevious(json) {
    console.log("Selected");
    var selected = document.getElementById("selection").value;
    console.log(selected);
    selectOfficers.innerHTML = "";

    if(jsonArr != [] || jsonArr != undefined) {
        jsonArr = json;
    }
    var previous = json[0].past;
    var result = previous.filter(getOfficers);
    console.log(result);

    result.forEach(officer => {

        //Officer Image
        var img = document.createElement('img');
        img.alt = "officer image";
        img.src = officer.img;

        //Officer Information
        var h5 = document.createElement('h5');
        h5.innerHTML = officer.name + '<br>' + officer.board + officer.role;
        var h6 = document.createElement('h6');
        h6.className = "year-served";
        h6.innerHTML = officer.totalServed;

        //Officer Socials
        var socials = ["google", "linkedin", "github"];
        var icons = document.createElement('div');
        icons.className = "past-icons";
        socials.forEach(type => {
             var a = document.createElement('a');
             a.href = officer.social[type];

             var i = document.createElement('i');
             i.classList.add('fa', 'fa-' + [type]);

             a.append(i);
             icons.append(a);
        })

        //Add details to officer information
        var cardInfo = document.createElement('div');
        cardInfo.className = "past-info";
        cardInfo.append(h5); 
        cardInfo.append(h6); 

        //Add details to card alignment
        var cardAlgin = document.createElement('div');
        cardAlgin.className = "past-align";
        cardAlgin.append(cardInfo); 
        cardAlgin.append(icons); 

        //Add details to card
        var card = document.createElement('div');
        card.className = "past-card";
        card.append(img);  
        card.append(cardAlgin); 

        selectOfficers.append(card);  
    })
}