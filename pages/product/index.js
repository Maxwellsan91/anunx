import {
    Avatar,
    Box,
    Card,
    CardHeader,
    CardMedia,
    Chip,
    Container,
    Grid,
    Typography
} from '@material-ui/core'
import Carousel from 'react-material-ui-carousel'

import TemplateDefault from '../../src/templates/Default'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles ((theme) => ({
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom:theme.spacing(3),
    },
    productName: {
        margin: '15px 0'
    }, 
    price: {
        fontWeight: 'bold',
        marginBottom: 15,
    },
    card: {
        height: '100%'
    }, cardMedia: {
        paddingTop: '56%'
    }
  }))

const Product = () => {
    const classes = useStyles()
    return (
        <TemplateDefault>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box className={classes.box}>
                            <Carousel
                            autoPlay={false}
                            animation="slide"
                            navButtonsAlwaysVisible
                            navButtonsProps={{
                                style: {
                                    color: 'white'
                                }
                            }}
                            >
                                <Card className={classes.card}>
                                    <CardMedia 
                                    className={classes.cardMedia}
                                    image="https://source.unsplash.com/random?a=1"
                                    title="Título da imagem"
                                    />
                                </Card>
                                <Card className={classes.card}>
                                    <CardMedia 
                                    className={classes.cardMedia}
                                    image="https://source.unsplash.com/random?a=3"
                                    title="Título da imagem"
                                    />
                                </Card>
                            </Carousel>
                        </Box>
                        <Box className={classes.box} textAlign="left">
                            <Typography component="span"variant="caption"> Publicado em 04 de Dezembro de 2022 </Typography>
                            <Typography component="h4"variant="h4" className={classes.productName} > Jaguar </Typography>
                            <Typography component="h4"variant="h4" className={classes.price} > R$ 50.000,00 </Typography>                 
                            <Chip label="Categoria" /> 
                        </Box>               
                        <Box className={classes.box} textAlign="left">
                            <Typography component="h6"variant="h6"> Descrição </Typography>
                            <Typography component="p"variant="body2"> 
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum massa nec tortor feugiat finibus. Vestibulum in interdum sapien, ac euismod orci. Integer condimentum maximus pretium. Mauris tempor ullamcorper dictum. Quisque vitae placerat ex, vitae consequat tortor. Nulla bibendum arcu odio. Nulla facilisi. Ut vel nunc tincidunt leo accumsan blandit. Nam sit amet diam ac elit congue dictum pellentesque quis magna. Vivamus facilisis nisl justo, a ultrices libero varius ac.      
                            </Typography>                        
                        </Box>
                    </Grid>   
                    <Grid item xs={4}>
                        <Card elevation={0} className={classes.box}>
                            <CardHeader 
                            avatar={
                                <Avatar>User</Avatar>
                            }
                            title="Maxwell Santos"
                            subheader="maxwell.str@hotmail.com"
                            />
                            <CardMedia 
                            image={'https://source.unsplash.com/random'}
                            title="Maxwell Santos"
                            />
                        </Card>
                        <Box className={classes.box}>
                            <Typography component="h6"variant="h6" > 
                            Localização
                            </Typography>
                        </Box>
                    </Grid>            
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default Product