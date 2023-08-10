var form = document.getElementById("form");

var list = document.getElementById("list");

var nameItem = document.querySelector("#name");
var emailItem = document.querySelector("#email");
var phoneItem = document.querySelector("#phone");

form.addEventListener("submit", addItem);
// list.addEventListener("click", del);
// list.addEventListener("click", editItem);

let key = {};
function addItem(e) {
  e.preventDefault();
  key = {
    name: nameItem.value,
    email: emailItem.value,
    phone: phoneItem.value,
  };
  var input1 = document.getElementById("name").value;
  var input2 = document.getElementById("email").value;
  var input3 = document.getElementById("phone").value;
  //create a new li element
  var li = document.createElement("li");
  var deleteBtn = document.createElement("button");
  var editBtn = document.createElement("button");

  //give classname to the li element
  li.className = "items";
  deleteBtn.className = "delete btn btn-dark";
  editBtn.className = "edit btn btn-info";

  // Add a unique key as a data attribute to the li element
  li.dataset.name = input1;
  li.dataset.email = input2;
  li.dataset.email = input3;

  deleteBtn.appendChild(document.createTextNode("Delete"));
  editBtn.appendChild(document.createTextNode("Edit"));

  //apend the txt
  li.appendChild(document.createTextNode(input1));

  li.appendChild(document.createTextNode(input2));
  li.appendChild(document.createTextNode(input3));
  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  //append li to ul
  list.appendChild(li);
  axios
    .post(
      "https://crudcrud.com/api/e89dc6211406462e8a6f9858622a3a90/appointmentData",
      key
    )
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addEventListener("DOMContentLoaded", () => {
  renderList();
});

async function renderList() {
  try {
    const users = await axios.get(
      "https://crudcrud.com/api/e89dc6211406462e8a6f9858622a3a90/appointmentData"
    );

    users.data.forEach((elem) => {
      var li = document.createElement("li");
      li.textContent = `${elem.name} ${elem.email} ${elem.name}`;
      var deleteBtn = document.createElement("button");
      var editBtn = document.createElement("button");

      //give classname to the li element
      li.className = "items";
      deleteBtn.className = "delete btn btn-dark";
      editBtn.className = "edit btn btn-info";

      deleteBtn.appendChild(document.createTextNode("Delete"));
      editBtn.appendChild(document.createTextNode("Edit"));

      //apend the txt

      li.appendChild(deleteBtn);
      li.appendChild(editBtn);

      //append li to ul
      list.appendChild(li);
    });
  } catch (e) {
    console.log(e);
  }
}
