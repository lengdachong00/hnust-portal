import { getAllArticles } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET() {
    const articles = getAllArticles();
    return NextResponse.json(articles);
}
