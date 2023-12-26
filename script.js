var dateInput = document.getElementById("dateInput");
var contentInput = document.getElementById("contentInput");

var addBtn = document.getElementById("addBtn");

addBtn.onclick = () => {
  if (!dateInput.value || contentInput.value == "") {
    // const empty = document.createElement("h3");
    // document.getElementById("userError").appendChild(empty);
    // empty.innerText = "inculde date and content to add in dairy";

    document.getElementById("errorData").innerHTML = "<h3>you fucked</h3>";
  } else {
    document.getElementById("errorData").innerHTML = "";
    let divDate = document.createElement("div");
    document.getElementById("displayData").appendChild(divDate);
    divDate.innerText = dateInput.value;

    let divContent = document.createElement("div");
    document.getElementById("displayData").appendChild(divContent);
    divContent.innerText = contentInput.value;
  }
};