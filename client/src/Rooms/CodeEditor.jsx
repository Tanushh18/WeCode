import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, HStack } from "@chakra-ui/react";
import Editor from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import { io } from "socket.io-client";

// Global socket instance (only created once)
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // Connect manually
});

const CodeEditor = () => {
  const { roomId } = useParams();
  const editorRef = useRef(null);

  const [value, setValue] = useState(CODE_SNIPPETS["javascript"]);
  const [language, setLanguage] = useState("javascript");
  const [theme, setTheme] = useState("vs-dark");

  // Language selector
  const onSelect = (selectedLang) => {
    setLanguage(selectedLang);
    setValue(CODE_SNIPPETS[selectedLang]);
  };

  // When Monaco mounts
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Handle when *this user* edits code
  // const handleCodeChange = (val) => {
  //   const currentCode = editorRef.current?.getValue();

  //   if (val !== currentCode) {
  //     setValue(val);
  //     if (roomId && socket.connected) {
  //       socket.emit("code-change", { roomId, code: val });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (!roomId) return;
  
  //   if (!socket.connected) {
  //     socket.connect();
  //   }
  
  //   socket.emit("join-room", roomId);
  //   console.log("🔗 Joined room:", roomId);
  
  //   // Handle code changes from other users
  //   const handleIncomingCode = (incomingCode) => {
  //     const currentCode = editorRef.current?.getValue();
  //     if (incomingCode !== currentCode) {
  //       editorRef.current?.setValue(incomingCode);
  //     }
  //   };
  
  //   socket.on("code-change", handleIncomingCode);
  
  //   return () => {
  //     socket.off("code-change", handleIncomingCode);
  //     console.log("🧹 Left room:", roomId);
  //   };
  // }, [roomId]);
  const [socketConnected, setSocketConnected] = useState(false);

useEffect(() => {
  if (!roomId) return;

  if (!socket.connected) {
    socket.connect();

    socket.on("connect", () => {
      setSocketConnected(true);
      console.log("🔌 Connected to socket server");
      socket.emit("join-room", roomId);
      console.log("🔗 Joined room:", roomId);
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
}, [roomId]);
  
const handleCodeChange = (val) => {
  setValue(val);
  if (roomId && socketConnected) {
    socket.emit("code-change", { roomId, code: val });
  }
};

  return (
    <HStack align="start" spacing={4} p={4}>
      <Box w="100%">
        <Editor
          height="75vh"
          theme={theme}
          language={language}
          value={value}
          defaultValue={CODE_SNIPPETS[language]}
          onMount={onMount}
          onChange={handleCodeChange}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
        />

        <div style={{ display: "flex", marginTop: "16px" }}>
          <LanguageSelector language={language} onSelect={onSelect} />
          <button
            onClick={() => setTheme(theme === "vs-dark" ? "light" : "vs-dark")}
            style={{
              marginLeft: "10px",
              width: "30%",
              height: "40px",
            }}
          >
            Change Theme
          </button>
        </div>
      </Box>
    </HStack>
  );
};

export default CodeEditor;