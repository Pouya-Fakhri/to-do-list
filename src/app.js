class Todo {
  constructor(toDoForm, toDos, toDoContainer) {
    (this.toDoForm = toDoForm),
      (this.toDos = toDos),
      (this.toDoContainer = toDoContainer);
  }
  getDate() {
    toDoForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const newToDo = {
        title: e.target.toDoInput.value,
        finished: false,
        id: this.generateUsrId(),
      };
      this.toDos.push(newToDo);
      localStorage.setItem("toDosStorage", JSON.stringify(this.toDos));

      this.renderInUi(this.toDos, this.toDoContainer);
      e.target.toDoInput.value = "";
    });
  }

  clicked() {
    toDoContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("delet")) {
        const todoId = e.target.parentElement.parentElement.id;
        this.toDos = this.toDos.filter((item) => item.id !== todoId);
        localStorage.setItem("toDosStorage", JSON.stringify(this.toDos));
        this.renderInUi(this.toDos, this.toDoContainer);
      } else if (e.target.classList.contains("acpert")) {
        const todoId = e.target.parentElement.parentElement.id;
        const todoIndex = this.toDos.findIndex((item) => item.id === todoId);
        if (todoIndex !== -1) {
          this.toDos[todoIndex].finished = !this.toDos[todoIndex].finished;
          localStorage.setItem("toDosStorage", JSON.stringify(this.toDos));
          const todoElement = e.target.parentElement.parentElement;
          todoElement.classList.toggle("don", this.toDos[todoIndex].finished);
        }
      }
    });
  }
  renderInUi(contentArry, container) {
    container.innerHTML = "";
    contentArry.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add(
        "w-[35vw]",
        "h-[60px]",
        "toDoShadow",
        "rounded-2xl",
        "flex",
        "items-center",
        "gap-7",
        "px-6"
      );
      div.innerHTML = `<div class="tolsContainer flex gap-2 ">
     <div class="delet w-4 h-4 border-solid border-[#CD4439] border-[2.5px] rounded-full hover:bg-[#CD4439]/50"></div>
     <div class="acpert w-4 h-4 border-solid border-[#72B896] border-[2.5px] rounded-full hover:bg-[#72B896]/50"></div>
     </div>
      <p class="text-[18px] text-[#94ADCF]">${item.title}</p>`;
      div.setAttribute("id", `${item.id}`);
      container.appendChild(div);
    });
  }

  generateUsrId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}

const app = new Todo(
  document.querySelector("#toDoForm"),
  JSON.parse(localStorage.getItem("toDosStorage")) || [],
  (toDoContainer = document.querySelector(".toDoContainer"))
);
app.getDate();
app.renderInUi(app.toDos, app.toDoContainer);
console.log(app);
app.clicked()

// const toDoForm = document.querySelector("#toDoForm");
// let toDos = JSON.parse(localStorage.getItem("toDosStorage")) || [];
// let toDoContainer = document.querySelector(".toDoContainer");

// toDoForm.addEventListener("submit", (e) => {
//   const newToDo = {
//     title: e.target.toDoInput.value,
//     finished: false,
//     id: generateUsrId(),
//   };
//   toDos.push(newToDo);
//   localStorage.setItem("toDosStorage", JSON.stringify(toDos));
//   e.preventDefault();
//   renderInUi(toDos, toDoContainer);
//   e.target.toDoInput.value = "";
// });

// renderInUi(toDos, toDoContainer);

// toDoContainer.addEventListener("click", (e) => {
//   if (e.target.classList.contains("delet")) {
//     const todoId = e.target.parentElement.parentElement.id;
//     toDos = toDos.filter((item) => item.id !== todoId);
//     localStorage.setItem("toDosStorage", JSON.stringify(toDos));
//     renderInUi(toDos, toDoContainer);
//   } else if (e.target.classList.contains("acpert")) {
//     const todoId = e.target.parentElement.parentElement.id;
//     const todoIndex = toDos.findIndex((item) => item.id === todoId);
//     if (todoIndex !== -1) {
//       toDos[todoIndex].finished = !toDos[todoIndex].finished;
//       localStorage.setItem("toDosStorage", JSON.stringify(toDos));
//       const todoElement = e.target.parentElement.parentElement;
//       todoElement.classList.toggle("don", toDos[todoIndex].finished);
//     }
//   }
// });

// function renderInUi(contentArry, container) {
//   container.innerHTML = "";
//   contentArry.forEach((item) => {
//     const div = document.createElement("div");
//     div.classList.add(
//       "w-[35vw]",
//       "h-[60px]",
//       "toDoShadow",
//       "rounded-2xl",
//       "flex",
//       "items-center",
//       "gap-7",
//       "px-6"
//     );
//     div.innerHTML = `<div class="tolsContainer flex gap-2 ">
//    <div class="delet w-4 h-4 border-solid border-[#CD4439] border-[2.5px] rounded-full hover:bg-[#CD4439]/50"></div>
//    <div class="acpert w-4 h-4 border-solid border-[#72B896] border-[2.5px] rounded-full hover:bg-[#72B896]/50"></div>
//    </div>
//     <p class="text-[18px] text-[#94ADCF]">${item.title}</p>`;
//     div.setAttribute("id", `${item.id}`);
//     container.appendChild(div);
//   });
// }

// function generateUsrId() {
//   return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
//     const r = (Math.random() * 16) | 0,
//       v = c == "x" ? r : (r & 0x3) | 0x8;
//     return v.toString(16);
//   });
// }
