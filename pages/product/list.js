import {
    Container,
    Typography,
    Box,
    Grid,
    IconButton,
    Paper,
    InputBase

} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core'
import TemplateDefault from '../../src/templates/Default'
import Card from '../../src/components/Cards'
import Cards from '../../src/components/Cards'


const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    searchBox: {

    },
    imputSearch: {

    },
    imputSearch: {

    }
}))


const List = () => {
    const classes = useStyles()
    return (
        <TemplateDefault>
            <Container className={classes.cardGrid} maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={12}>
                        <Paper component="form" className={classes.searchBox}>
                            <InputBase 
                            className={classes.imputSearch}
                            placeholder="Ex Iphone XS 128G"
                            fullWidth
                            />
                            <IconButton type="submit" className={classes.buttonSearch} arial-label="search">
                                <SearchIcon />
                            </IconButton>
                        </Paper>
                    </Grid>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Box className={classes.box}>
                        <Typography component="h6" variant="h6">
                            Anúncios
                        </Typography>
                        <Typography component="span" variant="subtitle2">
                            Encontrado 200 anúncios
                        </Typography>
                    </Box>
                </Grid>
                <br/><br/>
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

export default List