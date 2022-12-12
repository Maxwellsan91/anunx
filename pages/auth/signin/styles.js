import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    container: {
        marginBottom: 35,
    },
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
    },
    formControl: {
        marginBottom: theme.spacing(1)
    },
    submit: {
        margin: theme.spacing(3,0,2)
    },
    loading: {
        display: 'block',
        margin: '10px auto',
    }
}))

export default useStyles