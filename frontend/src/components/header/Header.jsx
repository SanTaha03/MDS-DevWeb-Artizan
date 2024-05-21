import Button from '../forms/buttons/Button'
import profileImage from '../../assets/icon-luffy.jpeg'
import './Header.css'
import { Navbar, NavbarBrand, NavbarContent, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu } from '@nextui-org/react'

function Header () {
  return (
    <header className='main'>
      <nav>
        <a href='/'>Accueil</a>
        <a href='/artisans'>Artisans</a>
        <a href='/about'>About</a>
        <a href='/services'>Services</a>
        <a href='/contact'>Contact</a>
      </nav>

      <a href='/authentication'>
        <Button>
          Connexion
        </Button>
      </a>
      <Navbar>
        <NavbarBrand />
        <NavbarContent className='hidden sm:flex gap-4' justify='center'>
          <NavbarContent as='div' justify='end'>
            <Dropdown placement='bottom-end' isDisabled>
              <DropdownTrigger>
                <div className='profile-image-container'>
                  <img src={profileImage} alt='Profile' className='profile-image' />
                </div>
              </DropdownTrigger>
              <DropdownMenu aria-label='Profile Actions' variant='flat'>
                <DropdownItem key='profile' href='/profil'>Mon Profil</DropdownItem>
                <DropdownItem key='team_settings'>Paramètres</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarContent>
        </NavbarContent>
      </Navbar>
    </header>
  )
}

export default Header
