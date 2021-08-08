import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import { Header, List, FormDialog } from './CommonComponents'
import OperatorForm from './OperatorForm'
import { operatorApi as api } from '../api'

const columns = [
  { key: 'type', title: 'Type' },
  { key: 'na', title: 'Operator Name' },
  {
    key: 'name',
    title: 'Full Name',
    render: operator => `${operator.fname} ${operator.lname}`,
    style: { textTransform: 'capitalize' }
  },
  { key: 'email', title: 'Email' },
  {
    key: 'isActive',
    title: 'Status',
    render: operator =>
      operator.isActive ? 'Active' : `Last Active on ${operator.lastActive}`
  }
]

export default function Operators () {
  const [operators, setOperators] = useState([])
  const [operator, setOperator] = useState({})
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState('add')

  function handleSubmit (e, operator) {
    e.preventDefault()
    operator.id ? editOperator(operator) : newOperator(operator)
  }

  function handleClose () {
    setOpen(false)
    setOperator({})
  }

  function handleEdit (e, operator) {
    setAction('edit')
    setOperator(operator)
    setOpen(true)
  }

  function onAdd () {
    setOpen(true)
    setAction('add')
  }

  async function editOperator (operator) {
    try {
      const updatedOperator = await api.updateOperator(operator)
      setOperators(
        operators.map(operator =>
          operator.id === updatedOperator.id ? updatedOperator : operator
        )
      )

      handleClose()
      window.alert(`Operator ${updatedOperator.name} Updated!`)
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  async function newOperator (operator) {
    try {
      const addedOperator = await api.addOperator(operator)
      setOperators([...operators, addedOperator])
      window.alert(`Operator ${addedOperator.name} Added! `)
      handleClose()
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  async function handleDelete (e, operator) {
    try {
      const consent = window.confirm(`Delete Operator ${operator.name}?`)
      if (consent) {
        const deletedOperator = await api.deleteOperator(operator)
        setOperators(
          operators.filter(operator => operator.id !== deletedOperator.id)
        )
        window.alert(`Operator ${deletedOperator.name} Deleted!`)
      }
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  console.log(operators)
  useEffect(() => {
    ;(async () => {
      setOperators(await api.getOperators())
    })()
  }, [])

  return (
    <>
      <Header heading='operators' onClick={onAdd} />
      <List
        rows={operators}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <FormDialog
        open={open}
        onClose={handleClose}
        title={`${action.toUpperCase()} SERVICE PROVIDER`}
        form={<OperatorForm handleSubmit={handleSubmit} />}
        actions={
          <>
            <Button variant='contained' onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              type='submit'
              form='busForm'
            >
              Submit
            </Button>
          </>
        }
      />
    </>
  )
}
