type Props = {
  role: "user" | "ai";
  content: string;
};

export default function JournalChatMessage({ role, content }: Props) {
  const isUser = role === "user";

  return (
    <div
      className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
        isUser
          ? "ml-auto bg-emerald-600 text-white"
          : "mr-auto bg-emerald-100 text-emerald-900"
      }`}
    >
      {content}
    </div>
  );
}