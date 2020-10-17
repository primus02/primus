// Selectors
let inputFirstName= document.querySelector(".first-name");
let inputLastName= document.querySelector(".last-name");
let inputEmail= document.querySelector(".email");
let selectGender= document.querySelector("select");
let checkButton= document.querySelector(".check-button");
let submitButton= document.querySelector("button");
let addedInfoArea = document.querySelector("table");
let check= "fa-check-square";
let uncheck= "fa-square";
let id=0;
let LIST;



// Event Listeners
submitButton.addEventListener("click", ()=>{
    let DONE;
    if(checkButton.classList.contains("fa-check-square")){
      DONE = "Yes";
    }
    else if(checkButton.classList.contains("fa-square")){
     DONE = "No";
    }
    
    let firstName = inputFirstName.value;
    let lastName = inputLastName.value;
    let emailAddress = inputEmail.value;
    let gender = selectGender.value;
    
    if(!firstName || !lastName || !emailAddress){
        alert("Kindly provide all the required information!");
        return;
    }
    
    addPatients(firstName, lastName, emailAddress, gender, id, DONE, false);
    
    
    LIST.push(
    {
       firstName : firstName,
       lastName: lastName,
       emailAddress: emailAddress,
       gender: gender,
       id: id,
       done: DONE,
       trash: false
    }
    );
    
    localStorage.setItem("PATIENTSINFO", JSON.stringify(LIST));
    
    
    id++;
});


checkButton.addEventListener("click", checkButtons);

addedInfoArea.addEventListener("click", changeInfo);


// Functions
function addPatients(firstName, lastName, emailAddress, gender,id, DONE, trash){
    
  if(trash){return;}
    
  let text =`<tr>
               <td>${firstName} ${lastName}</td>
               <td>${emailAddress}</td>
               <td>${gender}</td>
               <td><a href="">${DONE}</a></td>
               <td><button class="edit" id="${id}">Edit</button></td>
               <td><button class="delete" id="${id}">Delete</button></td>
             </tr>`;
    
    addedInfoArea.insertAdjacentHTML("beforeEnd", text);
    
    
    
    inputFirstName.value="";
    inputLastName.value="";
    inputEmail.value = "";
}


function checkButtons(){
    checkButton.classList.toggle(check);
    checkButton.classList.toggle(uncheck);
}


function changeInfo(e){
    let filter= e.target;
    if(filter.className === "edit"){
       inputFirstName.value = filter.parentElement.parentElement.children[0].innerText;
        
        inputEmail.value = filter.parentElement.parentElement.children[1].innerText;
        
        selectGender.value = filter.parentElement.parentElement.children[2].innerText;
        
        filter.parentElement.parentElement.remove();
        
        LIST[filter.id].trash = true;
        localStorage.setItem("PATIENTSINFO", JSON.stringify(LIST));
    }
    else if(filter.className === "delete"){
        filter.parentElement.parentElement.remove();
        
        LIST[filter.id].trash = true;
        localStorage.setItem("PATIENTSINFO", JSON.stringify(LIST));
        
    }

}



let data= localStorage.getItem("PATIENTSINFO");

if(!data){
    LIST=[];
}
else{
    LIST = JSON.parse(data);
    id= LIST.length;
    loadSavedInfo(LIST);
}


function loadSavedInfo(LIST){
    LIST.forEach((list)=>{
        addPatients(list.firstName, list.lastName, list.emailAddress, list.gender, list.id, list.done, list.trash);
    });
}