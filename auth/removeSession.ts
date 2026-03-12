"use server";
import { cookies } from "next/headers";

const removeSession = async (): Promise<boolean> => {
  const cookieStore = await cookies();
  const sessionStatus = cookieStore.get("accessToken");

  if (sessionStatus) {
    cookieStore.set("accessToken", "", {
      path: "/",
      expires: new Date(0),
    });
    return true;
  } else {
    return false;
  }
};

export default removeSession;
