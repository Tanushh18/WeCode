import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import socket from "../sockets/socket";
// import { io } from "socket.io-client";

// // Global socket instance (only created once)
// const socket = io(process.env.REACT_APP_SOCKET_URL, {
//   withCredentials: true,
//   autoConnect: false, // Connect manually
// });

const getLanguageName = (id) => {
  switch (id) {
    case 63:
      return "javascript";
    case 71:
      return "python";
    default:
      return "javascript";
  }
};

const CodeEditor = ({ editorRef, languageId, setLanguageId, defaultLanguageId = 63 }) => {
  const { publicRoomId, privateRoomId } = useParams();
  const [value, setValue] = useState(() => {
    const lang = getLanguageName(defaultLanguageId);
    const questionTitle = publicRoomId?.replace(/-/g, " ");
    if (questionTitle && window.defaultQuestionCode?.[questionTitle.toLowerCase()]) {
      return window.defaultQuestionCode[questionTitle.toLowerCase()][lang] || CODE_SNIPPETS[lang];
    }
    return CODE_SNIPPETS[lang];
  });
  const [theme, setTheme] = useState("vs-dark");

  // Language selector
  const onSelect = (selectedLang) => {
    setLanguageId(selectedLang === "javascript" ? 63 : 71);
    setValue(CODE_SNIPPETS[selectedLang]);
  };

  // When Monaco mounts
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    if (!privateRoomId) return;

    if (!socket.connected) {
      socket.connect();

      socket.on("connect", () => {
        setSocketConnected(true);
        console.log("🔌 Connected to socket server");
        socket.emit("join-room", privateRoomId);
        console.log("🔗 Joined room:", privateRoomId);
      });
    }

    // Handle code from others
    const handleIncomingCode = (incomingCode) => {
      const currentCode = editorRef.current?.getValue();
      if (incomingCode !== currentCode) {
        editorRef.current?.setValue(incomingCode);
      }
    };

    socket.on("code-change", handleIncomingCode);

    return () => {
      socket.off("code-change", handleIncomingCode);
      socket.disconnect();
      console.log("🧹 Disconnected from socket server");
    };
  }, [privateRoomId]);

  const handleCodeChange = (val) => {
    setValue(val);
    if (privateRoomId && socketConnected) {
      socket.emit("code-change", { privateRoomId, code: val });
    }
  };

  useEffect(() => {
    const lang = getLanguageName(languageId);
    const questionTitle = publicRoomId?.replace(/-/g, " ");
    if (questionTitle && window.defaultQuestionCode?.[questionTitle.toLowerCase()]) {
      setValue(window.defaultQuestionCode[questionTitle.toLowerCase()][lang] || CODE_SNIPPETS[lang]);
    } else {
      setValue(CODE_SNIPPETS[lang]);
    }
  }, [languageId]);

  useEffect(() => {
    const fetchDefaultCode = async () => {
      const title = publicRoomId?.replace(/-/g, " ");
      const lang = getLanguageName(languageId);
      if (!title) return;

      try {
        const res = await fetch(`${process.env.REACT_APP_TESTCASE_API}/default/${title}`);
        const data = await res.json();
        const defaultCode = data?.defaultCode;

        if (defaultCode) {
          setValue(defaultCode);
        }
      } catch (err) {
        console.error("Failed to load default code from backend", err);
      }
    };

    fetchDefaultCode();
  }, [publicRoomId]);

return (
  
  
     <Box
      width={{ base: "80%", md: "60%" }}  // 100% on mobile, 80% on larger screens
      height="75vh"
      bg="gray.800"
      borderRadius="md"
      boxShadow="xl"
      overflow="hidden"
      display="flex"
      justifyContent={{ base: "center", md: "flex-end" }}  // Align to center on mobile, right on larger screens
  >
     <div>
          <LanguageSelector language={getLanguageName(languageId)} onSelect={onSelect} />
          <button
            onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
          >
            Change Theme
          </button>
        </div>
        <Editor
          height="75vh"
          theme={theme} 
          language={getLanguageName(languageId)}
          value={value}
          onMount={onMount}
          onChange={handleCodeChange}
          options={{
            fontSize: 16, // Larger, readable font size
            fontFamily: 'Fira Code, monospace', // Professional monospaced font
            lineHeight: 1.5, // Better line spacing for readability
            minimap: { enabled: false }, // Minimaps are often unnecessary for professional UIs
            wordWrap: "on", // Ensures code wraps correctly within the editor
            scrollBeyondLastLine: false, // Keeps the editor clean without unnecessary space at the end
            renderWhitespace: "none", // Removes unnecessary whitespace in the editor
            cursorBlinking: "smooth", // Smooth cursor blinking
          }}
        />
       
      </Box>
   
    
)
};

export default CodeEditor;