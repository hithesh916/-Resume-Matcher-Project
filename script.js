const stopWords = new Set(["a", "an", "and", "are", "as", "at", "be", "but", "by", "for", "if", "in", "into", "is", "it", "no", "not", "of", "on", "or", "such", "that", "the", "their", "then", "there", "these", "they", "this", "to", "was", "will", "with", "from", "your", "you", "we", "our", "all", "any", "have", "has", "had", "can", "could", "would", "should", "do", "does", "did", "more", "most", "other", "some", "what", "when", "where", "which", "who", "why", "how", "about", "above", "below", "between", "both", "down", "during", "each", "few", "further", "here", "just", "out", "over", "same", "than", "through", "too", "under", "until", "up", "very", "also", "only", "well", "like", "so", "because", "been", "being", "am", "its", "those", "while", "make", "made", "many", "much", "must", "may", "experience", "years", "work", "team", "skills", "required", "role", "job", "company", "including", "using", "strong", "ability", "knowledge", "working", "understanding", "support", "environment"]);

const jobTemplates = {
    "frontend": "Seeking a Frontend Developer with strong skills in React, JavaScript, HTML, CSS, Next.js, and TypeScript. You should understand responsive design principles, UI/UX best practices, API integrations, and Git version control.",
    "backend": "We are looking for a Backend Developer proficient in Node.js, Express, Python, Django, or Java. You must have strong knowledge of SQL, PostgreSQL, MongoDB databases, RESTful APIs, Docker containerization, and AWS services.",
    "fullstack": "Full Stack Developer needed. Requirements include expertise in JavaScript, TypeScript, React, Node.js, Express, MongoDB, SQL, Git, Docker, and building highly scalable REST APIs.",
    "mobile_dev": "Seeking a Mobile App Developer proficient in React Native, Flutter, Swift, or Kotlin. Experience with mobile UI design patterns, REST APIs, and publishing apps to the App Store and Google Play.",
    "ios_dev": "Looking for an iOS Developer with strong skills in Swift, Objective-C, Xcode, and iOS SDK. Experience with Core Data, Core Animation, and Apple's design principles is highly desired.",
    "android_dev": "Android Developer needed to build high-performance mobile applications using Kotlin and Java. Experience with Android Studio, Jetpack, Coroutines, MVVM architecture, and Room database is required.",
    "game_dev": "Game Developer required to build engaging games. Skills: Unity, Unreal Engine, C#, C++, 3D mathematics, physics engines, game physics, and knowledge of rendering pipelines.",
    "embedded_engineer": "Embedded Systems Engineer needed. Skills: C/C++, microcontrollers (ARM, STM32), RTOS, SPI, I2C, UART communication protocols, and hardware debugging.",
    "blockchain_dev": "Blockchain Developer needed for building decentralized applications (dApps). Experience with Solidity, Ethereum, smart contracts, Web3.js, cryptography, and blockchain consensus algorithms.",
    "data_science": "Data Scientist required. Core skills needed: Python, Pandas, NumPy, Scikit-Learn, TensorFlow, SQL, Machine Learning concepts, Data Visualization tools like Tableau, and advanced statistics.",
    "ml_engineer": "Machine Learning Engineer required. Skills needed: Python, PyTorch, TensorFlow, NLP, Computer Vision, Model Deployment (MLOps), and a strong background in mathematics and deep learning.",
    "ai_researcher": "Seeking an AI Researcher. Experience with cutting-edge AI models, LLMs, reinforcement learning, research paper publication, Python, PyTorch, and strong statistical modeling background.",
    "data_engineer": "Data Engineer needed to build data pipelines. Skills: Apache Spark, Hadoop, Kafka, Python, SQL, ETL processes, Airflow, and cloud data warehouses (Snowflake, Redshift).",
    "data_analyst": "Data Analyst required for generating business insights. Skills: SQL, Excel, Tableau, Power BI, Python (Pandas), Google Analytics, statistics, and highly analytical thinking.",
    "devops": "Looking for a highly skilled DevOps Engineer handling cloud infrastructure. Experience with AWS, Docker, Kubernetes, CI/CD pipelines, Jenkins, GitHub Actions, Linux systems administration, Terraform, and Python scripting.",
    "cloud_architect": "Cloud Architect needed to design and implement scalable cloud solutions. Expertise in AWS, Azure, GCP, microservices architecture, serverless computing, infrastructure as code, and security best practices.",
    "cybersecurity": "Cybersecurity Analyst required. Skills: network security, ethical hacking, incident response, SIEM tools, penetration testing, vulnerability assessment, cryptography, and risk management.",
    "dba": "Database Administrator needed for managing enterprise databases. Skills: Oracle, SQL Server, MySQL, database tuning, backup/recovery, high availability, clustering, and data security.",
    "sysadmin": "System Administrator required for maintaining IT infrastructure. Experience with Windows Server, Linux (Ubuntu/RedHat), Active Directory, virtual machines (VMware), bash/powershell scripting, and troubleshooting.",
    "network_engineer": "Network Engineer needed to manage routers, switches, and firewalls. Requirements: CCNA/CCNP, routing protocols (BGP, OSPF), VPNs, Wireshark, network monitoring, and Cisco equipment.",
    "it_support": "IT Support Specialist required to resolve hardware and software issues. Skills: Helpdesk ticketing systems, Windows/macOS troubleshooting, Office 365 administration, and excellent customer service.",
    "qa_automation": "QA Automation Engineer needed. Skills: Selenium, Cypress, Appium, Java/Python, CI/CD integration, API testing (Postman), and writing comprehensive automated test scripts.",
    "qa_manual": "Manual QA Tester needed for executing test cases and identifying defects. Requirements: test planning, Jira, bug tracking, regression testing, exploratory testing, and strong attention to detail.",
    "ui_ux_designer": "UI/UX Designer required to create intuitive user interfaces. Skills: Figma, Adobe XD, Sketch, wireframing, prototyping, user research, user journey mapping, and visual design.",
    "graphic_designer": "Graphic Designer needed to create visual concepts. Skills: Adobe Photoshop, Illustrator, InDesign, typography, branding, print design, and digital asset creation.",
    "tech_pm": "Technical Product Manager needed. Experience with Agile methodologies, Jira, writing technical PRDs, working closely with engineering teams, API integration understanding, and product strategy.",
    "pm": "Product Manager needed to lead product strategy. Requirements: market research, roadmap planning, product lifecycle management, cross-functional team leadership, stakeholder management, and UX principles.",
    "project_manager": "Project Manager required. Skills: Agile, Scrum, Kanban, Gantt charts, risk management, budget tracking, resource allocation, Jira/Asana, and strong communication abilities.",
    "scrum_master": "Scrum Master needed. Requirements: Agile framework, facilitating daily stand-ups, sprint planning, removing blockers, improving team velocity, and agile coaching.",
    "business_analyst": "Business Analyst needed to bridge the gap between business and IT. Skills: Requirements gathering, process mapping, UML, stakeholder communication, gap analysis, and data interpretation.",
    "marketing_manager": "Marketing Manager required. Experience with marketing strategy, campaign management, brand positioning, market research, budget allocation, and team leadership.",
    "digital_marketing": "Digital Marketing Specialist needed. Skills: Google Ads, Facebook Ads, PPC campaigns, email marketing, Google Analytics, conversion rate optimization (CRO), and A/B testing.",
    "content_writer": "Content Writer required to craft engaging content. Skills: Copywriting, SEO writing, blogging, editing, proofreading, storytelling, and content strategy for digital platforms.",
    "seo_specialist": "SEO Specialist needed. Requirements: keyword research, on-page optimization, link building, Technical SEO, Google Search Console, Ahrefs/SEMrush, and improving organic rankings.",
    "social_media_manager": "Social Media Manager needed. Skills: social media strategy, community management, content creation, Hootsuite/Buffer, trend analysis, Instagram/LinkedIn/Twitter algorithms, and analytics.",
    "sales_rep": "Sales Representative needed. Requirements: B2B/B2C sales, lead generation, cold calling, CRM usage (Salesforce), negotiation, closing deals, and excellent presentation skills.",
    "account_executive": "Account Executive required to drive revenue. Skills: pipeline management, sales presentations, contract negotiation, client relationship building, quota attainment, and territory management.",
    "customer_success": "Customer Success Manager needed to drive retention. Experience in onboarding, QBRs (Quarterly Business Reviews), churn reduction, user adoption, upselling, and client advocacy.",
    "customer_support": "Customer Support Representative needed. Skills: Zendesk, ticketing systems, active listening, conflict resolution, troubleshooting, empathy, and strong verbal/written communication.",
    "financial_analyst": "Financial Analyst required for forecasting and budgeting. Skills: Excel modeling, financial reporting, variance analysis, ROI analysis, accounting principles, and data-driven decision making.",
    "accountant": "Accountant needed. Requirements: bookkeeping, reconciliations, general ledger, tax compliance, payroll processing, QuickBooks, and knowledge of GAAP.",
    "operations_manager": "Operations Manager required to optimize processes. Skills: process improvement, logistics, vendor management, operational efficiency, budget control, and cross-functional leadership.",
    "supply_chain": "Supply Chain Manager needed. Experience in procurement, inventory management, logistics scheduling, supplier negotiation, supply chain optimization, and demand forecasting.",
    "retail_manager": "Retail Store Manager required. Experience with inventory control, visual merchandising, staff scheduling, customer service excellence, sales goal attainment, and loss prevention.",
    "hr_manager": "Human Resources Manager required. Experience in employee relations, performance management, compliance, compensation and benefits, HR policies, and organizational development.",
    "recruiter": "Recruiter / Talent Acquisition Specialist needed. Skills: full-cycle recruiting, interviewing, sourcing, LinkedIn Recruiter, applicant tracking systems (ATS), and candidate experience management.",
    "legal_counsel": "Legal Counsel required. Skills: contract drafting, intellectual property law, corporate compliance, risk assessment, legal research, negotiation, and corporate governance.",
    "executive_assistant": "Executive Assistant required to support C-level executives. Skills: calendar management, travel arrangements, meeting coordination, document preparation, gatekeeping, and high confidentiality.",
    "pr_manager": "Public Relations Manager needed. Requirements: media relations, press release writing, crisis management, brand reputation, event promotion, and corporate communication.",
    "event_coordinator": "Event Coordinator needed to plan and execute corporate events. Skills: vendor negotiation, venue selection, event budgeting, running day-of operations, and post-event analysis."
};

