import { getUserIds, getData } from "./storage.js";

const userSelect = document.querySelector("#user-select");

const userIds = getUserIds();

userIds.forEach(function (userId) {
    const option = document.createElement("option");

    option.value = userId;
    option.textContent = `User ${userId}`;

    userSelect.appendChild(option);
});

userSelect.addEventListener("change", function () {
    const userId = userSelect.value;
    const bookmarks = getData(userId);

    console.log(bookmarks);
});