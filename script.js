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
    noJobSec.classList.toggle("hidden", intList.length !== 0);
  } 
  else if (id == "all-btn") {
    allCards.classList.remove("hidden");
    filterSec.classList.add("hidden");
    sideJobCount.innerText = allCards.children.length;
    noJobSec.classList.toggle("hidden", allCards.children.length !== 0);
  } 
  else if (id == "rej-btn") {
    allCards.classList.add("hidden");
    filterSec.classList.remove("hidden");
    putRej();
    sideJobCount.innerText = rejList.length;
    noJobSec.classList.toggle("hidden", rejList.length !== 0);
  }
}



mainCon.addEventListener("click", function (event) {
  const deleteBtn = event.target.closest(".delete-btn");

  if (deleteBtn) {
    const parentNode = deleteBtn.parentNode.parentNode;
    const companyName =
      parentNode.querySelector(".company-name").innerText;

    // Remove from interview list
    intList = intList.filter(
      (item) => item.companyName !== companyName
    );

    // Remove from rejected list
    rejList = rejList.filter(
      (item) => item.companyName !== companyName
    );

    parentNode.remove();

    calculateCount();

    if (currentStatus == "int-btn") {
      putInt();
      sideJobCount.innerText = intList.length;
      noJobSec.classList.toggle("hidden", intList.length !== 0);
    } 
    else if (currentStatus == "rej-btn") {
      putRej();
      sideJobCount.innerText = rejList.length;
      noJobSec.classList.toggle("hidden", rejList.length !== 0);
    } 
    else {
      sideJobCount.innerText = allCards.children.length;
      noJobSec.classList.toggle("hidden", allCards.children.length !== 0);
    }
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
    parentNode.querySelector(".state").className =
      "state btn btn-success btn-soft py-1 px-2";

    const cardInfo = {
      companyName,
      companyPost,
      postDetails,
      status: "INTERVIEW",
      workNote,
    };

    if (!intList.find((item) => item.companyName === companyName)) {
      intList.push(cardInfo);
    }

    rejList = rejList.filter(
      (item) => item.companyName !== companyName
    );

    calculateCount();

    if (currentStatus == "int-btn") {
      putInt();
      sideJobCount.innerText = intList.length;
    }
  }

  else if (event.target.classList.contains("rej-card-btn")) {

    const parentNode = event.target.parentNode.parentNode;
    const companyName = parentNode.querySelector(".company-name").innerText;
    const companyPost = parentNode.querySelector(".company-post").innerText;
    const postDetails = parentNode.querySelector(".post-details").innerText;
    const workNote = parentNode.querySelector(".post-work").innerText;

    parentNode.querySelector(".state").innerText = "REJECTED";
    parentNode.querySelector(".state").className =
      "state btn btn-error btn-soft py-1 px-2";

    const cardInfo = {
      companyName,
      companyPost,
      postDetails,
      status: "REJECTED",
      workNote,
    };

    if (!rejList.find((item) => item.companyName === companyName)) {
      rejList.push(cardInfo);
    }

    intList = intList.filter(
      (item) => item.companyName !== companyName
    );

    calculateCount();

    if (currentStatus == "rej-btn") {
      putRej();
      sideJobCount.innerText = rejList.length;
    }
  }
});


function putInt() {
  filterSec.innerHTML = "";

  for (let int of intList) {
    let div = document.createElement("div");
    div.className =
      "bg-white rounded-lg flex justify-between items-baseline";

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
    div.className =
      "bg-white rounded-lg flex justify-between items-baseline";

    div.innerHTML = `
      <div class="space-y-5 p-6">
        <h2 class="company-name text-[#002C5C] font-bold">
          ${rej.companyName}
        </h2>
        <p class="company-post text-[#64748B]">${rej.companyPost}</p>
        <p class="post-details text-[#64748B]">
          ${rej.postDetails}
        </p>
        <span class="state btn btn-error btn-soft py-1 px-2">
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
        <button class="delete-btn text-[#64748B] btn btn-circle">
          <i class="fa-regular fa-trash-can"></i>
        </button>
      </div>
    `;

    filterSec.appendChild(div);
  }
}