
import React from 'react';
import { Box, Heading, Text, Image, VStack, Table, Thead, Tr, Th, Tbody, Input } from '@chakra-ui/react';
import GradeTable from '../components/GradeTable';
import { TableRow } from '../components/GradeTable';
const Projects = () => {
  const Bagruts : TableRow[] = [
    {id:1, class: 'מתמטיקה', unit : 5},  
    {id:2, class: 'אנגלית', unit : 5},
    {id:3, class: 'תנ"ך',  unit : 2},
    {id:5, class: 'היסטוריה', unit : 2},  
    {id:6, class: 'עברית',  unit : 2},
    {id:7, class: 'ספרות',  unit : 2},
    {id:8, class: 'אזרחות',  unit : 2},
  
  ];
  return (
  <div>
    <VStack  spacing={8} alignItems="center" padding={5}>
      <Heading as="h1" size="2xl">מחשבון בגרויות</Heading>
      <GradeTable InputRows = {Bagruts}></GradeTable>
    </VStack>
  </div>);
}
export default Projects;
