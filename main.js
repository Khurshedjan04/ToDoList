const switcherWindow = document.querySelector(".content_alpha");
const maker = document.querySelector(".to_do_makers");
const board = document.querySelector(".board_main");
const statusNewBoard = document.querySelector(".new");
const statusProgBoard = document.querySelector(".progg");
const statusDoneBoard = document.querySelector(".done");
let input = document.querySelector(".todo");
let deadline = document.querySelector(".deadline");
let usersActive = document.querySelectorAll(".users");
let dataInfo = JSON.parse(localStorage.getItem("toDoData") || "[]");
let userName = "";
let statusToDo = "new";
let pickedItemStatusToDo = "";
let todoinner = "";
let deadlineinner = "";
let dataInfoChild = {};
let picked_item_datas = {};
let changedItemDatas = {};
function clearer() {
  let input = document.querySelector(".todo");
  input.value = "";
  let deadline = document.querySelector(".deadline");
  deadline.value = "";
  let select1 = document.querySelector(".select1");
  select1.value = "new";
  let usersActive = document.querySelectorAll(".users");
  usersActive.forEach((user) => {
    user.classList.remove("active_user");
  });
}

function senderAlpha() {
  statusNewBoard.innerHTML = " <span>New</span>";
  statusProgBoard.innerHTML = " <span>In progress</span>";
  statusDoneBoard.innerHTML = "<span>Done</span>";
  for (let i = 0; i < dataInfo.length; i++) {
    if (dataInfo[i].statusToDo == "new") {
      statusNewBoard.insertAdjacentHTML(
        "beforeend",
        `
                  <div class="item">
                      <h1 class="picked_user_name" style="font-size: 18px;">${dataInfo[
                        i
                      ].userName.trim()}</h1>
                      <p class="send_todo"> ${dataInfo[i].todoinner.trim()} </p>
                      <div class="roll">
                          <p >Deadline: <span class="insert_deadline" >${dataInfo[
                            i
                          ].deadlineinner.trim()}</span></p>
                      <select value="${dataInfo[
                        i
                      ].statusToDo.trim()}" class="select2" name="" id="">
                          <option value="new">New</option>
                          <option value="inProgress">In progress</option>
                          <option value="done">Done</option>
                      </select>
                  </div>
                  </div>
                  `
      );
    } else if (dataInfo[i].statusToDo == "done") {
      statusDoneBoard.insertAdjacentHTML(
        "beforeend",
        `
                    <div class="item">
                        <h1 class="picked_user_name" style="font-size: 18px;">${dataInfo[
                          i
                        ].userName.trim()}</h1>
                        <p class="send_todo"> ${dataInfo[
                          i
                        ].todoinner.trim()} </p>
                        <div class="roll">
                            <p >Deadline: <span class="insert_deadline">${dataInfo[
                              i
                            ].deadlineinner.trim()}</span></p>
                        <select value="${dataInfo[
                          i
                        ].statusToDo.trim()}" class="select2" name="" id="">
                        <option value="done">Done</option> 
                            <option value="new">New</option>
                            <option value="inProgress">In progress</option>
                        </select>
                    </div>
                    </div>
                    `
      );
    } else {
      statusProgBoard.insertAdjacentHTML(
        "beforeend",
        `
              <div class="item">
                  <h1 class="picked_user_name" style="font-size: 18px;">${dataInfo[
                    i
                  ].userName.trim()}</h1>
                  <p class="send_todo"> ${dataInfo[i].todoinner.trim()} </p>
                  <div class="roll">
                      <p ">Deadline: <span class="insert_deadline" >${dataInfo[
                        i
                      ].deadlineinner.trim()}</span></p>
                  <select value="${dataInfo[
                    i
                  ].statusToDo.trim()}" class="select2" name="" id="">
                  <option class="options" value="inProgress">In progress</option>
                      <option class="options" value="new">New</option>
                      <option class="options" value="done">Done</option>
                  </select>
              </div>
              </div>
              `
      );
    }
  }
}
senderAlpha();
document.body.style.overflowY = "hidden";
window.addEventListener("click", (e) => {
  let target = e.target;

  if (target.classList.contains("maker_list")) {
    maker.classList.add("active_maker");
    board.classList.remove("active");
    // For Decoration
    target
      .closest(".buttons")
      .querySelector(".underline")
      .classList.remove("under_right");
    switcherWindow.closest(".container").style.height = "100vh";
    document.body.style.overflowY = "hidden";
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    target
      .closest(".container")
      .querySelector(".clear_local_storage")
      .classList.remove("clear_local_storage_active");

    // For Decoration
  }
  if (target.classList.contains("maker_board")) {
    maker.classList.remove("active_maker");
    maker.classList.add("hide_maker");
    board.classList.add("active");
    senderAlpha();
    // For Decoration
    target
      .closest(".buttons")
      .querySelector(".underline")
      .classList.add("under_right");
    switcherWindow.closest(".container").style.height = "100%";
    document.body.style.overflowY = "visible";
    document.body.style.overflowX = "hidden";
    target
      .closest(".container")
      .querySelector(".clear_local_storage")
      .classList.add("clear_local_storage_active");
    // For Decoration
    // For cleaner local storage
    // For cleaner local storage
  }
  if (
    target.classList.contains("users") ||
    target.classList.contains("name") ||
    target.classList.contains("status") ||
    target.classList.contains("imgimg") ||
    target.classList.contains("avatar")
  ) {
    let usersActive = document.querySelectorAll(".users");
    usersActive.forEach((user) => {
      user.classList.remove("active_user");
      if (target.classList.contains("users")) {
        target.classList.add("active_user");
      } else {
        target.closest(".users").classList.add("active_user");
      }
      userName = target.closest(".users").querySelector(".name").innerHTML;
    });
  }
  if (target.classList.contains("todo")) {
    target.addEventListener("change", () => {
      todoinner = target.value;
    });
    // decoration
    target.addEventListener("keyup", () => {
      target
        .closest(".container")
        .querySelector(".save")
        .classList.add("save_mini");
      target
        .closest(".container")
        .querySelector(".clear")
        .classList.add("clear_active");
    });
    // decoration
  }

  // clear button
  if (target.classList.contains("clear")) {
    clearer();
    target.classList.remove("clear_active");
    target
      .closest(".container")
      .querySelector(".save")
      .classList.remove("save_mini");
  }
  // clear button
  if (target.classList.contains("deadline")) {
    target.addEventListener("change", () => {
      deadlineinner = target.value;
    });
  }
  if (target.classList.contains("select1")) {
    target.addEventListener("change", () => {
      statusToDo = target.value;
    });
  }
  if (target.classList.contains("save")) {
    if (input.value == "" || deadline.value == "" || userName == "") {
      alert("You did not mention all the necessary data");
    } else {
      statusToDo = target.closest(".left").querySelector(".select1").value;

      dataInfoChild = {
        userName,
        statusToDo,
        todoinner,
        deadlineinner,
      };
      dataInfo.push(dataInfoChild);
      localStorage.setItem("toDoData", JSON.stringify(dataInfo));
      senderAlpha();
      clearer();
    }
    // decoration
    target
      .closest(".container")
      .querySelector(".save")
      .classList.remove("save_mini");
    target
      .closest(".container")
      .querySelector(".clear")
      .classList.remove("clear_active");
    // decoration
  }
  if (target.classList.contains("select2")) {
    let picked_item = target.closest(".item");
    picked_item_datas = {
      userName: picked_item.querySelector(".picked_user_name").innerHTML.trim(),
      statusToDo: target.value.trim(),
      todoinner: picked_item.querySelector(".send_todo").innerHTML.trim(),
      deadlineinner: picked_item
        .querySelector(".insert_deadline")
        .innerHTML.trim(),
    };
    console.log(picked_item_datas);
  }
  if (target.classList.contains("select2")) {
    dataInfo = JSON.parse(localStorage.getItem("toDoData") || "[]");
    target.addEventListener("change", () => {
      let picked_item = target.closest(".item");
      let changedItemDatas = {
        userName: picked_item
          .querySelector(".picked_user_name")
          .innerHTML.trim(),
        statusToDo: target.value,
        todoinner: picked_item.querySelector(".send_todo").innerHTML.trim(),
        deadlineinner: picked_item
          .querySelector(".insert_deadline")
          .innerHTML.trim(),
      };
      console.log(changedItemDatas);
      for (let i = 0; i < dataInfo.length; i++) {
        if (
          dataInfo[i].userName.trim() == changedItemDatas.userName.trim() &&
          dataInfo[i].todoinner.trim() == changedItemDatas.todoinner.trim() &&
          dataInfo[i].deadlineinner.trim() ==
            changedItemDatas.deadlineinner.trim()
        ) {
          dataInfo[i].statusToDo = changedItemDatas.statusToDo;
          localStorage.setItem("toDoData", JSON.stringify(dataInfo));
        }
      }
      localStorage.setItem("toDoData", JSON.stringify(dataInfo));
      senderAlpha();
    });
  }
  // For cleaner local storage
  if (target.classList.contains("clear_local_storage")) {
    if (localStorage.getItem("toDoData") !== null) {
      localStorage.clear("toDoData");
      dataInfo = [];
    }
    statusNewBoard.innerHTML = " <span>New</span>";
    statusProgBoard.innerHTML = " <span>In progress</span>";
    statusDoneBoard.innerHTML = "<span>Done</span>";
  }
  // For cleaner local storage
});
