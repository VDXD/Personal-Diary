var dateInput = document.getElementById("dateInput");
var contentInput = document.getElementById("contentInput");
var contextInput = document.getElementById("contextInput");

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
  myUserName.textContent = `Welcome Back ${storedUserName}`;
  setUserName.textContent = "Change User Name";
}

setUserName.onclick = () => {
  userName();
};

const saveData = (date, content, context) => {
  let existingData = JSON.parse(localStorage.getItem("dairyData")) || [];

  existingData.push({ date: date, content: content, context: context});

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
    entry.contextElement.remove();
    remBtn.remove();
  };

  return remBtn;
};

addBtn.onclick = () => {
  if (!dateInput.value || contentInput.value == "" || contentInput.value == "") {
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

    let divContext = document.createElement("div");
    divContext.setAttribute("id", "context");
    document.getElementById("displayData").appendChild(divContext);
    divContext.innerText = contextInput.value;

    let removeBtn = addRemoveBtn({
      context: contextInput.value,
      content: contentInput.value,
      date: dateInput.value,
      contextElement: divContext,
      contentElement: divContent,
      dateElement: divDate
    });

    document.getElementById("displayData").appendChild(divContext);
    document.getElementById("displayData").appendChild(divContent);
    document.getElementById("displayData").appendChild(divDate);
    document.getElementById("displayData").appendChild(removeBtn);

    displayData.insertBefore(removeBtn, displayData.firstChild);
    displayData.insertBefore(divDate, displayData.firstChild);
    displayData.insertBefore(divContent, displayData.firstChild);
    displayData.insertBefore(divContext, displayData.firstChild);

    saveData(dateInput.value, contentInput.value, contextInput.value);
  }

  dateInput.value = "";
  contentInput.value = "";
  contextInput.value = "";
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

    let divContext = document.createElement("div");
    document.getElementById("displayData").appendChild(divContext);
    divContext.innerText = entry.context;

    let removeBtn = addRemoveBtn({
      context: contextInput.value,
      content: contentInput.value,
      date: dateInput.value,
      contextElement: divContext,
      contentElement: divContent,
      dateElement: divDate
    });

    document.getElementById("displayData").appendChild(divContext);
    document.getElementById("displayData").appendChild(divContent);
    document.getElementById("displayData").appendChild(divDate);
    document.getElementById("displayData").appendChild(removeBtn);

    displayData.insertBefore(removeBtn, displayData.firstChild);
    displayData.insertBefore(divDate, displayData.firstChild);
    displayData.insertBefore(divContent, displayData.firstChild);
    displayData.insertBefore(divContext, displayData.firstChild);
  });
};

rmovBtn.onclick = () => {
  localStorage.removeItem("dairyData");
  displayData.innerHTML = "";
};
