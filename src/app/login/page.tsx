import type { Metadata } from "next";
import Login from "./index";

export const metadata: Metadata = {
    title: "TeamPulse - Login",
    description: "Login to your TeamPulse account",
};

export default function LoginPage() {
    return <Login />;
}