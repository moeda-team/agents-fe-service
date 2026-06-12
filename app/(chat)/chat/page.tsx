import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/user";
import { Welcome } from "@/components/chat/welcome";
import { MessageInput } from "@/components/chat/message-input";

export default async function ChatPage() {
  const result = await getCurrentUser();
  if (!result.success) redirect("/login");

  const firstName = result.fullName.split(" ")[0];

  return (
    <div className="flex h-full flex-col">
      <Welcome userName={firstName} />
      <MessageInput />
    </div>
  );
}
