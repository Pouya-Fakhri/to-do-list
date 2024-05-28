const toDoForm = document.querySelector("#toDoForm");
let toDos = JSON.parse(localStorage.getItem("toDosStorage")) || [];
let toDoContainer = document.querySelector(".toDoContainer");
toDoForm.addEventListener("submit", (e) => {
  const newToDo = {
    title: e.target.toDoInput.value,
    finished: false,
    id: generateUsrId(),
  };
  toDos.push(newToDo);
  localStorage.setItem("toDosStorage", JSON.stringify(toDos));
  e.preventDefault();
  renderInUi(JSON.parse(localStorage.getItem("toDosStorage")), toDoContainer);
  e.target.toDoInput.value = "";
});
renderInUi(JSON.parse(localStorage.getItem("toDosStorage")), toDoContainer);
toDoContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("delet")) {
    localStorage.setItem(
      "toDosStorage",
      JSON.stringify(
        toDos.filter((item) => {
          return e.target.parentElement.parentElement.id != item.id;
        })
      )
    );
    toDos = JSON.parse(localStorage.getItem("toDosStorage")) || [];
    renderInUi(JSON.parse(localStorage.getItem("toDosStorage")), toDoContainer);
  }
});

function renderInUi(contentArry, container) {
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
function generateUsrId() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
