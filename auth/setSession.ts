"use server";
import { cookies } from "next/headers";

export const setSession = async (token: string) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", token, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
  });
};
