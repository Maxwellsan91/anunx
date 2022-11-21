import {
    Container,
    Grid,
    IconButton,
    InputBase,
    Paper,
    Typography,
    Button, 
    Card,
    CardActions,
    CardMedia,
    CardContent,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/search'
import TemplateDefault from '../src/templates/Default'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    searchContainer: {
        padding: theme.spacing(8, 10, 6)
    },
    searchBox: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(0, 2),
        marginTop: 20,
    },
    cardMedia: {
        paddingTop: '56%'
    },
}))


const Home = () => {

    const classes = useStyles()
    return (
        <TemplateDefault>
            <Container maxWidth="md" className={classes.searchContainer} >
                <Typography component="h1" align="center" variant="h3" color="textPrimary">
                    O que deseja encontrar?
                </Typography>
                <Paper className={classes.searchBox}>
                    <InputBase 
                        placeholder='Ex.: Iphone 12 Plus'
                        fullWidth
                    />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </Paper>
            </Container>

            <Container maxWidth="md" className={classes.cardGrid} >
                <Typography component="h2" align="center" variant="h4" color="textPrimary">
                    Destaques
                </Typography>
                <br />
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                        <CardMedia
                            className={classes.cardMedia}
                            image={'https://source.unsplash.com/random'}
                            title="Titulo da Imagem"                
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                            Produto X
                            </Typography>
                            <Typography>
                            R$ 60,00 
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                        <CardMedia
                            className={classes.cardMedia}
                            image={'https://source.unsplash.com/random'}
                            title="Titulo da Imagem"                
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                            Produto X
                            </Typography>
                            <Typography>
                            R$ 60,00 
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                        <CardMedia
                            className={classes.cardMedia}
                            image={'https://source.unsplash.com/random'}
                            title="Titulo da Imagem"                
                        />
                        <CardContent>
                            <Typography variant="h5" component="h2">
                            Produto X
                            </Typography>
                            <Typography>
                            R$ 60,00 
                            </Typography>
                        </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default Home