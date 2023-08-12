var form = document.getElementById("form");

var list = document.getElementById("list");

var nameItem = document.querySelector("#name");
var emailItem = document.querySelector("#email");
var phoneItem = document.querySelector("#phone");

form.addEventListener("submit", addItem);

// list.addEventListener("click", editItem);

let key = {};

function addItem(e) {
  e.preventDefault();
  key = {
    name: nameItem.value,
    emailId: emailItem.value,
    phone_no: phoneItem.value,
  };
  let id = "";
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
  // li.dataset.name = input1;
  // li.dataset.email = input2;
  // li.dataset. = input3;

  deleteBtn.appendChild(document.createTextNode("Delete"));
  editBtn.appendChild(document.createTextNode("Edit"));

  //apend the txt
  li.textContent = `${id} ${input1} ${input2} ${input3} `;

  li.appendChild(deleteBtn);
  li.appendChild(editBtn);

  //append li to ul
  list.appendChild(li);
  axios
    .post(
      "https://crudcrud.com/api/f28411e73f7342ebad8fa41a2c06a1b6/appointmentData",
      key
    )
    .then((response) => {
      console.log(response);
      id = response.data._id;
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
      "https://crudcrud.com/api/f28411e73f7342ebad8fa41a2c06a1b6/appointmentData"
    );

    users.data.forEach((elem) => {
      var li = document.createElement("li");
      li.textContent = `${elem._id} ${elem.name} ${elem.emailId} ${elem.phone_no} `;
      var deleteBtn = document.createElement("button");
      var editBtn = document.createElement("button");

      //give classname to the li element
      li.className = "items";
      deleteBtn.className = "delete btn btn-dark";
      editBtn.className = "edit btn btn-info";
      deleteBtn.id = elem._id;
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

list.addEventListener("click", async (e) => {
  // var itemName = li.dataset.name;

  if (e.target.classList.contains("delete")) {
    var li = e.target.parentElement;
    var id = e.target.id;
    // localStorage.removeItem(itemName);
    console.log(id);
    list.removeChild(li);
    await axios.delete(
      `https://crudcrud.com/api/f28411e73f7342ebad8fa41a2c06a1b6/appointmentData/${id}`
    );
  }
});
