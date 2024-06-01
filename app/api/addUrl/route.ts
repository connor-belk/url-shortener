import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { nanoid } from "nanoid";

const response = {
  id: nanoid(25),
  message: "URL added successfully",
  otherMessage: "lol",
  userId: nanoid(50),
  url: "https://google.com",
  shortUrl: `shrt.nr/${nanoid(8)}`,
  createdAt: new Date(),
  hits: 0,
};
const status = 200;

export async function GET(res: NextResponse, req: NextRequest) {
  return NextResponse.json(response, { status: status });
}
