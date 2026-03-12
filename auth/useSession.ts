"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";

interface Session {
  sessionStatus: string;
  userId: string;
  role: string;
}

const useSession = async (): Promise<Session> => {
  const cookieStore = await cookies();
  const sessionStatus = cookieStore.get("accessToken");

  if (sessionStatus) {
    try {
      const decoded = jwt.decode(sessionStatus.value) as JwtPayload | null;

      if (decoded && typeof decoded.userId === "string") {
        return {
          sessionStatus: sessionStatus.value,
          userId: decoded.userId,
          role: decoded.role || "",
        };
      } else {
        return { sessionStatus: "", userId: "", role: "" };
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
      return { sessionStatus: "", userId: "", role: "" };
    }
  } else {
    return { sessionStatus: "", userId: "", role: "" };
  }
};

export default useSession;
