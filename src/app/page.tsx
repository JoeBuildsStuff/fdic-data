import { redirect } from "next/navigation";

export default function Home() {
  redirect("/institutions/table");
  return null;
}
