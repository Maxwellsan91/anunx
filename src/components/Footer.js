import { Box, Container, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import Link from "next/link"

const useStyles = makeStyles((theme) => ({
    footer: {
        borderTop: '1px solid',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),

        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(10),
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
        }

    },
    linkAnc: {
        textDecorationLine: 'none',
      }
}))

const Footer = () => {
    const classes = useStyles()

    return (
        <Container maxWidth="lg" component="footer" className={classes.footer}>
            <Grid container spacing={3}>
                <Grid item xs={6} sm={3} >
                    <Box textAlign="center">
                        <Link href="#" passHref className={classes.linkAnc}>
                            <Typography color="textSecondary" variant="subtitle1">Ajuda e Contato</Typography>
                        </Link> 
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3} >
                    <Box textAlign="center">
                    <Link href="#" passHref className={classes.linkAnc}>
                            <Typography color="textSecondary" variant="subtitle1">Dicas de segurança</Typography>
                        </Link>                        
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3} >
                    <Box textAlign="center">
                    <Link href="#" passHref className={classes.linkAnc}>
                            <Typography color="textSecondary" variant="subtitle1">Anunciar e Vender</Typography>
                        </Link>                        
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3} >
                    <Box textAlign="center">
                    <Link href="#" passHref className={classes.linkAnc}>
                            <Typography color="textSecondary" variant="subtitle1">Plano Profissional</Typography>
                        </Link>                        
                    </Box>
                </Grid>
            </Grid>
        </Container>
    )
}

export default Footer