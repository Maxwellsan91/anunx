import {
    Box,
    Button,
    Container,
    FormControl,
    IconButton,
    Select,
    Typography,
    InputLabel,
    InputAdornment,
    MenuItem,
    FormHelperText,
    Input,
} from '@material-ui/core'
import { Formik } from 'formik'
import * as yup from 'yup'

import { useDropzone } from 'react-dropzone'
import { makeStyles } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'


import TemplateDefault from '../../src/templates/Default'

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
    inputLabel: {
        fontWeight: 400,
        color: theme.palette.primary.main,
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
    
        category: yup.string()
            .required('Campo obrigatório'),

        description: yup.string()
            .min(50, 'Escreva uma descrição com no mínimo 50 caracteres')
            .required('Campo obrigatório'),

        price: yup.number()
            .required('Campo obrigatório'),
            
        email: yup.string()
            .email('Digite um email válido')
            .required('Campo obrigatório'),
            
        name: yup.string()
        .required('Campo obrigatório'),

        phone: yup.number()
            .required('Campo obrigatório'),

        files: yup.array()
            .min(1, 'Envie pelo menos uma imagem')
            .required('Campo obrigatório'),
    })

const Publish = () => {
    const classes = useStyles()
    
    return (
        <TemplateDefault>
            <Formik 
                initialValues={{
                    title: '',
                    category: '',
                    description: '',
                    price: '',
                    email: '',
                    name: '',
                    phone: '',
                    files: [],
                }}
                validationSchema={validationSchema}
                    onSubmit={(values) => {
                        console.log('ok', values)
                        
                    }}
            >
                {
                    ({
                        touched,
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => {

                        const { getRootProps, getInputProps } = useDropzone({
                            accept: 'image/*',
                            onDrop: (acceptFile) => {
                                const newFiles = acceptFile.map(file => {
                                    return Object.assign(file, {
                                        preview: URL.createObjectURL(file)
                                    })
                                })
                                
                                // setFieldValue('nome', 'valor')
                                setFieldValue('files',[
                                    ...values.files,  
                                    ...newFiles,
                                ])           
                            }
                        })
                    
                        const handleRemoveFile = fileName => {
                            const newFileState = values.files.filter(file => file.name !== fileName)
                            setFieldValue('files', newFileState)
                        }                    


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
                                                                     
                                    <FormControl error={errors.title && touched.title} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Título do Anúncio</InputLabel>
                                        <Input
                                            name="title"
                                            value={values.title}
                                            onChange={handleChange}    
                                            label="ex.: Bicicleta aro 21" 
                                        /> 
                                        <FormHelperText>
                                            { errors.title  && touched.title ? errors.title : null}
                                        </FormHelperText>
                                    </FormControl>

                                    <br /><br />
                                    <FormControl error={errors.category && touched.category} fullWidth >
                                    <InputLabel className={classes.inputLabel}>Categoria</InputLabel>
                                        <Select
                                        name="category"
                                        value={values.category}
                                        fullWidth
                                        onChange={handleChange}                                    
                                        >
                                            <MenuItem value={"Agricultura"}>Agricultura</MenuItem>
                                            <MenuItem value={"Bebê e Criança"}>Bebê e Criança</MenuItem>
                                            <MenuItem value={"Carro"}>Carro</MenuItem>
                                            <MenuItem value={"Celular e Tablets"}>Celular e Tablets</MenuItem>
                                            <MenuItem value={"Equipamentos Elétricos"}>Equipamentos Elétricos</MenuItem>
                                            <MenuItem value={"Emprego"}>Emprego</MenuItem>
                                            <MenuItem value={"Imóveis"}>Imóveis</MenuItem>
                                            <MenuItem value={"Lazer"}>Lazer</MenuItem>
                                            <MenuItem value={"Móveis, Casa, Jardim"}>Móveis, Casa, Jardim</MenuItem>
                                            <MenuItem value={"Moda"}>Moda</MenuItem>
                                            <MenuItem value={"Tecnologia"}>Tecnologia</MenuItem>
                                            <MenuItem value={"Outros"}>Outros</MenuItem>
                                        </Select>
                                        <FormHelperText>
                                            { errors.category && touched.category ? errors.category : null}
                                        </FormHelperText>
                                    </FormControl>                                    
                                </Box>
                            </Container>
                
                            <Container maxWidth="md" className={classes.boxContainer}>
                                <Box className={classes.box}>
                                <Typography component="h6" variant="h6" color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                                    Imagens
                                </Typography>
                                <Typography component="div" variant="body2" color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                                    A primeira imagem é a foto principal do seu anúncio.
                                </Typography>
                                {
                                    errors.files
                                    ? <Typography variant="body2" color="error" gutterBottom>{errors.files}</Typography>
                                    : null

                                }
                                <Box className={classes.thumbsContainer}>
                                    <Box className={classes.dropzone} {...getRootProps()}>
                                        <input name="files" {...getInputProps()} />
                                        <Typography variant='body2' color={errors.files && touched.files ? 'error' : 'textPrimary'}>
                                            Clique para adicionar ou arraste a imagem para aqui.
                                        </Typography>
                                    </Box>
                
                                    {
                                        values.files.map((file, index) => (
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
                                <FormControl error={errors.description && touched.description} fullWidth>
                                <InputLabel className={classes.inputLabel}>Escreva os detalhes do que está vendendo.</InputLabel>
                                    <Input 
                                        name="description"
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                        onChange={handleChange}
                                    />
                                    <FormHelperText>
                                        { errors.description && touched.description ? errors.description : null}
                                    </FormHelperText>
                                </FormControl>
                                </Box>
                            </Container>
                
                            <Container maxWidth="md" className={classes.boxContainer}>
                                <Box className={classes.box}>                                
                                <FormControl error={errors.price && touched.price} fullWidth>
                                <InputLabel className={classes.inputLabel}>Preço de venda</InputLabel>
                                    <Input 
                                        name="price"
                                        variant="outlined"
                                        onChange={handleChange}
                                        startAdornment={<InputAdornment position='start'>R$</InputAdornment>}
                                    />
                                    <FormHelperText>
                                        { errors.price && touched.price ? errors.price : null}
                                    </FormHelperText>
                                </FormControl>                                
                                </Box>
                            </Container>
                
                            <Container maxWidth="md" className={classes.boxContainer}>
                                <Box className={classes.box}>
                                <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
                                    Dados de contato 
                                </Typography>
                                <FormControl error={errors.name && touched.name} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Nome</InputLabel>
                                        <Input
                                            name="name"
                                            value={values.name}
                                            onChange={handleChange}    
                                            label="ex.: Pedro Santos" 
                                        />
                                        <FormHelperText>
                                            { errors.name && touched.name ? errors.name : null}
                                        </FormHelperText>
                                    </FormControl>
                                <br /> <br />

                                <FormControl error={errors.email && touched.mail} fullWidth>
                                        <InputLabel className={classes.inputLabel}>E-mail</InputLabel>
                                        <Input
                                            name="email"
                                            value={values.email}
                                            onChange={handleChange}    
                                            label="ex.: pedro@mail.com" 
                                        />
                                        <FormHelperText>
                                            { errors.email && touched.email ? errors.email : null}
                                        </FormHelperText>
                                    </FormControl>
                                <br /> <br />

                                <FormControl error={errors.phone && touched.phone} fullWidth>
                                        <InputLabel className={classes.inputLabel}>Telefone</InputLabel>
                                        <Input
                                            name="phone"
                                            value={values.phone}
                                            onChange={handleChange}    
                                            label="ex.: (XX) XXXXX-XXXX" 
                                        />
                                        <FormHelperText>
                                            { errors.phone && touched.phone ? errors.phone : null}
                                        </FormHelperText>
                                    </FormControl>
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