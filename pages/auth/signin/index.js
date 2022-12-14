import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { signIn, session } from 'next-auth/client'

import {
    Box,
    Button,
    Container,
    FormControl,
    Typography,
    InputLabel,
    FormHelperText,
    Input,
    CircularProgress
} from '@material-ui/core'

import TemplateDefault from '../../../src/templates/Default'
import { initialValues, validationSchema } from './formValues'
import useToasty from '../../../src/contexts/Toasty'
import useStyles from './styles'
import { Alert } from '@material-ui/lab'



const Signin = () => {
    const classes = useStyles()
    const router = useRouter()
    const { setToasty } = useToasty()

    console.log(session, router)

    const handleFormSubmit = async values => {
        signIn('credentials', {
            email: values.email,
            password: values.password,
            callbackUrl: 'http://localhost:3000/user/dashboard',
        }) 
    }

    return(
        <TemplateDefault>
            <Container maxWidth="sm" component="main" className={classes.container}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary">
                     Entre na sua conta
                </Typography>
                
                <Container maxWidth="md">
                    <Box className={classes.box}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleFormSubmit}
                        >
                            {
                                ({
                                    touched,
                                    values,
                                    errors,
                                    handleChange,
                                    handleSubmit,
                                    isSubmitting,
                                }) => {
                                    return (
                                        <form onSubmit={handleSubmit}>
                                           {
                                           router.query.i === '1'
                                           ? (
                                            <Alert severity='error' className={classes.errorMessage}>
                                                Usuário ou Senha inválidos
                                            </Alert>
                                           )
                                           : null
                                           }
                                            <FormControl error={errors.email && touched.email} fullWidth>
                                                <InputLabel>Email</InputLabel>
                                                    <Input 
                                                        name="email"
                                                        type='email'
                                                        value={values.email}
                                                        onChange={handleChange}
                                                    />
                                                <FormHelperText>
                                                    { errors.email && touched.email ? errors.email : null}
                                                </FormHelperText>
                                            </FormControl>

                                            <FormControl error={errors.password && touched.password} fullWidth>
                                                <InputLabel>Senha</InputLabel>
                                                    <Input 
                                                        name="password"
                                                        type='password'
                                                        value={values.password}
                                                        onChange={handleChange}
                                                    />
                                                <FormHelperText>
                                                    { errors.password && touched.password ? errors.password : null}
                                                </FormHelperText>
                                            </FormControl>

                                            {
                                                isSubmitting
                                                ? (
                                                    <CircularProgress className={classes.loading} />
                                                ) : (
                                                <Button
                                                    type='submit'
                                                    fullWidth
                                                    variant='contained'
                                                    color='primary'
                                                    className={classes.submit}
                                                    // disabled={isSubmitting}
                                                > 
                                                    Cadastrar
                                                </Button>
                                                )

                                            }

                                        </form>
                                    )
                                }
                            }
                        </Formik>
                    </Box>
                </Container>               
            </Container>
        </TemplateDefault>
    )
}

export default Signin