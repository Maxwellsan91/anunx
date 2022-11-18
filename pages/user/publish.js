import { Box, Button, Container, Select, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core'

import TemplateDefault from '../../src/templates/Default'

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(8,0,6)
    }, 
    boxContainer: {
        paddingBottom: theme.spacing(3)
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3)
    }
}))


const Publish = () => {
    const classes = useStyles()

    return (
        <TemplateDefault>
            <Container maxWidth="sm" className={classes.container}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Publicar Anúncio
                </Typography>
                <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    Quanto mais detalhado melhor
                </Typography>
            </Container>

            <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                        Título do Anúncio
                    </Typography>
                    <TextField
                        label="ex.: Bicicleta Aro 18"
                        size="small"
                        fullWidth
                    />
                    <br /><br />
                    <Typography component="h6" variant="h6" color="textPrimary">
                        Categoria
                    </Typography>
                    <Select
                    native
                    value=""
                    fullWidth
                    onChange={() => {}}
                    inputProps={{
                        name: 'age',
                    }}
                    >
                        <option value="">Selecione</option>
                        <option value={1}>Agricultura</option>
                        <option value={2}>Bebê e Criança</option>
                        <option value={3}>Carro</option>
                        <option value={4}>Celular e Tablets</option>
                        <option value={5}>Equipamentos Elétricos</option>
                        <option value={6}>Emprego</option>
                        <option value={7}>Imóveis</option>
                        <option value={8}>Lazer</option>
                        <option value={9}>Móveis, Casa, Jardim</option>
                        <option value={10}>Moda</option>
                        <option value={11}>Tecnologia</option>
                        <option value={12}>Outros</option>
                    </Select>
                </Box>
            </Container>

            <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                <Typography component="h6" variant="h6" color="textPrimary">
                    Imagens
                </Typography>
                <Typography component="div" variant="body2" color="textPrimary">
                    A primeira imagem é a foto principal do seu anúncio.
                </Typography>
                </Box>
            </Container>

            <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                <Typography component="h6" variant="h6" color="textPrimary">
                    Descrição 
                </Typography>
                <Typography component="div" variant="body2" color="textPrimary">
                    Escreva os detalhes do que está vendendo.
                </Typography>
                <TextField 
                    multiline
                    rows={6}
                    variant="outlined"
                    fullWidth
                />
                </Box>
            </Container>

            <Container maxWidth="md" className={classes.boxContainer}>
                <Box className={classes.box}>
                <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                    Dados de contato 
                </Typography>
                <TextField 
                    label="Nome"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <br /> <br />
                <TextField 
                    label="E-mail"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <br /> <br />
                <TextField 
                    label="Telefone"
                    variant="outlined"
                    size="small"
                    fullWidth
                />
                <br /> <br />
                </Box>
            </Container>

            <Container maxWidth="md" className={classes.boxContainer}>
            <Box textAlign="right">
                <Button variant="contained" color="primary">
                    Publicar anúncio
                    </Button>
            </Box>
            </Container>    

            

        </TemplateDefault>
    )
}

export default Publish