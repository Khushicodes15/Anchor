import { crisisTheme } from "@/styles/Theme";

export default function TherapistCard({
  name,
  specialization,
  location,
}: {
  name: string;
  specialization: string;
  location: string;
}) {
  return (
    <div
      className="p-6 rounded-2xl"
      style={{
        background: crisisTheme.colors.surface,
        border: `1px solid ${crisisTheme.colors.border}`,
      }}
    >
      <h3
        className="text-lg font-semibold"
        style={{ color: crisisTheme.colors.textPrimary }}
      >
        {name}
      </h3>
      <p style={{ color: crisisTheme.colors.textSecondary }}>
        {specialization}
      </p>
      <p className="text-sm mt-2">{location}</p>
    </div>
  );
}