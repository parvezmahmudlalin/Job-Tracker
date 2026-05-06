let intList = [];
let rejList = [];
let currentStatus = "all";

let totalCount = document.getElementById("total-count");
let intCount = document.getElementById("inter-count");
let rejCount = document.getElementById("reject-count");
let sideJobCount = document.getElementById("job-count");

const allBtn = document.getElementById("all-btn");
const intBtn = document.getElementById("int-btn");
const rejBtn = document.getElementById("rej-btn");

const allCards = document.getElementById("all-cards");
const mainCon = document.querySelector("main");
const filterSec = document.getElementById("filtered-section");
const noJobSec = document.getElementById("no-job");

function calculateCount() {
  totalCount.innerText = allCards.children.length;
  intCount.innerText = intList.length;
  rejCount.innerText = rejList.length;
}
sideJobCount.innerText = allCards.children.length;
calculateCount();

function toggleStyle(id) {
  currentStatus = id;

  allBtn.classList.add("bg-white", "text-[#64748B]");
  intBtn.classList.add("bg-white", "text-[#64748B]");
  rejBtn.classList.add("bg-white", "text-[#64748B]");

  allBtn.classList.remove("bg-blue-500", "text-white");
  intBtn.classList.remove("bg-blue-500", "text-white");
  rejBtn.classList.remove("bg-blue-500", "text-white");

  const selectedBtn = document.getElementById(id);
  selectedBtn.classList.remove("bg-white", "text-[#64748B]");
  selectedBtn.classList.add("bg-blue-500", "text-white");

  if (id == "int-btn") {
    allCards.classList.add("hidden");
    filterSec.classList.remove("hidden");
    putInt();
    sideJobCount.innerText = intList.length;
    noJobSec.classList.remove("hidden");
    if (intCount.innerText !== "0") {
      noJobSec.classList.add("hidden");
    }
  } else if (id == "all-btn") {
    allCards.classList.remove("hidden");
    filterSec.classList.add("hidden");
    sideJobCount.innerText = allCards.children.length;
    noJobSec.classList.add("hidden");
    if (totalCount.innerText === "0") {
      noJobSec.classList.remove("hidden");
    }
  } else if (id == "rej-btn") {   // FIXED HERE
    allCards.classList.add("hidden");
    filterSec.classList.remove("hidden");
    putRej();
    sideJobCount.innerText = rejList.length;
    noJobSec.classList.remove("hidden");
    if (rejCount.innerText !== "0") {
      noJobSec.classList.add("hidden");
    }
  }
}


// ✅ FIXED DELETE LOGIC
mainCon.addEventListener("click", function (event) {
  const deleteBtn = event.target.closest(".delete-btn");
  
  if (deleteBtn) {
    const parentNode = deleteBtn.parentNode.parentNode;
    parentNode.remove();
    calculateCount();
    sideJobCount.innerText = allCards.children.length;
  }
});


mainCon.addEventListener("click", function (event) {
  if (event.target.classList.contains("int-card-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector(".company-name").innerText;
    const companyPost = parentNode.querySelector(".company-post").innerText;
    const postDetails = parentNode.querySelector(".post-details").innerText;
    const workNote = parentNode.querySelector(".post-work").innerText;

    parentNode.querySelector(".state").innerText = "INTERVIEW";

    parentNode
      .querySelector(".state")
      .classList.remove("btn", "btn-error", "btn-soft", "py-1", "px-2");
    parentNode
      .querySelector(".state")
      .classList.add("btn", "btn-success", "btn-soft", "py-1", "px-2");

    const cardInfo = {
      companyName,
      companyPost,
      postDetails,
      status: "INTERVIEW",
      workNote,
    };

    const companyExist = intList.find(
      (item) => item.companyName == cardInfo.companyName
    );

    if (!companyExist) {
      intList.push(cardInfo);
    }

    rejList = rejList.filter(
      (item) => item.companyName != cardInfo.companyName
    );

    calculateCount();

    if (currentStatus == "rej-btn") {
      putRej();
    }
    if (currentStatus == "all") {
      sideJobCount.innerText = allCards.children.length;
    }
  } 
  
  
  else if (event.target.classList.contains("rej-card-btn")) {
    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector(".company-name").innerText;
    const companyPost = parentNode.querySelector(".company-post").innerText;
    const postDetails = parentNode.querySelector(".post-details").innerText;
    const workNote = parentNode.querySelector(".post-work").innerText;

    parentNode.querySelector(".state").innerText = "REJECTED";
    parentNode
      .querySelector(".state")
      .classList.remove("btn", "btn-success", "btn-soft", "py-1", "px-2");
    parentNode
      .querySelector(".state")
      .classList.add("btn", "btn-error", "btn-soft", "py-1", "px-2");

    const cardInfo = {
      companyName,
      companyPost,
      postDetails,
      status: "REJECTED",
      workNote,
    };

    const companyExist = rejList.find(
      (item) => item.companyName == cardInfo.companyName
    );

    if (!companyExist) {
      rejList.push(cardInfo);
    }

    intList = intList.filter(
      (item) => item.companyName != cardInfo.companyName
    );

    calculateCount();

    if (currentStatus == "int-btn") {
      putInt();
    }
    if (currentStatus == "all") {
      sideJobCount.innerText = allCards.children.length;
    }
  }
});


function putInt() {
  filterSec.innerHTML = "";

  for (let int of intList) {
    let div = document.createElement("div");
    div.className = "bg-white rounded-lg flex justify-between items-baseline";

    div.innerHTML = `
      <div class="space-y-5 p-6">
        <h2 class="company-name text-[#002C5C] font-bold">
          ${int.companyName}
        </h2>
        <p class="company-post text-[#64748B]">${int.companyPost}</p>
        <p class="post-details text-[#64748B]">
          ${int.postDetails}
        </p>
        <span class="state btn btn-success btn-soft py-1 px-2">
          ${int.status}
        </span>
        <p class="post-work text-[#323B49] mt-4">
          ${int.workNote}
        </p>
        <div class="flex gap-2">
          <button class="int-card-btn btn btn-outline btn-success">
            Interview
          </button>
          <button class="rej-card-btn btn btn-outline btn-secondary">
            Rejected
          </button>
        </div>
      </div>

      <div class="mr-5">
        <!-- ✅ delete-btn class added -->
        <button class="delete-btn text-[#64748B] btn btn-circle">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;

    filterSec.appendChild(div);
  }
}


function putRej() {
  filterSec.innerHTML = "";

  for (let rej of rejList) {
    let div = document.createElement("div");
    div.className = "bg-white rounded-lg flex justify-between items-baseline";

    div.innerHTML = `
      <div class="space-y-5 p-6">
        <h2 class="company-name text-[#002C5C] font-bold">
          ${rej.companyName}
        </h2>
        <p class="company-post text-[#64748B]">${rej.companyPost}</p>
        <p class="post-details text-[#64748B]">
          ${rej.postDetails}
        </p>
        <span class="state btn btn-soft btn-error py-1 px-2">
          ${rej.status}
        </span>
        <p class="post-work text-[#323B49] mt-4">
          ${rej.workNote}
        </p>
        <div class="flex gap-2">
          <button class="int-card-btn btn btn-outline btn-success">
            Interview
          </button>
          <button class="rej-card-btn btn btn-outline btn-secondary">
            Rejected
          </button>
        </div>
      </div>

      <div class="mr-5">
        <!-- ✅ delete-btn class added -->
        <button class="delete-btn text-[#64748B] btn btn-circle">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;

    filterSec.appendChild(div);
  }
}