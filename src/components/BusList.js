import { makeStyles } from '@material-ui/core/styles'
import { Container } from '@material-ui/core'
import BusCard from './BusCard'

const useStyles = makeStyles({
  root: {
    width: '100%'
  },
  actionPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 20
  }
})

export default function BusList ({ buses }) {
  console.log(buses)
  const classes = useStyles()
  return (
    <Container className={classes.root}>
      {buses.map(bus => (
        <BusCard key={bus.bus_number} bus={bus}></BusCard>
      ))}
    </Container>
  )
}
