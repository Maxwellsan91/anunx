import Link from 'next/link'
import slugify from 'slugify'
import {
    Container,
    Typography,
    Box,
    Grid,
    IconButton,
    Paper,
    InputBase

} from '@material-ui/core'
import { formatCurrency } from '../../src/utils/currency'
import productsModel from '../../src/models/products'

import SearchIcon from '@material-ui/icons/Search'
import { makeStyles } from '@material-ui/core'
import TemplateDefault from '../../src/templates/Default'
import Cards from '../../src/components/Cards'


const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    searchBox: {

    },
    searchBox: {

    },
    imputSearch: {

    },
    linkAnc: {
    textDecorationLine: 'none',
  }
}))


const List = ( {products, q} ) => {
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
                            Encontrado {products.length} anúncios para o termo "{q}"
                        </Typography>
                    </Box>
                </Grid>
                <br/><br/>
                <Grid container spacing={4}>
                    {
                        products.map(product => {
                            const category = slugify(product.category).toLowerCase()
                            const title = slugify(product.title).toLowerCase()

                            return (
                                <Grid key={product._id} item xs={12} sm={6} md={4}>
                                    <Link href={`/${category}/${title}/${product._id}`} passHref className={classes.linkAnc}>    
                                            <Cards
                                            image = {`/uploads/${product.files[0].name}`}
                                            title = {product.title}
                                            subtitle= {formatCurrency(product.price)}
                                            />
                                    </Link>    
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps({ query }){
    const { q } = query

    const products = await productsModel.find({
        $or: [
            { title: 
                { 
                    $regex: q,
                    $options: 'i' 
                } 
            },
            {
                description: 
                { 
                    $regex: q,
                    $options: 'i' 
                }
            }
        ]
    })

    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
            q: q
        }
    }
}

export default List