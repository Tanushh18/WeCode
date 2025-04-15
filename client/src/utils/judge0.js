import axios from "axios";

const JUDGE0_API = "https://judge0-ce.p.rapidapi.com";
const RAPID_API_KEY = "d20449a8fbmsha0496d720d5fb14p154886jsn776a911a71a4";

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
    console.error("❌ Error submitting code to Judge0:", error);
    throw error;
  }
};

export default runCodeWithJudge0;