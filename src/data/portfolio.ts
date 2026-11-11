export const profile = {
  name: "Nihal Chourasiya",
  email: "nhlchrs@gmail.com",
  github: "https://github.com/nihalChourasiya",
  linkedin: "https://www.linkedin.com/in/nihal-chourasiya/",
  leetcode: "https://leetcode.com/u/user3099iz/",
  resume: "/Nihal-Chourasiya-Resume.pdf",
};

export const projects = [
  { name: "AeroProxy", category: "C++ API gateway · Self project", date: "Jul – Aug 2026", tools: "C++ · Boost.Asio / Beast · OpenSSL", description: "A multithreaded API gateway with TLS termination, routing, load balancing, rate limiting, and active health checks. A custom TCP connection pool reduces handshake overhead on keep-alive paths.", image: "/images/projects/aeroproxy.svg", link: "https://github.com/nihalChourasiya/api-gateway.git" },
  { name: "BODH", category: "Healthcare AI benchmarking · M.Tech thesis", date: "Apr 2026 – Present", tools: "FastAPI · React · PostgreSQL · Docker", description: "A healthcare AI benchmarking platform built with a React frontend, FastAPI, and PostgreSQL for the National Health Authority. Docker isolates model evaluations; a signed SHA-256 hash preserves submission proof after model deletion. Mentored by Prof. Nisheeth Srivastava.", image: "/images/projects/bodh.svg", link: "http://13.205.196.64/", linkLabel: "Visit platform ↗" },
  { name: "Distributed 3D Stencil Engine", category: "Isovalue analyzer · CS633 Parallel Computing", date: "Mar – Apr 2026", tools: "C · MPI / MPICH · SLURM · PARAM Rudra", description: "Distributed 3D grid computation with domain decomposition, halo exchanges, and boundary handling to track isovalues without duplicating data. Deployed across node configurations on PARAM Rudra.", image: "/images/projects/stencil.svg", link: "https://github.com/nihalChourasiya/IsoValue_analyzer" },
  { name: "CDCIR", category: "Composed image retrieval · CS776", date: "Feb – Apr 2026", tools: "Python · DINOv2 · CLIP · Gradio", description: "An interactive Gradio web demo for searching images with a reference image and text instructions. CLIP and DINOv2 features power retrieval, while precomputed, cached image features speed up the real-time experience on FashionIQ.", image: "/images/projects/cdcir.svg", link: "https://huggingface.co/spaces/chadhurbala/CDCIR", linkLabel: "Try live demo ↗" },
  { name: "IITK Ride Connect", category: "Campus mobility · Self project", date: "May 2026", tools: "Python · Flask · MongoDB · SMSgateway", description: "Connects campus riders with nearby auto-rickshaws. Drivers update their availability through SMS, without needing a smartphone or mobile data.", image: "/images/projects/ride.svg", link: "https://github.com/nihalChourasiya/IITK-Ride-Connect.git" },
];

export const skillGroups = [
  { title: "Frontend & interfaces", items: ["React.js", "HTML", "JavaScript", "Gradio"] },
  { title: "Backend & APIs", items: ["Node.js", "FastAPI", "Flask", "RESTful APIs"] },
  { title: "Languages", items: ["C", "C++", "Python"] },
  { title: "Databases", items: ["Redis", "PostgreSQL", "MongoDB", "MySQL"] },
  { title: "Systems & tools", items: ["MPI / MPICH", "Git", "Docker", "Linux", "LaTeX"] },
];
