import React from "react";
import { useParams, useLocation  } from "react-router-dom";
import CodeEditor from "./CodeEditor";
import Layout from "../Layout1/Layout";
import { Box, Text } from "@chakra-ui/react";


const CustomRoom = () => {
  const { publicRoomId, privateRoomId } = useParams();
  const { roomId } = useParams();
  const location = useLocation();
  const { question = {} } = location.state || {};
    
  const isReadOnly = location.state?.isReadOnly || false;
  const fromNavbar = location.state?.fromNavbar || false;

  return (
    <Layout>
      <Box width="100%" textAlign="center" mt={6}>
        {publicRoomId ? (
          <Text fontSize="lg" fontWeight="semibold" color="white">
            Public Room ID: {publicRoomId || "N/A"} || Private Room ID: {privateRoomId || "N/A"}
          </Text>
        ) : roomId ? (
          <Text fontSize="lg" fontWeight="semibold" color="white">
            Room ID: {roomId}
          </Text>
        ) : null}
      </Box>
      {!isReadOnly && !fromNavbar  && <Box display="flex" height="100vh" width="100%" p={4}>
        {/* Left side - Room Info and Language Selector */}
        <Box width="50%" pr={4} overflowY="auto" maxHeight="90vh">
          <Text fontSize="2xl" fontWeight="bold" mb={4}>
            {question.title || "Custom Room"} - {publicRoomId}
          </Text>
          <Text mb={2}><strong>Difficulty:</strong> {question.difficulty}</Text>
          <Text mb={2}><strong>Statement:</strong> {question.statement}</Text>
          <Text mb={2}><strong>Sample Input:</strong> {question.sampleInput}</Text>
          <Text mb={2}><strong>Sample Output:</strong> {question.sampleOutput}</Text>
          <Text mb={2}><strong>Constraints:</strong> {question.constraints}</Text>
        </Box>

        {/* Right side - Code Editor */}
        <Box width="50%" height="30%" marginTop={"10px"}>
          <CodeEditor />
        </Box>

       
      </Box>}
    </Layout>
  );
};

export default CustomRoom;