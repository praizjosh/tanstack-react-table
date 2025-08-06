import axios from "axios";

export default async function getAbsences() {
  try {
    const response = await axios.get("https://front-end-kata.brighthr.workers.dev/api/absences");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
