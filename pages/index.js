import {
    Container,
    Grid,
    IconButton,
    InputBase,
    Paper,
    Typography,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/search'
import TemplateDefault from '../src/templates/Default'
import Cards from '../src/components/Cards'

import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles((theme) => ({
    searchBox: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing(0, 2),
        marginTop: 20,
    },
    cardGrid: {
        marginTop: 50,
    }
}))


const Home = () => {

    const classes = useStyles()
    return (
        <TemplateDefault>
            <Container maxWidth="md" >
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

                <Container maxWidth="lg" className={classes.cardGrid} >
                        <Typography component="h2" align="center" variant="h4" color="textPrimary">
                            Destaques
                        </Typography>
                        <br />
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Cards
                        image = {'https://source.unsplash.com/random'}
                        title = "Produto X"
                        subTitle = "R$ 60,00"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Cards
                        image = {'https://source.unsplash.com/random'}
                        title = "Produto X"
                        subTitle = "R$ 60,00"
                        />                    
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                        <Cards
                        image = {'https://source.unsplash.com/random'}
                        title = "Produto X"
                        subTitle = "R$ 60,00"
                        />                   
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default Home