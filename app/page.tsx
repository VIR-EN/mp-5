import UrlForm from "@/components/UrlForm";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold mb-6 text-blue-700">URL Shortener</h1>
            <UrlForm />
        </main>
    );
}
