import { redirect } from "next/navigation";
import { logout } from "../login/actions";

import { createClient } from "@/utils/supabase/server";

export const runtime = "edge";

export default async function PrivatePage() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }

  return (
    <>
      <p>Hello {data.user.email}</p>
      <form>
        <button formAction={logout}>Log out</button>
      </form>
    </>
  );
}
