export const certifications = [
    {
      title: "AWS Certified Data Engineer - Associate",
      earned_on: "10/10/2025",
      link: "https://www.credly.com/badges/6d39c7dd-fd8b-4cf5-8a4f-670b95d7547b/public_url",
      authority: "AWS",
      level: "Associate"
    },
    {
      title: "Azure Administrator Associate",
      earned_on: "19/09/2025",
      link: "https://learn.microsoft.com/api/credentials/share/en-us/llabeye/645001C96C304EBF?sharingId=607BD74E791FA26E",
      authority: "Microsoft",
      level: "Associate"
    },
    {
      title: "AWS Certified AI Practitioner",
      earned_on: "10/07/2025",
      link: "https://www.credly.com/badges/95335a26-2d27-4718-9cde-a0f60a14c133/public_url",
      authority: "AWS",
      level: "Practitioner"
    },
    {
      title: "AWS Certified Developer – Associate",
      earned_on: "16/05/2025",
      link: "https://www.credly.com/badges/46c816db-1a9d-4c76-a180-30e4d51af1f6/public_url",
      authority: "AWS",
      level: "Associate"
    },
    {
      title: "AWS Certified Solutions Architect – Associate",
      earned_on: "06/05/2025",
      link: "https://www.credly.com/badges/37b9934f-c455-4c77-b975-df33c61d4c5d/public_url",
      authority: "AWS",
      level: "Associate"
    },
    {
      title: "AWS Certified Cloud Practitioner",
      earned_on: "02/04/2025",
      link: "https://www.credly.com/badges/4420a690-8cba-48ad-bd4a-f20b12d44491/public_url",
      authority: "AWS",
      level: "Foundational"
    },
    {
      title: "Terraform Associate (003)",
      earned_on: "21/03/2025",
      link: "https://www.credly.com/badges/06d18ae9-4e80-47d5-bf49-d8582fdacc39/public_url",
      authority: "HashiCorp",
      level: "Associate"
    },
    {
      title: "SC-900: Security & Identity",
      earned_on: "05/03/2025",
      link: "https://learn.microsoft.com/api/credentials/share/en-us/llabeye/D3D2E5191ECE725A?sharingId=607BD74E791FA26E",
      authority: "Microsoft",
      level: "Fundamental"
    },
    {
      title: "AI-900: Azure AI Fundamentals",
      earned_on: "28/02/2025",
      link: "https://learn.microsoft.com/api/credentials/share/en-us/llabeye/4D546F07B9FC2D16?sharingId=607BD74E791FA26E",
      authority: "Microsoft",
      level: "Fundamental"
    },
    {
      title: "AZ-900: Azure Fundamentals",
      earned_on: "23/02/2025",
      link: "https://learn.microsoft.com/api/credentials/share/en-us/llabeye/485804E946B9FB1D?sharingId=607BD74E791FA26E",
      authority: "Microsoft",
      level: "Fundamental"
    }
  ];
  
  export const projects = [
    { title: "reomir", description: "AI-powered developer portal for enterprises.", link: "https://github.com/nag763/REOMIR", tech: ["GenAI", "Go"] },
    { title: "tchatche.rs", description: "Full-stack chat based on Axum and Rust.", link: "https://github.com/nag763/tchatchers", tech: ["Rust", "Redis"] },
    { title: "doteur", description: "Database schema renderer in Rust.", link: "https://github.com/nag763/doteur", tech: ["Rust", "Graphviz"] }
  ];
  
  export const technologies = [
      { name: "Rust", icon: "rust" },
      { name: "Go", icon: "go" },
      { name: "Java", icon: "openjdk" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Next.js", icon: "nextdotjs" },
      { name: "Quarkus", icon: "quarkus" },
      { name: "Spring", icon: "spring" },
      { name: "Linux", icon: "linux" },
      { name: "Docker", icon: "docker" }
];

export const workExperiences = [
    {
        title: "Software Engineer @ TotalEnergies",
        period: "02/2025 — Present",
        location: "Esbjerg, Denmark",
        tasks: [
            "Architected a document validation engine processing 500+ financial files/month, reducing manual effort by 80%.",
            "Engineered enterprise-grade GenAI (RAG) platform for domain-specific knowledge discovery.",
            "Led development of inventory tools reducing dead stock review time by 75%."
        ],
        technologies: ["Azure", "Python", "Next.js", "TypeScript", "React", "JavaScript", "Java", "Spring", "Entra ID"],
        current: true
    },
    {
        title: "IT Consultant @ Allianz Trade (via Aubay)",
        period: "03/2021 — 02/2025",
        location: "Paris, France",
        tasks: [
            "Led technical evolution of enterprise CRM portal, integrating Salesforce APIs to centralize data.",
            "Scaled customer portal supporting 30,000+ monthly active users worldwide.",
            "Orchestrated migration of legacy systems to modern stack, improving developer velocity and reducing debt."
        ],
        technologies: ["AWS", "Java", "Spring", "JEE", "JavaScript", "jQuery"],
        current: false
    }
]