import { useState, useEffect } from 'react'
import { Container, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { getBuses } from '../api'
import BusList from './BusList'

const useStyles = makeStyles({
  actionPanel: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '20px'
  }
})

export default function Buses () {
  const [buses, setBuses] = useState([])
  const classes = useStyles()

  console.log(buses)
  useEffect(() => {
    ;(async () => {
      setBuses(await getBuses())
    })()
  }, [])

  return (
    <>
      <Container className={classes.actionPanel}>
        <Button color='primary' variant='contained'>
          Add Bus
        </Button>
      </Container>
      <BusList buses={buses} />
    </>
  )
}
