var dateInput = document.getElementById("dateInput");
var contentInput = document.getElementById("contentInput");

var addBtn = document.getElementById("addBtn");

var rmovBtn = document.getElementById("rmovBtn");

var displayData = document.getElementById("displayData");

var myUserName = document.getElementById("userName");

var setUserName = document.getElementById("setUserName");

const userName = () => {
  let userNameInput = prompt("Please Enter Your Username");

  if (!userNameInput) {
    userName();
  } else {
    localStorage.setItem("username", userNameInput);
    myUserName.textContent = `Share your Thoughts ${userNameInput}`;
    setUserName.textContent = "Change UserName";
  }
};

if (!localStorage.getItem("username")) {
  userName();
} else {
  const storedUserName = localStorage.getItem("username");
  myUserName.textContent = `Welcome Back ${storedUserName}, What you have today in your mind `;
  setUserName.textContent = "Change UserName";
}

setUserName.onclick = () => {
  userName();
};

const saveData = (date, content) => {
  let existingData = JSON.parse(localStorage.getItem("dairyData")) || [];

  existingData.push({ date: date, content: content });

  localStorage.setItem("dairyData", JSON.stringify(existingData));
};

const addRemoveBtn = (entry) => {
  let remBtn = document.createElement("button");
  remBtn.id = "remid";
  remBtn.innerText = "remove";

  remBtn.onclick = () => {
    let existingData = JSON.parse(localStorage.getItem("dairyData")) || [];
    existingData = existingData.filter((e) => e.date !== entry.date);
    localStorage.setItem("dairyData", JSON.stringify(existingData));

    entry.dateElement.remove();
    entry.contentElement.remove();
    remBtn.remove();
  };

  return remBtn;
};

addBtn.onclick = () => {
  if (!dateInput.value || contentInput.value == "") {
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

    let removeBtn = addRemoveBtn({
      date: dateInput.value,
      content: contentInput.value,
      dateElement: divDate,
      contentElement: divContent,
    });

    document.getElementById("displayData").appendChild(removeBtn);

    displayData.insertBefore(removeBtn, displayData.firstChild);
    displayData.insertBefore(divDate, displayData.firstChild);
    displayData.insertBefore(divContent, displayData.firstChild);

    saveData(dateInput.value, contentInput.value);
  }

  dateInput.value = "";
  contentInput.value = "";
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

    let removeBtn = addRemoveBtn({
      date: dateInput.value,
      content: contentInput.value,
      dateElement: divDate,
      contentElement: divContent,
    });

    document.getElementById("displayData").appendChild(removeBtn);
  });
};

rmovBtn.onclick = () => {
  localStorage.removeItem("dairyData");
  displayData.innerHTML = "";
};
