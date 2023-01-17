import React from 'react';
import { useState } from 'react'
import {
  Button,
  Container,
  Grid,
  CardActions,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
}
from '@material-ui/core'

import { getSession } from 'next-auth/client'
import { makeStyles } from '@material-ui/core'
import axios from 'axios';

import dbConnect from '../../src/utils/dbConnect'
import ProductsModel from '../../src/models/products'
import TemplateDefault from '../../src/templates/Default'
import Cards from '../../src/components/Cards'
import { formatCurrency } from '../../src/utils/currency'
import useToasty from '../../src/contexts/Toasty'
import Link from 'next/link';

const useStyles = makeStyles ((theme) => ({
  buttonAdd: {
    margin: '30px auto',
    display: 'block',
  },
  linkAnc: {
    textDecorationLine: 'none',
  }
}))

const Home = ({ products }) => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const { setToasty } = useToasty()
  const [removedProducts, setRemovedProducts] = useState([])
  const [productId, setProductId] = useState()
  const classes = useStyles()

  const handleCloseModal = () => setOpenConfirmModal(false)

  const handleClickRemove = (productId) => {
    setProductId(productId),
    setOpenConfirmModal(true)
  }

  const handleConfirmRemove = () => {
    axios.delete('/api/products/delete', {
      data: {
        id: productId
      }
    }).then(handleSuccess)
    .catch(handleError)
  }

  const handleSuccess = () => {
    setOpenConfirmModal(false)
    setRemovedProducts([...removedProducts, productId])

    setToasty({
      open: true,
      severity: 'success',
      text: 'Anúncio deletado com sucesso'
    })

  }
  const handleError = () => {
    setToasty({
      open: true,
      severity: 'error',
      text: 'Ops, ocorreu um erro'
    })
  }

  // const Transition = React.forwardRef(function Transition(props, ref) {
  //   return <Slide direction="up" ref={ref} {...props} />;
  // })

  return(
    <TemplateDefault>
      <Dialog
        open={openConfirmModal}
        // TransitionComponent={Transition}
        // keepMounted
        onClose={handleCloseModal}
      >
        <DialogTitle>
          Deseja remover este anúncio?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar esta operação, não poderá mais regressar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancelar</Button>
          <Button onClick={handleConfirmRemove} autoFocus>
            Remover
          </Button>
        </DialogActions>
      </Dialog>

      <Container maxWidth="sm" >
        <Typography component='h1' variant='h2' align='center'>
          Meus Anúncios
        </Typography>
        <Link href={'/user/publish'} passHref className={classes.linkAnc}>
          <Button variant="contained" color="primary" className={classes.buttonAdd}>
            Publicar novo anúncio
          </Button>
        </Link>
      </Container>
      <Container maxWidth="md">
        {
          products.length === 0 && 
          <Typography component="div" variant="body1" align="center" color="textPrimary" gutterBottom>
            Nenhum anúncio publicado. 
          </Typography>
        }        
        <Grid container spacing={4}>
        {
        products.map((product) => {
            if (removedProducts.includes(product._id)) return null;
            return (
              <Grid key={product._id} item xs={12} sm={6} md={4}>
                <Cards
                  image={`/uploads/${product.files[0].name}`}
                  title={product.title}
                  subtitle={formatCurrency(product.price)}
                  actions={
                    <>
                      <CardActions>
                        <Button size="small" color="primary">
                          Editar
                        </Button>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => handleClickRemove(product._id)}
                        >
                          Remover
                        </Button>
                      </CardActions>
                    </>
                  }
                />
              </Grid>
            );
          })
          }
      </Grid>
      </Container>
    </TemplateDefault>
  )
}

Home.requireAuth = true

export async function getServerSideProps({ req }){
  const session = await getSession({ req })
  await dbConnect()
  
  const products = await ProductsModel.find({ 'user.id': session.userId })
  return{
    
     props: {      
        products: JSON.parse(JSON.stringify(products)),
     }
  }
}

export default Home