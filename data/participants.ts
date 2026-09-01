import type { Participant } from "@/types/domain";

// The family started this platform roughly a year ago (first joins: Aug 2025).
export const participants: Participant[] = [
  { id: "p-youssef", name: "Abdelwahid", initials: "A", role: ["resident", "family_admin"], availableCapital: 8000, color: "#33654a", joinedAt: "2025-08-15", votingWeight: 12, privacy: "family" },
  { id: "p-omar", name: "Abdelilah", initials: "A", role: ["investor", "finance_admin", "resident"], availableCapital: 22000, color: "#9c7f47", joinedAt: "2025-08-15", votingWeight: 10, privacy: "family" },
  { id: "p-sara", name: "Said", initials: "S", role: ["investor", "resident"], availableCapital: 14000, color: "#3f7d5c", joinedAt: "2025-08-20", votingWeight: 8, privacy: "family" },
  { id: "p-nadia", name: "Ilias", initials: "I", role: ["resident"], availableCapital: 5500, color: "#8db8a0", joinedAt: "2025-09-10", votingWeight: 7, privacy: "family" },
  { id: "p-hamid", name: "Youness", initials: "Y", role: ["investor", "legal_reviewer", "resident"], availableCapital: 28000, color: "#b99a5c", joinedAt: "2025-09-10", votingWeight: 9, privacy: "administrators" },
  { id: "p-yasmine", name: "Ayoub", initials: "A", role: ["investor", "resident"], availableCapital: 19000, color: "#294f3b", joinedAt: "2025-10-05", votingWeight: 9, privacy: "family" },
  { id: "p-karim", name: "Abderrahim", initials: "A", role: ["resident"], availableCapital: 3600, color: "#d8c496", joinedAt: "2025-11-01", votingWeight: 6, privacy: "family" },
  { id: "p-fatima", name: "Abdelatif", initials: "A", role: ["investor", "sharia_reviewer", "resident"], availableCapital: 16500, color: "#152a1f", joinedAt: "2025-11-20", votingWeight: 8, privacy: "administrators" },
  { id: "p-rachid", name: "Rachid", initials: "R", role: ["investor", "resident"], availableCapital: 12000, color: "#39423b", joinedAt: "2025-12-15", votingWeight: 7, privacy: "family" },
  { id: "p-amina", name: "Nourdine", initials: "N", role: ["resident"], availableCapital: 4200, color: "#e9dcb8", joinedAt: "2026-01-10", votingWeight: 6, privacy: "family" },
  { id: "p-tarik", name: "Tarik", initials: "T", role: ["auditor", "investor", "resident"], availableCapital: 21000, color: "#1b201c", joinedAt: "2026-02-01", votingWeight: 8, privacy: "administrators" },
  { id: "p-leila", name: "Fouad", initials: "F", role: ["investor", "resident"], availableCapital: 9800, color: "#5c8a6f", joinedAt: "2026-03-05", votingWeight: 6, privacy: "family" },
  { id: "p-rafik", name: "Rafik", initials: "R", role: ["investor"], availableCapital: 7200, color: "#6b8f7a", joinedAt: "2026-04-12", votingWeight: 5, privacy: "family" },
  { id: "p-khalid", name: "Khalid", initials: "K", role: ["investor"], availableCapital: 8900, color: "#a68a5b", joinedAt: "2026-05-01", votingWeight: 5, privacy: "family" },
  { id: "p-farid", name: "Farid", initials: "F", role: ["investor"], availableCapital: 6300, color: "#2f4a3d", joinedAt: "2026-05-15", votingWeight: 5, privacy: "family" },
];

export function participantById(id: string): Participant | undefined {
  return participants.find((p) => p.id === id);
}
