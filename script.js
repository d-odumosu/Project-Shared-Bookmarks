import {getData, getUserIds, setData} from "./storage.js";

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
    displayBookmarks(bookmarks, userId)

})

function displayBookmarks(bookmarks, userId){
    bookmarks.forEach((bookmark => {
       const bookmarkClone = bookmarkTemplate.content.cloneNode(true)
        const bookmarkTitle = bookmarkClone.querySelector(".bookmark-title");
        const bookmarkDescription = bookmarkClone.querySelector(".bookmark-description");
        const bookmarkDate = bookmarkClone.querySelector(".bookmark-date");
        const copyButton = bookmarkClone.querySelector(".copy-url");
        const likeButton = bookmarkClone.querySelector(".like-button");
        let likeCount = bookmarkClone.querySelector('.like-count')

        bookmarkTitle.textContent = bookmark.title
        bookmarkTitle.href = bookmark.url
        bookmarkDescription.textContent = bookmark.description
        bookmarkDate.textContent = new Date(bookmark.createdAt).
            toLocaleString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
        copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(bookmark.url)
                .then(() => {
                    copyButton.textContent = 'Copied!'
                })
                .catch(() => {
                    copyButton.textContent = "Copy failed";
                })
        });

        likeButton.addEventListener("click", () => {
            bookmark.likes++
            likeCount.textContent = bookmark.likes
            setData(userId, bookmarks)

        });
        bookmarksContainer.append(bookmarkClone)
    }))
}
