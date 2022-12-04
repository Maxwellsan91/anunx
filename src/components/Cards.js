import {
    Card as CardMUI,
    CardActions,
    CardContent,
    CardMedia,
    Typography
  }
  from '@material-ui/core'

  import { makeStyles } from '@material-ui/core/styles'


  const useStyles = makeStyles (() => ({
    cardMedia: {
      paddingTop: '56%'
    }
  }))
  


const Cards = ({image, title, subTitle, actions}) => {
    const classes = useStyles()
    return (
        <CardMUI>
              <CardMedia
                className={classes.cardMedia}
                image={image}
                title={title}                
              />
              <CardContent>
                <Typography variant="h5" component="h2">
                  {title}
                </Typography>
                <Typography>
                  {subTitle} 
                </Typography>
              </CardContent>
              {
                actions
                ? (
                    <CardActions>
                        {actions}
                    </CardActions>
                ) : null
              }

            </CardMUI>
    )
}

export default Cards