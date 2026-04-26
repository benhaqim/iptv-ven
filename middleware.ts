import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  // Run on every request so the layout can read x-pathname; cheap.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
