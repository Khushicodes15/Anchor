import { MessageCircle } from "lucide-react";
import { crisisTheme } from "@/styles/Theme";


export default function MoodPrompt() {
  return (
    <div
      className="p-5 rounded-2xl flex items-center gap-3"
      style={{
        background: crisisTheme.colors.secondarySoft,
        border: `1px solid ${crisisTheme.colors.border}`,
      }}
    >
      <MessageCircle size={18} />
      <p style={{ color: crisisTheme.colors.textSecondary }}>
        Take a deep breath. Notice one thing that made you feel okay today
      </p>
    </div>
  );
}
