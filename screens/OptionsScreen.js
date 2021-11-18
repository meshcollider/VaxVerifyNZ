import * as React from 'react';
import { Heading, Center, VStack, HStack, Switch, Text, Box, useColorMode, useColorModeValue } from 'native-base';

export default function OptionsScreen() {
  const { toggleColorMode } = useColorMode()
  return (
    <Box flex={1} bg={useColorModeValue("#F0F0F0", "#3C3C3C")}>
      <Center alignContent='center'  alignItems='center' flex={1}>
        <VStack space={4} alignItems="center"> 
          <Heading>Options</Heading>
          <Text textAlign='center'>TODO: Front/Back camera, dark/light mode, trusted authorities/caching?</Text>
          <HStack alignItems="center" space={4}>
            <Text>{useColorModeValue("Light", "Dark")} mode</Text>
            <Switch size="lg" isChecked={useColorModeValue(true, false)} offTrackColor="#CCCC00" onToggle={toggleColorMode} />
          </HStack>
        </VStack>
      </Center>
    </Box>
  );
}
