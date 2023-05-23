
import { Button as ChakraButton } from '#/components/button';
import { Button, DropdownMenu, Heading, Stack } from '@tokens-studio/ui'
import React from 'react';
import { ChakraBaseProvider } from '@chakra-ui/react'
import { ModifierProvider } from '#/components/tokensCtx';

const Index = () => {


  const [color, setColor] = React.useState('blue');
  const [type, setType] = React.useState('casual');


  const handleColorChange = (ev) => {
    const key = ev.currentTarget.dataset.key;
    setColor(key);
  }

  const handleTypeChange = (ev) => {
    const key = ev.currentTarget.dataset.key;
    setType(key);
  }


  return <ChakraBaseProvider>
    <ModifierProvider modifiers={{ color, type }}>
      <Stack direction='column' gap={6} justify='center' align='center'>
        <Stack direction='row' gap={2}>
          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary" asDropdown size="medium">
                Color {color}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content>
                <DropdownMenu.Item onClick={handleColorChange} data-key='blue'>Blue</DropdownMenu.Item>
                <DropdownMenu.Item onClick={handleColorChange} data-key='green'>Green</DropdownMenu.Item>
                <DropdownMenu.Item onClick={handleColorChange} data-key='purple'>Purple</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenu.Trigger asChild>
              <Button variant="secondary" asDropdown size="medium">
                Type {type}
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content>
                <DropdownMenu.Item onClick={handleTypeChange} data-key='business'>Business</DropdownMenu.Item>
                <DropdownMenu.Item onClick={handleTypeChange} data-key='casual'>Casual</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu>
        </Stack>
        <Stack direction='row' justify='center'>
          <div style={{ background: 'beige', display: 'inline-block', padding: '1em' }}>
            <ChakraButton>Click Me </ChakraButton>
          </div>
        </Stack>

        <Heading>
          These buttons are only overwriting the color modifier, but should still be able to be affected by the type modifier
        </Heading>
        <Stack direction='row' gap={6} justify='center'>
          <ModifierProvider modifiers={{ color: 'blue' }}>
            <ChakraButton>Click Me </ChakraButton>
          </ModifierProvider>
          <ModifierProvider modifiers={{ color: 'green' }}>
            <ChakraButton>Click Me </ChakraButton>
          </ModifierProvider>
          <ModifierProvider modifiers={{ color: 'purple' }}>
            <ChakraButton>Click Me </ChakraButton>
          </ModifierProvider>


        </Stack>
      </Stack>


    </ModifierProvider>


  </ChakraBaseProvider>

};

export default Index;
