import { llmsIndex } from "@/lib/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(llmsIndex("en"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
