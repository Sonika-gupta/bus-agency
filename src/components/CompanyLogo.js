import { Typography } from '@material-ui/core'

const style = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '10px',
  height: '70px'
}

export default function CompanyLogo () {
  return (
    <div style={style}>
      <Typography
        variant='h4'
        color='primary'
        // style={{ margin: '10px auto', lineHeight: '70px' }}
      >
        PROJECT A1
      </Typography>
    </div>
  )
}
