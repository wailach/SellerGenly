import OpenAI from "openai";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.productName) return NextResponse.json({ error: "Product name is required." }, { status: 400 });
    if (!process.env.OPENAI_API_KEY || !process.env.OPENAI_MODEL) {
      return NextResponse.json({ error: "AI is not configured yet. Add OPENAI_API_KEY and OPENAI_MODEL in your deployment environment." }, { status: 503 });
    }
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = `You are SellerGenly, an e-commerce profitability analyst. Analyze this product concisely:
Product: ${body.productName}
Platform: ${body.platform || "E-commerce"}
Unit cost: ${body.cost ?? "unknown"}
Selling price: ${body.price ?? "unknown"}
Return: verdict (1 line), estimated economics, 3 strengths, 3 risks, pricing advice, and 3 concrete next actions. Clearly label estimates as estimates.`;
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL,
      input: [{ role: "user", content: prompt }]
    });
    return NextResponse.json({ output: response.output_text });
  } catch (e) {
    return NextResponse.json({ error: "AI request failed. Check server logs and your API configuration." }, { status: 500 });
  }
}