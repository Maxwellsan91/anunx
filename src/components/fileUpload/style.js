import { makeStyles } from '@material-ui/core'



const useStyles = makeStyles((theme) => ({
    mask: {},
    mainImage: {},
    
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

export default useStyles