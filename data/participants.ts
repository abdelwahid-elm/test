import type { Participant } from "@/types/domain";

export const participants: Participant[] = [
  { id: "p-youssef", name: "Youssef Amrani", initials: "YA", role: ["resident", "family_admin"], availableCapital: 12500, color: "#33654a", joinedAt: "2022-01-10", votingWeight: 12, privacy: "family" },
  { id: "p-omar", name: "Omar Amrani", initials: "OA", role: ["investor", "finance_admin"], availableCapital: 34000, color: "#9c7f47", joinedAt: "2022-01-10", votingWeight: 10, privacy: "family" },
  { id: "p-sara", name: "Sara Amrani", initials: "SA", role: ["investor"], availableCapital: 21500, color: "#3f7d5c", joinedAt: "2022-01-10", votingWeight: 8, privacy: "family" },
  { id: "p-nadia", name: "Nadia El Idrissi", initials: "NE", role: ["resident"], availableCapital: 8200, color: "#8db8a0", joinedAt: "2022-06-02", votingWeight: 7, privacy: "family" },
  { id: "p-hamid", name: "Hamid El Idrissi", initials: "HE", role: ["investor", "legal_reviewer", "resident"], availableCapital: 45300, color: "#b99a5c", joinedAt: "2022-06-02", votingWeight: 9, privacy: "administrators" },
  { id: "p-yasmine", name: "Yasmine Bensaid", initials: "YB", role: ["investor"], availableCapital: 61200, color: "#294f3b", joinedAt: "2022-09-14", votingWeight: 9, privacy: "family" },
  { id: "p-karim", name: "Karim Bensaid", initials: "KB", role: ["resident"], availableCapital: 5400, color: "#d8c496", joinedAt: "2023-02-20", votingWeight: 6, privacy: "family" },
  { id: "p-fatima", name: "Fatima Zahra Toumi", initials: "FT", role: ["investor", "sharia_reviewer"], availableCapital: 38900, color: "#152a1f", joinedAt: "2023-03-11", votingWeight: 8, privacy: "administrators" },
  { id: "p-rachid", name: "Rachid Toumi", initials: "RT", role: ["investor", "resident"], availableCapital: 27600, color: "#39423b", joinedAt: "2023-05-01", votingWeight: 7, privacy: "family" },
  { id: "p-amina", name: "Amina Chaoui", initials: "AC", role: ["resident"], availableCapital: 9800, color: "#e9dcb8", joinedAt: "2023-08-19", votingWeight: 6, privacy: "family" },
  { id: "p-tarik", name: "Tarik Chaoui", initials: "TC", role: ["auditor", "investor", "resident"], availableCapital: 52100, color: "#1b201c", joinedAt: "2024-01-05", votingWeight: 8, privacy: "administrators" },
  { id: "p-leila", name: "Leila Amrani", initials: "LA", role: ["investor", "resident"], availableCapital: 19700, color: "#5c8a6f", joinedAt: "2024-04-22", votingWeight: 6, privacy: "family" },
];

export function participantById(id: string): Participant | undefined {
  return participants.find((p) => p.id === id);
}
