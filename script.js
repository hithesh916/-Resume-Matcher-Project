document.getElementById("matchBtn").addEventListener("click", async () => {
    const resumeFile = document.getElementById("resumeFile").files[0];
    const jobDescription = document.getElementById("jobDescription").value.toLowerCase();

    if (!resumeFile || !jobDescription) {
        alert("Please upload a resume and paste a job description.");
        return;
    }

    const resumeText = await extractText(resumeFile);

    // Auto keyword extraction
    const jobKeywords = [...new Set(jobDescription.match(/\b[a-z]{3,}\b/g))];
    const resumeWords = resumeText.toLowerCase();

    const matched = [];
    const missing = [];

    jobKeywords.forEach(word => {
        if (resumeWords.includes(word)) {
            matched.push(word);
        } else {
            missing.push(word);
        }
    });

    const score = Math.round((matched.length / jobKeywords.length) * 100);

    document.getElementById("score").innerText = `Match Score: ${score}%`;

    document.getElementById("matchedKeywords").innerHTML =
        matched.map(w => `<span class="match">${w}</span>`).join(" ");
    document.getElementById("missingKeywords").innerHTML =
        missing.map(w => `<span class="missing">${w}</span>`).join(" ");

    document.getElementById("results").style.display = "block";
});

async function extractText(file) {
    const fileExt = file.name.split(".").pop().toLowerCase();

    if (fileExt === "txt") {
        return await file.text();
    }
    if (fileExt === "docx") {
        const arrayBuffer = await file.arrayBuffer();
        const result = await mammoth.extractRawText({ arrayBuffer });
        return result.value;
    }
    if (fileExt === "pdf") {
        const pdfData = new Uint8Array(await file.arrayBuffer());
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        let text = "";
        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            text += content.items.map(item => item.str).join(" ") + " ";
        }
        return text;
    }
    return "";
}

document.getElementById("downloadBtn").addEventListener("click", () => {
    const score = document.getElementById("score").innerText;
    const matched = document.getElementById("matchedKeywords").innerText;
    const missing = document.getElementById("missingKeywords").innerText;

    const docDefinition = {
        content: [
            { text: "Resume Match Report", style: "header" },
            score,
            "\nMatched Keywords:",
            matched,
            "\nMissing Keywords:",
            missing
        ]
    };
    pdfMake.createPdf(docDefinition).download("match_report.pdf");
});
