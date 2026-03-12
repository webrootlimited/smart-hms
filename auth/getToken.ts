"use server";
import { cookies } from "next/headers";

const getToken = async () => {
  const cookieStore = await cookies();
  const sessionStatus = cookieStore.get("accessToken");
  if (sessionStatus) {
    return sessionStatus.value;
  } else {
    return "";
  }
};

export default getToken;
