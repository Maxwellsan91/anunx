import TemplateDefault from '../../../src/templates/Default'
import { Formik } from 'formik'

import {
    Box,
    Button,
    Container,
    FormControl,
    Select,
    Typography,
    InputLabel,
    InputAdornment,
    FormHelperText,
    Input,
} from '@material-ui/core'

import { initialValues, validationSchema } from './formValues'
import useStyles from './style'



const Signup = () => {
    const classes = useStyles()

    return(
        <TemplateDefault>
            <Container maxWidth="sm" component="main" className={classes.container}>
                <Typography component="h1" variant="h2" align="center" color="textPrimary">
                     Crie sua conta
                </Typography>
                <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    e anúncie para todo o Brasil!
                </Typography>

                <Container maxWidth="md">
                    <Box className={classes.box}>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(values) =>{
                                console.log('ok, Enviado', values)
                            }}
                        >
                            {
                                ({
                                    touched,
                                    values,
                                    errors,
                                    handleChange,
                                    handleSubmit,
                                }) => {
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <FormControl fullWidth error={errors.name && touched.name} className={classes.formControl}>
                                                <InputLabel>Nome</InputLabel>
                                                    <Input 
                                                        name="name"
                                                        value={values.name}
                                                        onChange={handleChange}
                                                    />
                                                <FormHelperText>
                                                    { errors.name && touched.name ? errors.name : null}
                                                </FormHelperText>
                                            </FormControl>

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

                                            <FormControl error={errors.passwordConf && touched.passwordConf} fullWidth>
                                                <InputLabel>Confirmação da senha</InputLabel>
                                                    <Input 
                                                        name="passwordConf"
                                                        type='password'
                                                        value={values.passwordConf}
                                                        onChange={handleChange}
                                                    />
                                                <FormHelperText>
                                                    { errors.passwordConf && touched.passwordConf ? errors.passwordConf : null}
                                                </FormHelperText>
                                            </FormControl>

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

export default Signup