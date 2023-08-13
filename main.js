var form = document.getElementById("form");

var list = document.getElementById("list");

var nameItem = document.querySelector("#name");
var emailItem = document.querySelector("#email");
var phoneItem = document.querySelector("#phone");

form.addEventListener("submit", addItem);

// list.addEventListener("click", editItem);

let key = {};

async function addItem(e) {
  e.preventDefault();
  key = {
    name: nameItem.value,
    emailId: emailItem.value,
    phone_no: phoneItem.value,
  };
  let res;
  let id = document.querySelector('input[type="submit"]').id;
  if (id) {
    res = await axios.put(
      `https://crudcrud.com/api/283f66a9a2ec4195a91c218b318eec35/appointmentData/${id}`,
      key
    );
    document.querySelector('input[type="submit"]').id = "";
  } else {
    res = await axios.post(
      "https://crudcrud.com/api/283f66a9a2ec4195a91c218b318eec35/appointmentData",
      key
    );
    id = res.data._id;
    editBtn.id = res.data._id;
    deleteBtn.id = res.data._id;
  }
  // let id = "";
  // var input1 = document.getElementById("name").value;
  // var input2 = document.getElementById("email").value;
  // var input3 = document.getElementById("phone").value;
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
  // li.textContent = `${id} ${input1} ${input2} ${input3} `;
  let span1 = document.createElement("span");
  span1.textContent = `${key.name}`;
  let span2 = document.createElement("span");
  span2.textContent = `${key.emailId}`;
  let span3 = document.createElement("span");
  span3.textContent = `${key.phone_no}`;
  li.appendChild(span1);
  li.appendChild(span2);
  li.appendChild(span3);

  let div = document.createElement("div");
  // li.appendChild(deleteBtn);
  // li.appendChild(editBtn);
  div.appendChild(deleteBtn);
  div.appendChild(editBtn);
  //append li to ul

  li.appendChild(div);
  list.appendChild(li);
}

window.addEventListener("DOMContentLoaded", () => {
  renderList();
});

async function renderList() {
  try {
    const users = await axios.get(
      "https://crudcrud.com/api/283f66a9a2ec4195a91c218b318eec35/appointmentData"
    );

    users.data.forEach((elem) => {
      var li = document.createElement("li");
      // li.textContent = `${elem.name} ${elem.emailId} ${elem.phone_no} `;
      var deleteBtn = document.createElement("button");
      var editBtn = document.createElement("button");

      //give classname to the li element
      li.className = "items";
      deleteBtn.className = "delete btn btn-dark";
      editBtn.className = "edit btn btn-info";
      editBtn.id = elem._id;
      deleteBtn.id = elem._id;
      deleteBtn.appendChild(document.createTextNode("Delete"));
      editBtn.appendChild(document.createTextNode("Edit"));
      let span1 = document.createElement("span");
      span1.textContent = `${elem.name}  `;
      let span2 = document.createElement("span");
      span2.textContent = `${elem.emailId}  `;
      let span3 = document.createElement("span");
      span3.textContent = `${elem.phone_no} `;
      li.appendChild(span1);
      li.appendChild(span2);
      li.appendChild(span3);
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

// list.addEventListener("click", async (e) => {
//   // var itemName = li.dataset.name;

//   if (e.target.classList.contains("delete")) {
//     var li = e.target.parentElement;
//     var id = e.target.id;
//     // localStorage.removeItem(itemName);
//     console.log(id);
//     list.removeChild(li);
//     await axios
//       .delete(
//         `https://crudcrud.com/api/cf67262f3e0646a2b91a9111b307d2ae/appointmentData/${id}`
//       )
//       .catch((err) => console.log(err));
//   }
// });

list.addEventListener("click", async (e) => {
  // console.log(e.target.parentElement);
  if (e.target.classList.contains("delete")) {
    var li = e.target.parentElement;
    var id = e.target.id;
    console.log(e.target.id);
    // localStorage.removeItem(itemName);

    list.removeChild(li);
    await axios.delete(
      `https://crudcrud.com/api/283f66a9a2ec4195a91c218b318eec35/appointmentData/${id}`
    );
  }
  if (e.target.classList.contains("edit")) {
    var li = e.target.parentElement;
    var id = e.target.id;

    console.log(li.innerText);

    document.getElementById("name").value =
      li.getElementsByTagName("span")[0].textContent;
    document.getElementById("email").value =
      li.getElementsByTagName("span")[1].textContent;
    document.getElementById("phone").value = Number(
      li.getElementsByTagName("span")[2].textContent
    );
    document.querySelector('input[type="submit"]').id = e.target.id;
    list.removeChild(li);
  }
});
