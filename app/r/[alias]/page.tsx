import { redirect } from "next/navigation";
import getCollection from "@/db";

export default async function RedirectPage({params,}: { params: Promise<{ alias: string }>; }) {   //    when a user visits /r/<alias>, this function runs server-side and looks up the alias in the database

    const { alias } = await params;           // Extract the alias parameter from the dynamic route

    const links = await getCollection("links");      // this collection stores all alias and URL mappings created via the form
    const found = await links.findOne({ alias });           // looks up the alias in the database

    if (!found) {
        redirect("/");  // sends user to home
    }

    redirect(found.url);    // If the alias exists, redirect the user to the stored destination URL
}
