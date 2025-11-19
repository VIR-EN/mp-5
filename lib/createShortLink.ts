"use server";

import getCollection from "@/db";

export default async function createShortLink(
    alias: string,
    url: string
): Promise<{ success: boolean; message: string }> {
    try {

        // Check for invalid alias characters
        if (encodeURIComponent(alias) !== alias) {      // built in constructor that changes unsafe spaces or symbols in link to browser safe characters
            return {
                success: false,                 // this ensures we dont use an invalid alias, running into issues later
                message: "Invalid alias"
            };
        }

        // Validate URL format
        try {
            new URL(url); // uses the JS url constructer to check the url syntax and confirms that its valid
        } catch {
            return { success: false, message: "Invalid URL format." }; // if it fails it alerts the user and thors and error before faulty url can be inserted into the db
        }

        try {
            const res = await fetch(url, { method: "HEAD" });  // feches the metadata from the head, lightweight staus code check, if the response code is valid
            if (res.status < 200 || res.status >= 500) {

                return {
                    success: false,                         // if the response code is outside the validity paramaters, the user is alerted
                    message: "Invalid URL: Re-check your URL "
                };
            }
        } catch {

            return {
                success: false,
                message: "Invalid URL: Could not verify target site.",
            };
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
