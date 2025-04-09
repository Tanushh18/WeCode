import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";
import Editor from "@monaco-editor/react"; // ✅ Correct import
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";

const CodeEditor = () => {
  const { roomid } = useParams();
  const editorRef = useRef(null);

  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);
    const [language, setLanguage] = useState("javascript");
    const [Theme , setTheme] = useState("vs-dark");

  const onSelect = (selectedLang) => {
    setLanguage(selectedLang);
    setValue(CODE_SNIPPETS[selectedLang]);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <HStack align="start" spacing={4} p={4}>
        

      <Box w="100%">
        <Editor
          height="75vh"
          theme={Theme}
          language={language}
          value={value}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          onChange={(val) => setValue(val)}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
              />
             <div style={{ display: "flex" }}> <LanguageSelector language={language} onSelect={onSelect} />
          
          <button onClick={() => setTheme(Theme === "vs-dark" ? "light" : "vs-dark")} style={ {marginLeft:"10px" , width:"30px%" , height:"40px" , marginTop:"20px"}} >Change Theme</button></div>
          </Box>
          
         
    </HStack>
  );
};

export default CodeEditor;