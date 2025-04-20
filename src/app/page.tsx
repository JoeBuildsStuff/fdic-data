import { redirect } from "next/navigation";

export default function Home() {
  redirect("/institutions/dashboard");
  return null;
}
