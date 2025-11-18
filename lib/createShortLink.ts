"use server";

import getCollection from "@/db";

export default async function createShortLink(
    alias: string,
    url: string
): Promise<{ success: boolean; message: string }> {
    try {
        // Validate URL format
        try {
            new URL(url); // uses the JS url constructer to check the url syntax and confirms that its valid
        } catch {
            return { success: false, message: "Invalid URL format." }; // if it fails it alerts the user and thors and error before faulty url can be inserted into the db
        }

        const links = await getCollection("links");


        const existing = await links.findOne({ alias });  // Prevent duplicate alias, if its taken throws an error before instering it into the db
        if (existing) {
            return { success: false, message: "Alias already taken." };
        }

        await links.insertOne({ alias, url });
        return { success: true, message: "Short link created!" };
    } catch (err) {
        console.error("Error creating short link:", err);
        return { success: false, message: "Server error." };
    }
}
