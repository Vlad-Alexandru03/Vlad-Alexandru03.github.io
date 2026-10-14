export const person = {
  name: "Vlad-Alexandru Petrariu",
  shortName: "Vlad Petrariu",
  location: "Turku, Finland",
  email: "petrariu.vlad.alexandru@gmail.com",
  github: "https://github.com/Vlad-Alexandru03",
  linkedin: "https://www.linkedin.com/in/vlad-petrariu-6b2130311/",
  introduction:
    "I'm Vlad, an automation engineer pursuing an M.Sc. in Robotics and Autonomous Systems at the University of Turku. My work connects control systems, embedded software, and physical equipment.",
};

export const skills = {
  controls: {
    name: "Control & automation",
    items: [
      "TIA Portal",
      "PLC programming",
      "MATLAB / Simulink",
      "PID control",
      "MPC",
      "Commissioning",
    ],
  },
  robotics: {
    name: "Robotics & embedded",
    items: [
      "Universal Robots",
      "C / C++",
      "Python",
      "Raspberry Pi",
      "IMU processing",
      "System integration",
    ],
  },
  software: {
    name: "Software & infrastructure",
    items: ["MATLAB", "Python", "Linux", "Docker", "Tailscale", "LaTeX"],
  },
};
export type SkillId = keyof typeof skills;
export type ProjectId =
  | "edge-fog"
  | "balancing-robot"
  | "bearguard"
  | "water-control"
  | "home-automation";
export interface Project {
  id: ProjectId;
  title: string;
  category: string;
  kind: string;
  summary: string;
  tags: string[];
  context: string;
  contributions: string[];
  learning: string;
  source?: string;
}

export const projects: Project[] = [
  {
    id: "balancing-robot",
    title: "Finding balance through feedback.",
    category: "ROBOTICS / CONTROL",
    kind: "Hardware project",
    summary:
      "A two-wheeled robot using IMU feedback and PID control to stabilize its angle and regulate speed.",
    tags: ["C / C++", "PID control", "IMU"],
    context:
      "An unstable, two-wheeled robot is a practical way to explore how sensing, controller tuning, and actuation interact in real time.",
    contributions: [
      "Designed and built a self-balancing two-wheeled robot.",
      "Configured and tuned PID controllers for angle stabilization and speed regulation.",
      "Processed raw IMU data to support real-time feedback and system adjustments.",
    ],
    learning:
      "The project brought together embedded programming, feedback control, and hardware diagnostics.",
  },
  {
    id: "edge-fog",
    title: "Less data. More useful information.",
    category: "EDGE COMPUTING / RESEARCH",
    kind: "Research implementation",
    summary:
      "A MATLAB pipeline for clustering environmental sensor readings and compressing the resulting label stream.",
    tags: ["MATLAB", "IoT", "Data reduction"],
    context:
      "My bachelor’s thesis concerns joint task offloading and data reduction in edge computing. This public repository contains experimental code and data for related research on IoT environmental systems.",
    contributions: [
      "Worked with paired temperature and humidity readings in a MATLAB experimental pipeline.",
      "The implementation clusters sensor readings, classifies new samples, and compresses cluster labels with Run-Length and Huffman encoding.",
      "The repository provides a main entry script and a second-sensor robustness-check configuration.",
    ],
    learning:
      "The repository documents experimental validation. Related manuscripts are in preparation for submission; they are not presented here as published papers.",
    source: "https://github.com/Vlad-Alexandru03/edge-fog-data-reduction",
  },
  {
    id: "bearguard",
    title: "BearGuard",
    category: "EMBEDDED SYSTEMS",
    kind: "Prototype",
    summary:
      "A wildlife-detection prototype connecting thermal imaging, machine learning, and actuators on a Raspberry Pi.",
    tags: ["Python", "Raspberry Pi", "Thermal imaging"],
    context:
      "A field-deployable prototype for wildlife detection, bringing sensing and a physical response into one embedded system.",
    contributions: [
      "Developed a prototype integrating thermal imaging, machine learning, and actuators.",
      "Used a Raspberry Pi for embedded system integration.",
      "Worked with GSM/GPS functionality for remote monitoring.",
    ],
    learning:
      "The focus was system architecture and integration across sensing, software, communication, and actuation.",
  },
  {
    id: "water-control",
    title: "Water level, under control.",
    category: "MODELING / SIMULATION",
    kind: "Simulation project",
    summary:
      "Simulated tank-level control with cascade, feedforward, and model predictive control strategies.",
    tags: ["Simulink", "MPC", "Control modeling"],
    context:
      "A simulated fluid-level system for investigating control strategies and system behavior under disturbances.",
    contributions: [
      "Modeled and simulated tank-level control systems in MATLAB / Simulink.",
      "Explored cascade, feedforward, and model predictive control approaches.",
      "Analyzed responses to introduced noise and operational anomalies.",
    ],
    learning:
      "This work developed my experience with virtual testing, system modeling, and stability analysis. It is a simulation project, not a commissioned industrial installation.",
  },
  {
    id: "home-automation",
    title: "A connected home, self-hosted.",
    category: "SOFTWARE / INFRASTRUCTURE",
    kind: "Personal infrastructure",
    summary:
      "A self-hosted automation and media environment using Home Assistant, Docker, and Tailscale.",
    tags: ["Docker", "Linux", "Home Assistant"],
    context:
      "A personal environment for running and connecting home automation and media services.",
    contributions: [
      "Deployed and configured Home Assistant and containerized services.",
      "Used Docker in a Linux environment.",
      "Configured Tailscale VPN connectivity for the self-hosted environment.",
    ],
    learning:
      "The work combines networking, service configuration, and practical Linux administration.",
  },
];

export const experience = {
  title: "Automation Engineering Intern",
  company: "PSC Automation and Installations",
  location: "Cluj-Napoca, Romania",
  date: "2025",
  summary: "Industrial automation, from configuration to commissioning.",
  bullets: [
    "Participated in the development, commissioning, and testing of automated industrial production lines.",
    "Troubleshot industrial automation equipment and PLC-controlled processes alongside senior engineers.",
    "Managed software configurations and integrated Universal Robots with safety components and PLCs using TIA Portal.",
  ],
};

export const education = [
  {
    degree: "M.Sc. Robotics and Autonomous Systems",
    institution: "University of Turku",
    date: "2026 — 2028",
    detail:
      "In progress · Mobile robotics, robotic manipulation, and autonomous control systems.",
  },
  {
    degree: "Bachelor of Automation and Computer Science",
    institution: "Technical University of Cluj-Napoca",
    date: "2022 — 2026",
    detail:
      "Thesis: Dynamic Joint Task Offloading and Data Reduction in Edge Computing. Merit-based performance scholarship every semester.",
  },
];

export const research = [
  {
    title:
      "Efficient Task Offloading and Data Reduction in IoT-Based Environmental Systems: A Systematic Review",
    description:
      "An analysis of latency, energy efficiency, and open challenges in edge computing architectures.",
  },
  {
    title:
      "A Hierarchical Fog–Cloud Framework for IoT: Coupling Unsupervised Clustering with Lévy-Flight Optimization",
    description:
      "A proposed architecture combining optimization and data reduction across fog and cloud layers.",
  },
];
