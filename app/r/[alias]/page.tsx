import { redirect } from "next/navigation";
import getCollection from "@/db";

export default async function RedirectPage({
                                               params,
                                           }: {
    params: Promise<{ alias: string }>;
}) {
    const { alias } = await params;

    const links = await getCollection("links");
    const found = await links.findOne({ alias });

    if (!found) {
        redirect("/");
    }

    redirect(found.url);
}
