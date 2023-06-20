'use client';
import styles from './page.module.css'
import { Box, Text } from '@chakra-ui/react'; 
import { useContext } from 'react';
import { userContext } from '@/components/UserContext';


export default function Home() {
  let { users } = useContext(userContext)

  return (
    <div style={{height: "100%"}}>
    <Box as="main" flex="1" py="2" px="4" overflowY="auto">
      <Text fontSize='6xl'>
        SaaS Management 
      </Text>
      <Text fontSize='4xl'>
        Total users in the system: {users.length}
      </Text>
      <Text>
        This is an example application created entirely with SaaS-UI. Use the menu on the left to navigate and add new users.
      </Text>
    </Box>
    </div>
  )
}