document.getElementById("roleSelect").addEventListener("change", (e) => {
    const role = e.target.value;
    const jdArea = document.getElementById("jobDescription");
    if (role && jobTemplates[role]) {
        jdArea.value = jobTemplates[role];
    } else {
        jdArea.value = "";
    }
});

document.getElementById("matchBtn").addEventListener("click", async () => {
    const resumeFile = document.getElementById("resumeFile").files[0];
    const jobDescription = document.getElementById("jobDescription").value;

    if (!resumeFile || !jobDescription.trim()) {
        alert("Please upload a resume and paste a job description.");
        return;
    }

    const matchBtn = document.getElementById("matchBtn");
    matchBtn.innerText = "Analyzing...";
    matchBtn.disabled = true;

    try {
        const resumeText = await extractText(resumeFile);

        // Improved Keyword Extraction
        const extractKeywords = (text) => {
            // Match words containing letters, numbers, and core symbols like #, +, .
            const rawWords = text.toLowerCase().match(/[a-z0-9#+.]+/g) || [];

            // Clean trailing/leading punctuation
            const cleanedWords = rawWords.map(w => w.replace(/^[.#+]+|[.#+]+$/g, ''));

            return [...new Set(cleanedWords.filter(word =>
                word.length > 2 &&
                !stopWords.has(word) &&
                !/^\d+$/.test(word) // exclude pure numbers
            ))];
        };

        const jobKeywords = extractKeywords(jobDescription);
        const resumeWords = resumeText.toLowerCase();

        const matched = [];
        const missing = [];

        // Escape special characters for regex
        const escapeRegExp = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        jobKeywords.forEach(word => {
            const escapedWord = escapeRegExp(word);
            // Match exactly, bounded by non-word characters or string ends
            const exactMatchPattern = new RegExp(`(?:^|[^a-z0-9#+.])(${escapedWord})(?:[^a-z0-9#+.]|$)`, 'i');

            if (exactMatchPattern.test(resumeWords)) {
                matched.push(word);
            } else {
                missing.push(word);
            }
        });

        let score = 0;
        if (jobKeywords.length > 0) {
            score = Math.round((matched.length / jobKeywords.length) * 100);
        }

        const scoreValueElem = document.getElementById("scoreValue");
        const scoreCircle = document.getElementById("scoreCircle");

        let scoreColor = "var(--danger)";
        let borderColor = "rgba(239, 68, 68, 0.4)";
        let scoreText = "Low Match";

        if (score >= 75) {
            scoreColor = "var(--success)";
            borderColor = "rgba(16, 185, 129, 0.4)";
            scoreText = "Excellent Match";
        } else if (score >= 50) {
            scoreColor = "var(--warning)";
            borderColor = "rgba(245, 158, 11, 0.4)";
            scoreText = "Fair Match";
        }

        scoreValueElem.innerText = `${score}%`;
        scoreValueElem.style.color = scoreColor;
        scoreCircle.style.borderColor = borderColor;
        document.getElementById("scoreTitle").innerText = scoreText;

        const statsElement = document.getElementById("matchStats");
        if (jobKeywords.length > 0) {
            statsElement.innerHTML = `You have matched <strong>${matched.length}</strong> out of <strong>${jobKeywords.length}</strong> required skills for this role.`;
        } else {
            statsElement.innerHTML = "No distinct skills found in the job description to match against.";
        }

        document.getElementById("matchedKeywords").innerHTML = matched.length > 0
            ? matched.map(w => `<span class="match">${w}</span>`).join(" ")
            : `<span>None</span>`;

        document.getElementById("missingKeywords").innerHTML = missing.length > 0
            ? missing.map(w => `<span class="missing">${w}</span>`).join(" ")
            : `<span>None</span>`;

        document.getElementById("results").style.display = "block";
        document.getElementById("results").scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (error) {
        console.error("Error analyzing document:", error);
        alert("An error occurred while reading the file. Please try again with a valid file.");
    } finally {
        matchBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
            Analyze Match`;
        matchBtn.disabled = false;
    }
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

    // Create arrays of keywords from DOM elements
    const matchedNodes = document.getElementById("matchedKeywords").querySelectorAll('span.match');
    const missingNodes = document.getElementById("missingKeywords").querySelectorAll('span.missing');

    const matched = Array.from(matchedNodes).map(n => n.innerText).join(', ') || 'None';
    const missing = Array.from(missingNodes).map(n => n.innerText).join(', ') || 'None';

    const docDefinition = {
        content: [
            { text: "Resume Match Report", style: "header", margin: [0, 0, 0, 10] },
            { text: score, style: "score", margin: [0, 10, 0, 20] },
            { text: "✅ Matched Keywords:", style: "subheader", margin: [0, 10, 0, 5] },
            { text: matched, margin: [0, 0, 0, 15], color: '#2ecc71' },
            { text: "❌ Missing Keywords:", style: "subheader", margin: [0, 10, 0, 5] },
            { text: missing, margin: [0, 0, 0, 15], color: '#e74c3c' }
        ],
        styles: {
            header: { fontSize: 22, bold: true, alignment: 'center', color: '#8a2be2' },
            score: { fontSize: 18, bold: true, alignment: 'center' },
            subheader: { fontSize: 14, bold: true }
        }
    };
    pdfMake.createPdf(docDefinition).download("Resume_Match_Report.pdf");
});
