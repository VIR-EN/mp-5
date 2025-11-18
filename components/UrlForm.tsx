"use client";
import React, { useState } from "react";
import createShortLink from "@/lib/createShortLink";

export default function UrlForm() {                 //local state varibalies to track user form submision
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [result, setResult] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setResult("Processing...");   // temporary message to improve UI while the link is created

        const res = await createShortLink(alias, url);  // calls the backend server to create the short link
        if (res.success) {
            setResult(`${window.location.origin}/r/${alias}`);   // built in javascript browser propetry, returns the base url of the page, loaded in the users browsers
            setAlias(""); // resets the alias back to empty in form, ready for new input.
            setUrl("");
        } else {
            setResult(res.message);  // if backend validation fails or alias duplication exists then it warns the user
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-3 bg-blue-100 p-6 rounded-xl shadow-md w-96"
        >
            <input
                type="text"
                placeholder="Full URL (e.g. https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                required
            />
            <input
                type="text"
                placeholder="Alias (e.g. my-link)"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                required
            />

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Create Short Link
            </button>

            {result && (
                <p className="text-center mt-3 text-sm break-all">
                    {result.startsWith("http") ? (
                        <a href={result} target="_blank" className="text-blue-600 underline">
                            {result}
                        </a>
                    ) : (
                        <span className="text-red-600">{result}</span>
                    )}
                </p>
            )}
        </form>
    );
}
