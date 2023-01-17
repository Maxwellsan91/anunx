import Link from 'next/link'
import slugyfy from 'slugify'
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
import dbConnect from '../src/utils/dbConnect'
import ProductsModel from '../src/models/products'
import { formatCurrency } from '../src/utils/currency'

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
    },
    linkAnc: {
    textDecorationLine: 'none',
  }
}))


const Home = ({ products }) => {

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
                    {
                        products.map(product => {
                            const category = slugyfy(product.category).toLowerCase()
                            const title = slugyfy(product.title).toLowerCase()

                            return (
                                <Grid key={product._id} item xs={12} sm={6} md={4}>
                                    <Link href={`/${category}/${title}/${product._id}`} passHref className={classes.linkAnc}>    
                                        {/* <a> */}
                                            <Cards
                                            image = {`/uploads/${product.files[0].name}`}
                                            title = {product.title}
                                            subtitle= {formatCurrency(product.price)}
                                            />
                                        {/* </a> */}
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

export async function getServerSideProps() {
    await dbConnect()     

    const products = await ProductsModel.aggregate([{
        $sample: { size: 6 }        
    }])

    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}

export default Home