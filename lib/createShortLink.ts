"use server";

import getCollection from "@/db";
import { LinkProps } from "@/types/LinkProps";

export default async function createShortLink(
    alias: string,
    url: string
): Promise<{ success: boolean; message: string }> {
    try {
        // Validate URL format
        try {
            new URL(url);
        } catch {
            return { success: false, message: "Invalid URL format." };
        }

        const links = await getCollection("links");

        // Prevent duplicate alias
        const existing = await links.findOne({ alias });
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
