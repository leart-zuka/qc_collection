import puppeteer from "puppeteer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        console.debug(body)
        const image = await getImageBase64(body.url);
        return NextResponse.json({ "test": "hi" }, { status: 204 })
        return NextResponse.json({ image }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ "error": "Couldn't fetch screenshot off of website 2" }, { status: 500 })
    }
}

let getImageBase64 = async (url: string) => {
    try {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto(url);
        let image = await page.screenshot({ encoding: "base64" });
        await browser.close();
        return NextResponse.json({ "test": "hi2" }, { status: 204 })
        return image;
    } catch (error) {
        return NextResponse.json({ "error": "Couldn't fetch screenshot of website 1" }, { status: 500 })
    }
};
