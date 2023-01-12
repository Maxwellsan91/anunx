import { Box, IconButton, Typography } from '@material-ui/core'
import { DeleteForever } from '@material-ui/icons'
import { useDropzone } from 'react-dropzone'

import stylesUser  from './style'

const FileUpload = ({files, errors, touched, setFieldValue}) => {
    const classes = stylesUser()

    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        onDrop: (acceptFile) => {
            const newFiles = acceptFile.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
                }))
            
            // setFieldValue('nome', 'valor')
            setFieldValue('files',[
                ...files,  
                ...newFiles,
            ])           
        }
    })

    const handleRemoveFile = fileName => {
        const newFileState = files.filter(file => file.name !== fileName)
        setFieldValue('files', newFileState)
    } 
    return(
        <>
            <Typography component="h6" variant="h6" color={errors && touched ? 'error' : 'textPrimary'}>
                    Imagens
            </Typography>
            <Typography component="div" variant="body2" color={errors && touched ? 'error' : 'textPrimary'}>
                    A primeira imagem é a foto principal do seu anúncio.
            </Typography>
                {
                    errors
                        ? <Typography variant="body2" color="error" gutterBottom>{errors}</Typography>
                            : null
                }
                <Box className={classes.thumbsContainer}>
                    <Box className={classes.dropzone} {...getRootProps()}>
                        <input name="files" {...getInputProps()} />
                                <Typography variant='body2' color={errors && touched ? 'error' : 'textPrimary'}>
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
        </>
    )
}

export default FileUpload