import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";

export const processDocxTemplate = (binaryData, object) => {
  const template = new Docxtemplater();
  const buffer = new Uint8Array(binaryData);
  const zip = new PizZip(buffer);

  template.loadZip(zip);

  template.setData(object);

  try {
    template.render();
  } catch (error) {
    console.error("Error rendering template:", error.message);
  }

  const updatedBinaryData = template.getZip().generate({
    type: "uint8array",
  });

  // Salvează fișierul actualizat în sistemul de fișiere al utilizatorului
  const blob = new Blob([updatedBinaryData], {
    type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${object.fisa}.docx`;
  a.click();
  URL.revokeObjectURL(url);
};
