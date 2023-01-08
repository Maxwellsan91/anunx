import React from 'react';
import { signOut, useSession } from 'next-auth/client';
import { useState } from 'react'

import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import { 
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Avatar,
  Divider,
  Menu,
  MenuItem,
 } from '@material-ui/core';

 import { AccountCircle, MenuIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  userName: {
    marginLeft: 7,
  },
  divider: {
    margin: '8px 0'
  },
  linkAnc: {
    textDecorationLine: 'none',
  }
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const [anchorUserMenu, setAnchorUserMenu] = useState(false)
  const [ session ] = useSession()

  const openUserMenu = Boolean(anchorUserMenu)

  return (
    <>
        <AppBar position="static" elevation={3}>
          <Container maxWidth="lg" >
            <Toolbar> 
              <Typography variant="h6" className={classes.title}>
                AnunX
              </Typography>
              <Link href={session ? '/user/publish' : '/auth/signin'} passHref className={classes.linkAnc} >
                <Button color="secondary" variant="outlined">
                  Anunciar e Vender
                </Button>
              </Link>
              { 
                session
                ?  (
                    <IconButton color="secondary" onClick={(e) => setAnchorUserMenu(e.currentTarget)} >
                      {
                        session.user.image
                          ? <Avatar src={session.user.image} />
                          : <AccountCircle />
                      }
                      <Typography variant="subtitle2" color="secondary" className={classes.userName}>
                        {session.user.name}
                      </Typography>
                    </IconButton>
                ) : null
              }

              <Menu
              anchorEl={anchorUserMenu}
                open={openUserMenu}
                onClose={() => setAnchorUserMenu(null)}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <Link href="/user/dashboard" passHref>
                  <MenuItem>Meus anúncios</MenuItem>
                </Link>
                <Link href="/user/publish" passHref>
                  <MenuItem>Publicar novo anúncio</MenuItem>               
                </Link>
                <Divider className={classes.divider}/>
                <MenuItem onClick={() => signOut({
                  callbackUrl: '/'
                })} >Sair</MenuItem>
              </Menu>
            </Toolbar>
          </Container>
        </AppBar>      
    </>
  );
}
