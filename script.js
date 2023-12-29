var dateInput = document.getElementById("dateInput");
var contentInput = document.getElementById("contentInput");

var addBtn = document.getElementById("addBtn");

var rmovBtn = document.getElementById("rmovBtn");

var displayData = document.getElementById("displayData");

const saveData = (date, content) => {
  let existingData = JSON.parse(localStorage.getItem("dairyData")) || [];

  existingData.push({ date: date, content: content });

  localStorage.setItem("dairyData", JSON.stringify(existingData));
};

addBtn.onclick = () => {
  if (!dateInput.value || contentInput.value == "") {
    // const empty = document.createElement("h3");
    // document.getElementById("userError").appendChild(empty);
    // empty.innerText = "inculde date and content to add in dairy";

    document.getElementById("errorData").innerHTML =
      "<h3>Share your thoughts</h3>";
  } else {
    document.getElementById("errorData").innerHTML = "";
    let divDate = document.createElement("div");
    divDate.setAttribute("id", "date");
    document.getElementById("displayData").appendChild(divDate);
    divDate.innerText = dateInput.value;

    let divContent = document.createElement("div");
    divContent.setAttribute("id", "content");
    document.getElementById("displayData").appendChild(divContent);
    divContent.innerText = contentInput.value;

    saveData(dateInput.value, contentInput.value);
  }
};

window.onload = () => {
  let savedData = JSON.parse(localStorage.getItem("dairyData")) || [];

  savedData.forEach((entry) => {
    let divDate = document.createElement("div");
    document.getElementById("displayData").appendChild(divDate);
    divDate.innerText = entry.date;

    let divContent = document.createElement("div");
    document.getElementById("displayData").appendChild(divContent);
    divContent.innerText = entry.content;
  });
};

const deleteData = () => {
  if (displayData.hasChildNodes()) {
    // const empty = document.createElement("h3");
    // document.getElementById("userError").appendChild(empty);
    // empty.innerText = "inculde date and content to add in dairy";

    localStorage.removeItem("dairyData");

    const delDate = document.getElementById("date");
    delDate.remove();

    const delContent = document.getElementById("content");
    delContent.remove();
  } else {
    document.getElementById("errorData").innerHTML =
      "<h3>Share your thoughts</h3>";
  }
};

rmovBtn.onclick = () => {
  deleteData();
};
