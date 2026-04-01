import { NextRequest, NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export async function proxy(req: NextRequest) {
  const ratelimit = new Ratelimit({
    redis: new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    }),
    limiter: Ratelimit.slidingWindow(10, "1 m"),
  });

  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return new NextResponse("Too many requests", { status: 429 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/addUrl",
};
