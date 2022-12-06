import {
    Box,
    Button,
    Container,
    FormControl,
    IconButton,
    Select,
    TextField,
    Typography,
    InputLabel,
    OutlinedInput,
    InputAdornment
} from '@material-ui/core'
import { Formik } from 'formik'
import * as yup from 'yup'

import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'


import TemplateDefault from '../../src/templates/Default'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    mask: {},
    mainImage: {},
    boxContainer: {
        paddingBottom: theme.spacing(3)
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3)
    },
    thumbsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        marginTop: '12px'
    },
    dropzone: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
        margin: '0 15px 15px 0',
        width: 200,
        height: 200,
        backgroundColor: theme.palette.background.default,
        border: '2px dashed black'
    }, 
    thumb: {
        position: 'relative',
        width: 200,
        height: 200,
        margin: '0 15px 15px 0',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',

        '& $mainImage': {
            backgroundColor: 'rgb(0, 157, 255)',
            padding: '6px 10px',
            position: 'absolute',
            bottom: 0,
            left: 0,
        },

        '&:hover $mask': {
            display: 'flex'
        },

        '& $mask': {
            display: 'none',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            width: '100%',
            height: '100%',            
        }
    }
}))

const validationSchema = yup.object().shape({
    title: yup.string()
        .min(6, 'Escreva um título maior')
        .max(100, 'Título muito grande')
        .required('Campo obrigatório'),
    
})

const Publish = () => {
    const classes = useStyles()
    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptFile) => {
            const newFiles = acceptFile.map(file => {
                return Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })
            })
            
            setFiles([
                ...files,  
                ...newFiles,
            ])           
        }
    })

    const handleRemoveFile = fileName => {
        const newFileState = files.filter(file => file.name !== fileName)
        setFiles(newFileState)
    }

    return (
        <TemplateDefault>
            <Formik 
                initialValues={{
                    title: ''
                }}
                validationSchema={validationSchema}
                    onSubmit={(values) => {

                    }}
            >
                {
                    ({
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                    }) => {
                        return (
                        <form onSubmit={handleSubmit}>
                            <Container maxWidth="sm" >
                                <Typography component="h1" variant="h2" align="center" color="textPrimary">
                                    Publicar Anúncio
                                </Typography>
                                <Typography component="h5" variant="h5" align="center" color="textPrimary">
                                    Quanto mais detalhado melhor
                                </Typography>
                            </Container>
                            <br/><br/>
                            <Container maxWidth="md" className={classes.boxContainer}>
                                <Box className={classes.box}>
                                    <Typography component="h6" variant="h6" color="textPrimary">
                                        Título do Anúncio
                                    </Typography>
                                    <TextField
                                        name="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        label="ex.: Bicicleta Aro 18"
                                        size="small"
                                        fullWidth
                                        error={errors.title}
                                        helperText={errors.title}
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
                                <Box className={classes.thumbsContainer}>
                                    <Box className={classes.dropzone} {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <Typography variant='body2' color='textPrimary'>
                                            Clique para adicionar ou arraste a imagem para aqui.
                                        </Typography>
                                    </Box>
                
                                    {
                                        files.map((file, index) => (
                                            <Box 
                                                key={file.name}
                                                className={classes.thumb}
                                                style={{ backgroundImage: `url(${file.preview})` }}
                                                >
                                                    {/* definir primeira imagem como principal */}
                                                    {
                                                        index === 0 ? 
                                                        <Box className={classes.mainImage}>
                                                        <Typography variant='body2' color='secundary'>
                                                            Principal
                                                        </Typography>
                                                    </Box>
                                                    : null
                                                    }
                                                    
                                                    <Box className={classes.mask}>
                                                        <IconButton color='secondary' onClick={() => handleRemoveFile(file.name)} >
                                                        <DeleteForever fontSize='large'/>
                                                        </IconButton>
                                                    </Box>
                                            </Box>
                                        ))
                                    }
                                        
                                    </Box>
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
                                <Typography component="h6" variant="h6" color="textPrimary">
                                    Preço 
                                </Typography>
                                <br />
                                <FormControl fullWidth variant='outline'>
                                    <InputLabel>Valor</InputLabel> 
                                    <OutlinedInput 
                                        onChange={() => {}}
                                        startAdornment={<InputAdornment position='start'>R$</InputAdornment>}
                                        labelWidth={40}
                                    />
                                </FormControl>
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
                                <Button type="submit" variant="contained" color="primary">
                                    Publicar anúncio
                                    </Button>
                            </Box>
                            </Container> 
                        </form>
                        )
                    }
                }
                

            </Formik>
        </TemplateDefault>
    )
}

export default Publish