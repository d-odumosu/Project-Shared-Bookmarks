import { getUserIds, getData, setData } from "./storage.js";

const userSelect = document.querySelector("#user-select");
const bookmarkForm = document.getElementById('bookmark-form')
const urlInput = document.querySelector("#url");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const bookmarkTemplate = document.querySelector("#bookmark-template");
const bookmarksContainer = document.querySelector("#bookmarks");

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

// saving a bookmark
bookmarkForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const url = urlInput.value
    const title = titleInput.value
    const description = descriptionInput.value
    const userId = userSelect.value;

    const bookmark = {
        url,
        title,
        description,
        createdAt: new Date().toISOString(),
        likes: 0
    }
    const bookmarks = getData(userId) || []
    bookmarks.push(bookmark)
    setData(userId,bookmarks)

})

function displayBookmarks(bookmarks){
    bookmarks.forEach((bookmark => {
       const bookmarkClone = bookmarkTemplate.content.cloneNode(true)
        bookmarkClone.querySelector('.bookmark-title').textContent = bookmark.title
        bookmarkClone.querySelector('.bookmark-title').href = bookmark.url
        bookmarkClone.querySelector('.bookmark-description').textContent = bookmark.description
        bookmarkClone.querySelector('.bookmark-date').textContent = new Date(bookmark.createdAt).
            toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
        bookmarkClone.querySelector('.copy-url').addEventListener("click", () => {
            //  function here
        });
        bookmarkClone.querySelector('.like-button').addEventListener("click", () => {
            //  function here
        });
        bookmarksContainer.append(bookmarkClone)
    }))
}