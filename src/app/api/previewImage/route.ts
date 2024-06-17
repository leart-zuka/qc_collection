import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        const body = await req.json();
        console.debug(body)
        const image = await getImageBase64(body.url);
        return Response.json({ image });
    } catch (error) {
        return NextResponse.json({ "test": "hi" }, { status: 500 })
    }
}

let getImageBase64 = async (url: string) => {
    try {
        let browser = await puppeteer.launch();
        let page = await browser.newPage();
        await page.goto(url);
        let image = await page.screenshot({ encoding: "base64" });
        await browser.close();
        return image;
    } catch (error) {
        throw new Error(`${error}`);
    }
};
