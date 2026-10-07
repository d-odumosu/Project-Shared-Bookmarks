



    if (bookmarks === null) {
        emptyMessage.textContent = "This user has no bookmarks.";
    } else {
        bookmarks.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

