export default function RichText({ text }) {
  if (typeof text !== "string" || !text.includes("**")) return text;
  const parts = text.split("**");
  const isLabeled = text.startsWith("**");
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return (
        <strong
          key={i}
          className={`font-semibold text-heading ${
            isLabeled && i === 1 ? "block" : ""
          }`}
        >
          {part}
        </strong>
      );
    }
    return part === "" ? null : part;
  });
}