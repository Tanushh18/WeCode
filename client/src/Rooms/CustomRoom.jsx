import React from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import Layout from "../Layout1/Layout";
import { Box, Text } from "@chakra-ui/react";
import VideoConferencing from "./VideoConferencing";

const CustomRoom = () => {
  const { roomId } = useParams();

  return (
    <Layout>
      <Box display="flex" height="100vh" width="100%" p={4}>
        {/* Left side - Room Info and Language Selector */}
        <Box width="50%" pr={4}>
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            Custom Room: {roomId}
          </Text>
          {/* Add your LanguageSelector or other components here */}
        </Box>

        {/* Right side - Code Editor */}
        <Box width="50%" height="30%" marginTop={"10px"}>
          <CodeEditor />
        </Box>

       
      </Box>
    </Layout>
  );
};

export default CustomRoom;