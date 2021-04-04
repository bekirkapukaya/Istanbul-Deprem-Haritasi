import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText,
} from 'reactstrap';

const Header = () => {
  return (
    <Navbar color="dark" dark expand="xl" style={{ width: '100%' }}>
      <NavbarBrand href="#">İstanbul Deprem Haritası</NavbarBrand>
      <Collapse navbar>
        <Nav className="mr-auto" navbar>
          <NavItem>
            <NavLink href="#"></NavLink>
          </NavItem>
        </Nav>
        <NavbarText></NavbarText>
      </Collapse>
    </Navbar>
  );
};

export default Header;
