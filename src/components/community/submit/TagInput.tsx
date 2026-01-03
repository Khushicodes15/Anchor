"use client";

const SUGGESTED = [
  "hope",
  "recovery",
  "resilience",
  "grief",
  "healing",
];

export default function TagInput({
  tags,
  onChange,
}: {
  tags: string[];
  onChange: (tags: string[]) => void;
}) {
  function toggle(tag: string) {
    onChange(
      tags.includes(tag)
        ? tags.filter((t) => t !== tag)
        : [...tags, tag].slice(0, 3)
    );
  }

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {SUGGESTED.map((tag) => (
        <button
          key={tag}
          onClick={() => toggle(tag)}
          className={`px-3 py-1 rounded-full text-sm border ${
            tags.includes(tag)
              ? "bg-green-100 border-green-300"
              : "bg-transparent"
          }`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
