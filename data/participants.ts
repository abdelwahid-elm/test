import type { Participant } from "@/types/domain";

export const participants: Participant[] = [
  { id: "p-youssef", name: "Abdelwahid", initials: "A", role: ["resident", "family_admin"], availableCapital: 12500, color: "#33654a", joinedAt: "2022-01-10", votingWeight: 12, privacy: "family" },
  { id: "p-omar", name: "Abdelilah", initials: "A", role: ["investor", "finance_admin", "resident"], availableCapital: 34000, color: "#9c7f47", joinedAt: "2022-01-10", votingWeight: 10, privacy: "family" },
  { id: "p-sara", name: "Said", initials: "S", role: ["investor", "resident"], availableCapital: 21500, color: "#3f7d5c", joinedAt: "2022-01-10", votingWeight: 8, privacy: "family" },
  { id: "p-nadia", name: "Ilias", initials: "I", role: ["resident"], availableCapital: 8200, color: "#8db8a0", joinedAt: "2022-06-02", votingWeight: 7, privacy: "family" },
  { id: "p-hamid", name: "Youness", initials: "Y", role: ["investor", "legal_reviewer", "resident"], availableCapital: 45300, color: "#b99a5c", joinedAt: "2022-06-02", votingWeight: 9, privacy: "administrators" },
  { id: "p-yasmine", name: "Ayoub", initials: "A", role: ["investor", "resident"], availableCapital: 61200, color: "#294f3b", joinedAt: "2022-09-14", votingWeight: 9, privacy: "family" },
  { id: "p-karim", name: "Abderrahim", initials: "A", role: ["resident"], availableCapital: 5400, color: "#d8c496", joinedAt: "2023-02-20", votingWeight: 6, privacy: "family" },
  { id: "p-fatima", name: "Abdelatif", initials: "A", role: ["investor", "sharia_reviewer", "resident"], availableCapital: 38900, color: "#152a1f", joinedAt: "2023-03-11", votingWeight: 8, privacy: "administrators" },
  { id: "p-rachid", name: "Rachid", initials: "R", role: ["investor", "resident"], availableCapital: 27600, color: "#39423b", joinedAt: "2023-05-01", votingWeight: 7, privacy: "family" },
  { id: "p-amina", name: "Nourdine", initials: "N", role: ["resident"], availableCapital: 9800, color: "#e9dcb8", joinedAt: "2023-08-19", votingWeight: 6, privacy: "family" },
  { id: "p-tarik", name: "Tarik", initials: "T", role: ["auditor", "investor", "resident"], availableCapital: 52100, color: "#1b201c", joinedAt: "2024-01-05", votingWeight: 8, privacy: "administrators" },
  { id: "p-leila", name: "Fouad", initials: "F", role: ["investor", "resident"], availableCapital: 19700, color: "#5c8a6f", joinedAt: "2024-04-22", votingWeight: 6, privacy: "family" },
  { id: "p-rafik", name: "Rafik", initials: "R", role: ["investor"], availableCapital: 15600, color: "#6b8f7a", joinedAt: "2024-08-01", votingWeight: 5, privacy: "family" },
  { id: "p-khalid", name: "Khalid", initials: "K", role: ["investor"], availableCapital: 22300, color: "#a68a5b", joinedAt: "2024-09-15", votingWeight: 5, privacy: "family" },
  { id: "p-farid", name: "Farid", initials: "F", role: ["investor"], availableCapital: 17500, color: "#2f4a3d", joinedAt: "2024-11-01", votingWeight: 5, privacy: "family" },
];

export function participantById(id: string): Participant | undefined {
  return participants.find((p) => p.id === id);
}
