
import {Flex, useBreakpointValue, IconButton, Icon} from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { Logo } from './Logo';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';


export function Header() {
  
  const isWebVersion = useBreakpointValue({
    base: false,
    lg: true,
  });
  
  const { onOpen } = useSidebarDrawer();

  return(
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >

      {! isWebVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine}/>}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"

        >

        </IconButton>
      )}
      <Logo/>

      {isWebVersion && 
        <SearchBox/>
      }

      <Flex
        align="center"
        ml="auto"
      >
        
      <NotificationsNav/>
      <Profile showProfileData={isWebVersion}/>
      </Flex>
    </Flex>
  )
}