export function sortBookmarks(bookmarks) {
    const bookmarksCopy = [...bookmarks];

    return bookmarksCopy.sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
}