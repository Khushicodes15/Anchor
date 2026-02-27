export const generateTherapyReport = (entries: any[]) => {
  const content = entries
    .map(
      (e) => `
Date: ${e.createdAt}
Mood: ${e.mood}
-------------------------------------
${e.text}
-------------------------------------

`
    )
    .join("\n");

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "therapy-report.txt";
  a.click();
};