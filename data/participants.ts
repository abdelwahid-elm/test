import type { Participant } from "@/types/domain";

export const participants: Participant[] = [
  { id: "p-youssef", name: "Familielid 1", initials: "1", role: ["resident", "family_admin"], availableCapital: 12500, color: "#33654a", joinedAt: "2022-01-10", votingWeight: 12, privacy: "family" },
  { id: "p-omar", name: "Familielid 2", initials: "2", role: ["investor", "finance_admin", "resident"], availableCapital: 34000, color: "#9c7f47", joinedAt: "2022-01-10", votingWeight: 10, privacy: "family" },
  { id: "p-sara", name: "Familielid 3", initials: "3", role: ["investor", "resident"], availableCapital: 21500, color: "#3f7d5c", joinedAt: "2022-01-10", votingWeight: 8, privacy: "family" },
  { id: "p-nadia", name: "Familielid 4", initials: "4", role: ["resident"], availableCapital: 8200, color: "#8db8a0", joinedAt: "2022-06-02", votingWeight: 7, privacy: "family" },
  { id: "p-hamid", name: "Familielid 5", initials: "5", role: ["investor", "legal_reviewer", "resident"], availableCapital: 45300, color: "#b99a5c", joinedAt: "2022-06-02", votingWeight: 9, privacy: "administrators" },
  { id: "p-yasmine", name: "Familielid 6", initials: "6", role: ["investor", "resident"], availableCapital: 61200, color: "#294f3b", joinedAt: "2022-09-14", votingWeight: 9, privacy: "family" },
  { id: "p-karim", name: "Familielid 7", initials: "7", role: ["resident"], availableCapital: 5400, color: "#d8c496", joinedAt: "2023-02-20", votingWeight: 6, privacy: "family" },
  { id: "p-fatima", name: "Familielid 8", initials: "8", role: ["investor", "sharia_reviewer", "resident"], availableCapital: 38900, color: "#152a1f", joinedAt: "2023-03-11", votingWeight: 8, privacy: "administrators" },
  { id: "p-rachid", name: "Familielid 9", initials: "9", role: ["investor", "resident"], availableCapital: 27600, color: "#39423b", joinedAt: "2023-05-01", votingWeight: 7, privacy: "family" },
  { id: "p-amina", name: "Familielid 10", initials: "10", role: ["resident"], availableCapital: 9800, color: "#e9dcb8", joinedAt: "2023-08-19", votingWeight: 6, privacy: "family" },
  { id: "p-tarik", name: "Familielid 11", initials: "11", role: ["auditor", "investor", "resident"], availableCapital: 52100, color: "#1b201c", joinedAt: "2024-01-05", votingWeight: 8, privacy: "administrators" },
  { id: "p-leila", name: "Familielid 12", initials: "12", role: ["investor", "resident"], availableCapital: 19700, color: "#5c8a6f", joinedAt: "2024-04-22", votingWeight: 6, privacy: "family" },
  { id: "p-rafik", name: "Familielid 13", initials: "13", role: ["investor"], availableCapital: 15600, color: "#6b8f7a", joinedAt: "2024-08-01", votingWeight: 5, privacy: "family" },
  { id: "p-khalid", name: "Familielid 14", initials: "14", role: ["investor"], availableCapital: 22300, color: "#a68a5b", joinedAt: "2024-09-15", votingWeight: 5, privacy: "family" },
  { id: "p-farid", name: "Familielid 15", initials: "15", role: ["investor"], availableCapital: 17500, color: "#2f4a3d", joinedAt: "2024-11-01", votingWeight: 5, privacy: "family" },
];

export function participantById(id: string): Participant | undefined {
  return participants.find((p) => p.id === id);
}
