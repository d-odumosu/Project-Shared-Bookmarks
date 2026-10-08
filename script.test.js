import { describe, it, expect } from "vitest";
import { sortBookmarks } from "./sortBookmarks.js";

describe("bookmark sorting", () => {

    it("sorts bookmarks from newest to oldest", () => {
        const bookmarks = [
            {
                title: "Old bookmark",
                createdAt: "2026-10-01T10:00:00Z"
            },
            {
                title: "New bookmark",
                createdAt: "2026-10-05T10:00:00Z"
            },
            {
                title: "Middle bookmark",
                createdAt: "2026-10-03T10:00:00Z"
            }
        ];

        const sortedBookmarks = sortBookmarks(bookmarks);

        expect(sortedBookmarks[0].title).toBe("New bookmark");
        expect(sortedBookmarks[1].title).toBe("Middle bookmark");
        expect(sortedBookmarks[2].title).toBe("Old bookmark");
    });

    it("keeps a single bookmark unchanged", () => {
        const bookmarks = [
            {
                title: "Only bookmark",
                createdAt: "2026-10-05T10:00:00Z"
            }
        ];

        const sortedBookmarks = sortBookmarks(bookmarks);

        expect(sortedBookmarks).toHaveLength(1);
        expect(sortedBookmarks[0].title).toBe("Only bookmark");
    });

    it("puts the newest bookmark first when dates are different", () => {
        const bookmarks = [
            {
                title: "Yesterday",
                createdAt: "2026-10-04T10:00:00Z"
            },
            {
                title: "Today",
                createdAt: "2026-10-05T10:00:00Z"
            }
        ];

        const sortedBookmarks = sortBookmarks(bookmarks);

        expect(sortedBookmarks[0].title).toBe("Today");
    });

});