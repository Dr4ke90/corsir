import { processDocxTemplate } from "./wordGenerator";
import axios from "axios";

export const handleFetchFile = (endpointUrl, selectedObject) => {
  axios({
    url: endpointUrl,
    method: "GET",
    responseType: "arraybuffer",
  })
    .then((response) => {
      const binaryData = response.data;

      processDocxTemplate(binaryData, selectedObject);
    })
    .catch((error) => {
      console.error("Error fetching file:", error.message);
    });
};
