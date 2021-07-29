import { useState } from 'react'
import {
  Card,
  CardActionArea,
  CardContent,
  Collapse,
  Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  card: {
    margin: '5px auto',
    width: '100%',
    backgroundColor: '#fafafa',
    color: theme.palette.text.secondary
  },
  middle: {
    width: '60%',
    textAlign: 'left'
  },
  rightDetails: {
    margin: '5px'
  }
}))

export default function BusCard ({ bus }) {
  const [expand, setExpand] = useState(false)
  const classes = useStyles()
  return (
    <Card className={classes.card}>
      <CardActionArea
        style={{ display: 'flex' }}
        onClick={() => setExpand(!expand)}
      >
        <CardContent className={classes.leftDetails}>
          <Typography variant='body2'>{bus.busNumber}</Typography>
          <Typography variant='overline'>{bus.busName}</Typography>
        </CardContent>
        <CardContent className={classes.middle}>
          <Typography variant='h6'>{bus.source}</Typography>
          <Typography variant='subtitle1'>{bus.duration}</Typography>
          <Typography variant='h6'>{bus.destination}</Typography>
        </CardContent>
        <CardContent className={classes.rightDetails}>
          <Typography variant='h5'>&#8377;{bus.seatFare}/-</Typography>
        </CardContent>
      </CardActionArea>
      <Collapse in={expand} timeout='auto' unmountOnExit>
        Expanded
      </Collapse>
    </Card>
  )
}
