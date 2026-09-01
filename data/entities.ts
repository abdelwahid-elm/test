import type { LocalText } from "@/types/domain";

// Legal owners for properties held via an SPV / central vehicle (Model B & C),
// distinct from the participants who hold ECONOMIC ownership.
export const legalEntities: Record<string, LocalText> = {
  "entity-mechelen-spv": { nl: "Mechelen Vastgoed BV (SPV)", fr: "Mechelen Vastgoed BV (SPV)" },
  "entity-leuven-spv": { nl: "Leuven Vastgoed BV (SPV)", fr: "Leuven Vastgoed BV (SPV)" },
  "entity-dc-central": { nl: "Dar Capital Centraal NV", fr: "Dar Capital Central SA" },
};
