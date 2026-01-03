export type LeadershipMember = {
  name: string;
  role: string;
  initials: string;
  gradientClassName: string;
};

export const LEADERSHIP_TEAM: LeadershipMember[] = [
  {
    name: "Hussain Syed",
    role: "Co-Organizer",
    initials: "HS",
    gradientClassName: "from-primary to-accent",
  },
  {
    name: "Anubhav N",
    role: "Co-Organizer",
    initials: "AN",
    gradientClassName: "from-accent to-primary",
  },
  {
    name: "Aasrith R",
    role: "Co-Organizer",
    initials: "AR",
    gradientClassName: "from-primary-light to-accent",
  },
];

