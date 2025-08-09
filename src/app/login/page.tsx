import type { Metadata } from "next";
import Login from "./index";
import { redirectIfAuthenticated } from "@/lib/auth";

export const metadata: Metadata = {
    title: "TeamPulse - Login",
    description: "Login to your TeamPulse account",
};

export default async function LoginPage() {
    await redirectIfAuthenticated();
    return <Login />;
}