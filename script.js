import { getUserIds, getData } from "./storage.js";

const userSelect = document.querySelector("#user-select");
const bookmarkList = document.querySelector("#bookmark-list");
const emptyMessage = document.querySelector("#empty-message");

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

    bookmarkList.textContent = "";
    emptyMessage.textContent = "";

    if (bookmarks === null) {
        emptyMessage.textContent = "This user has no bookmarks.";
    } else {
        bookmarks.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        bookmarks.forEach(function (bookmark) {
            const bookmarkItem = document.createElement("article");

            const title = document.createElement("a");

            title.textContent = bookmark.title;
            title.href = bookmark.url;

            bookmarkItem.appendChild(title);

            const description = document.createElement("p");

            description.textContent = bookmark.description;

            bookmarkItem.appendChild(description);

            const date = document.createElement("p");

            date.textContent = new Date(bookmark.createdAt).toLocaleString();

            bookmarkItem.appendChild(date);

            bookmarkList.appendChild(bookmarkItem);
        });
    }
});