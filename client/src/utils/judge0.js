import axios from "axios";

const JUDGE0_API = "https://judge0-ce.p.rapidapi.com";
const RAPID_API_KEY = "c515b41611msh4acd44ec9c913a4p1266dbjsn33e33477f36d";

export const runCodeWithJudge0 = async ({ source_code, language_id, stdin = "" }) => {
  try {
    const submissionRes = await axios.post(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=true`,
      {
        source_code,
        language_id,
        stdin,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": RAPID_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      }
    );
      

    return submissionRes.data;
  } catch (error) {
    console.error("❌ Error submitting code to Judge0:", error.response?.data || error.message);
    throw error;
  }
};

export default runCodeWithJudge0;