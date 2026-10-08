import { getData, getUserIds, setData } from "./storage.js";
import { sortBookmarks } from "./sortBookmarks.js";

const userSelect = document.querySelector("#user-select");
const bookmarkForm = document.getElementById("bookmark-form");
const urlInput = document.querySelector("#url");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#bookmark-description");
const bookmarkTemplate = document.querySelector("#bookmark-template");
const bookmarksContainer = document.querySelector("#bookmarks");
const emptyMessage = document.querySelector("#empty-message");
const bookmarksSection = document.querySelector(".bookmarks");
const addBookmarkSection = document.querySelector(".add-bookmark");

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

    if (userId === "") {
        switchView("non user");
    } else {
        switchView("user");
    }

    renderBookmarks(bookmarks, userId);
});

// saving a bookmark
bookmarkForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const url = urlInput.value;
    const title = titleInput.value;
    const description = descriptionInput.value;
    const userId = userSelect.value;

    const bookmark = {
        url,
        title,
        description,
        createdAt: new Date().toISOString(),
        likes: 0
    };

    const bookmarks = getData(userId) || [];

    bookmarks.push(bookmark);
    setData(userId, bookmarks);
    renderBookmarks(bookmarks, userId);

    bookmarkForm.reset();
});

/**
 * Creates a bookmark card from the bookmark template
 * and adds it to the bookmarks' container.
 *
 * @param {Object} bookmark The bookmark to display
 * @param {string} userId The user id the bookmark belongs to
 * @param {Array} bookmarks The user's complete list of bookmarks
 */
function createBookmarkCard(bookmark, userId, bookmarks) {
    const bookmarkClone = bookmarkTemplate.content.cloneNode(true);
    const bookmarkTitle = bookmarkClone.querySelector(".bookmark-title");
    const bookmarkDescription = bookmarkClone.querySelector(".bookmark-description");
    const bookmarkDate = bookmarkClone.querySelector(".bookmark-date");
    const copyButton = bookmarkClone.querySelector(".copy-url");
    const likeButton = bookmarkClone.querySelector(".like-button");
    const likeCount = bookmarkClone.querySelector(".like-count");

    bookmarkTitle.textContent = bookmark.title;
    bookmarkTitle.href = bookmark.url;

    bookmarkDescription.textContent = bookmark.description;

    bookmarkDate.textContent = new Date(bookmark.createdAt).toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });

    likeCount.textContent = bookmark.likes;

    copyButton.addEventListener("click", () => {
        navigator.clipboard.writeText(bookmark.url)
            .then(() => {
                copyButton.textContent = "Copied!";
            })
            .catch(() => {
                copyButton.textContent = "Copy failed";
            });
    });

    likeButton.addEventListener("click", () => {
        bookmark.likes++;
        likeCount.textContent = bookmark.likes;
        setData(userId, bookmarks);
    });

    bookmarksContainer.append(bookmarkClone);
}

/**
 * Renders all bookmarks for a user.
 *
 * @param {Array} bookmarks The user's bookmarks
 * @param {string} userId The user id the bookmarks belong to
 */
function renderBookmarks(bookmarks, userId) {
    clearBookmarks();
    clearMessage();

    if (bookmarks === null || bookmarks.length === 0) {
        showEmptyMessage();
        return;
    }

    const sortedBookmarks = sortBookmarks(bookmarks);

    sortedBookmarks.forEach((bookmark) => {
        createBookmarkCard(bookmark, userId, bookmarks);
    });

    // helper functions

    /**
     * Clears all bookmark cards from the bookmarks container.
     */
    function clearBookmarks() {
        bookmarksContainer.textContent = "";
    }

    /**
     * Clears the empty bookmarks message.
     */
    function clearMessage() {
        emptyMessage.textContent = "";
    }

    /**
     * Displays a message when a user has no bookmarks.
     */
    function showEmptyMessage() {
        emptyMessage.textContent = "This user has no bookmarks.";
    }
}

function switchView(view) {
    if (view === "non user") {
        bookmarksSection.hidden = true;
        addBookmarkSection.hidden = true;
    }

    if (view === "user") {
        bookmarksSection.hidden = false;
        addBookmarkSection.hidden = false;
    }
}

switchView("non user");