"use client";
import { useState } from "react";
import createShortLink from "@/lib/createShortLink";

export default function UrlForm() {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [result, setResult] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setResult("Processing...");

        const res = await createShortLink(alias, url);
        if (res.success) {
            setResult(`${window.location.origin}/r/${alias}`);
            setAlias("");
            setUrl("");
        } else {
            setResult(res.message);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-3 bg-blue-100 p-6 rounded-xl shadow-md w-96"
        >
            <input
                type="text"
                placeholder="Alias (e.g. my-link)"
                value={alias}
                onChange={(e) => setAlias(e.target.value)}
                className="border border-gray-300 rounded p-2 w-full"
                required
            />
            <input
                type="text"
                placeholder="Full URL (e.g. https://example.com)"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
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
