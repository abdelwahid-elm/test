import type { DocumentItem } from "@/types/domain";
import { properties } from "./properties";

const FOLDER_DOCS: { folder: DocumentItem["folder"]; name: string; status: DocumentItem["status"] }[] = [
  { folder: "notarial_deeds", name: "Notariële akte.pdf", status: "signed" },
  { folder: "contracts", name: "Participatieovereenkomst.pdf", status: "signed" },
  { folder: "contracts", name: "Bewonersovereenkomst.pdf", status: "signed" },
  { folder: "valuations", name: "Onafhankelijk waarderingsrapport.pdf", status: "signed" },
  { folder: "insurance", name: "Brandverzekeringspolis.pdf", status: "signed" },
  { folder: "sharia_opinions", name: "Sharia-structuurmemo.pdf", status: "draft" },
  { folder: "tax", name: "Fiscale analyse (concept).pdf", status: "pending_signature" },
];

export const documents: DocumentItem[] = properties.flatMap((p) =>
  FOLDER_DOCS.map((d, i) => ({
    id: `${p.id}-doc-${i}`,
    name: d.name,
    folder: d.folder,
    propertyId: p.id,
    uploadedAt: p.purchaseDate,
    status: d.status,
  }))
);

export function documentsForProperty(propertyId: string): DocumentItem[] {
  return documents.filter((d) => d.propertyId === propertyId);
}
