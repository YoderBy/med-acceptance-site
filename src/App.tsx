import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Projects from './pages/Projects';
import About from './pages/About';

import { Box, ChakraProvider, Flex } from '@chakra-ui/react'
import Sidebar from './components/Sidebar';

import { extendTheme } from '@chakra-ui/react'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({ colors })

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Flex>
            <Box flex="1" padding={5}>

              <Routes>
                <Route path="/About" element={<About />} />
              </Routes>

              <Routes>
                <Route path="/Projects" element={<Projects />} />
              </Routes>
            </Box>
            
            <Sidebar />
          </Flex>
        </BrowserRouter>

      </ChakraProvider>
    </>
  );
}

export default App;
