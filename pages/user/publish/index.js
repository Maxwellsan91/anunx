import {
    Box,
    Button,
    Container,
    FormControl,
    Select,
    Typography,
    InputLabel,
    InputAdornment,
    MenuItem,
    FormHelperText,
    Input,
    CircularProgress,
} from '@material-ui/core'
import { Formik } from 'formik'


import TemplateDefault from '../../../src/templates/Default'
import FileUpload from '../../../src/components/FileUpload'
import { initialValues, validationSchema } from './formValues'
import useToasty from '../../../src/contexts/Toasty'
import { useRouter } from 'next/router'
import useStyles from './styles'
import axios from 'axios'
import { getSession } from 'next-auth/client'


const Publish = ({ userId, image }) => {
    const classes = useStyles()
    const {setToasty} = useToasty()
    const router = useRouter()

    const formValues = {
        ...initialValues,
    }
    formValues.userId = userId;
    formValues.image = image;
       
    const handleSuccess = () => {
        setToasty({
            open: true,
            Text: 'Anúncio cadastrado com sucesso.',
            severity: 'success'
        })

        router.push('/user/dashboard')
    }

    const handleError = () => {
        setToasty({
            open: true,
            Text: 'Ocorreu um erro, tente novamente',
            severity: 'success'
        })

        router.push('/user/dashboard')
    }
    

    const handleSubmit = async (values) => {
        const formData = new FormData()

        for (let field in values) {
            if (field === 'files') {
                values.files.forEach(file => {
                    formData.append('files', file)
                })
            } else {
                formData.append(field, values[field])
            }
        }
        
        
        axios.post('/api/products', formData)
        .then(handleSuccess)
        .catch(handleError)
    }
    
    return (
        <TemplateDefault>
            <Formik 
                initialValues={formValues}
                validationSchema={validationSchema}
                    onSubmit={handleSubmit}
            >
                {
                    ({
                        touched,
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                        isSubmitting,
                    }) => {     
                        return (
                        <form onSubmit={handleSubmit}>
                            <Input type="hidden" name="userId" value={values.userId} />
                            <Input type="hidden" name="image" value={values.image} />

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
                                    <FileUpload 
                                        files={values.files}
                                        errors={errors.files}
                                        touched={touched.files}
                                        setFieldValue={setFieldValue}
                                    />
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

                                <FormControl error={errors.email && touched.email} fullWidth>
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
                                {
                                    isSubmitting
                                        ? <CircularProgress className={classes.loading} />
                                        : <Button type="submit" variant="contained" color="primary"> Publicar Anúncio</Button> 
                                }
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

Publish.requireAuth = true

export async function getServerSideProps({ req }) {
    const { user, userId } = await getSession({ req });

    return {
      props: {
        userId: userId,
        image: user.image,
      },
    };
  }

export default Publish