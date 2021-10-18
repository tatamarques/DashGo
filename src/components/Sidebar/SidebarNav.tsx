import {Stack} from '@chakra-ui/react';

import { NavSection } from "./NavSection";
import { NavLink } from "./NavLink";
import { RiContactsLine, RiDashboardLine, RiGitMergeLine, RiInputMethodLine } from 'react-icons/ri';

export function SidebarNav() {
  
  return(
    <Stack spacing="12" align="flex-start">
      <NavSection title="GENERAL">
        <NavLink icon={RiDashboardLine} href="/dashboard"> Dashboard </NavLink>
        <NavLink icon={RiContactsLine}href="/users"> Users </NavLink>
      </NavSection>
      <NavSection title="AUTOMATION">
        <NavLink icon={RiGitMergeLine} href="/automation"> Automation </NavLink>
        <NavLink icon={RiInputMethodLine} href="/form"> Form </NavLink>
      </NavSection>  
    </Stack>
  )
}