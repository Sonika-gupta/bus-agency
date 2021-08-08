import { useState, useEffect } from 'react'
import { Button } from '@material-ui/core'
import Header from './Header'
import List from './List'
import CustomDialog from './CustomDialog'
import ServiceProviderForm from './ServiceProviderForm'
import { serviceProviderApi as api } from '../api'

const columns = [
  { key: 'type', title: 'Type' },
  { key: 'na', title: 'ServiceProvider Name' },
  {
    key: 'name',
    title: 'Full Name',
    render: provider => `${provider.fname} ${provider.lname}`,
    style: { textTransform: 'capitalize' }
  },
  { key: 'email', title: 'Email' },
  {
    key: 'isActive',
    title: 'Status',
    render: provider =>
      provider.isActive ? 'Active' : `Last Active on ${provider.lastActive}`
  }
]

export default function ServiceProviders () {
  const [ServiceProviders, setServiceProviders] = useState([])
  const [provider, setServiceProvider] = useState({})
  const [open, setOpen] = useState(false)
  const [action, setAction] = useState('add')

  function handleSubmit (e, provider) {
    e.preventDefault()
    provider.id ? editServiceProvider(provider) : newServiceProvider(provider)
  }

  function handleClose () {
    setOpen(false)
    setServiceProvider({})
  }

  function handleEdit (e, provider) {
    setAction('edit')
    setServiceProvider(provider)
    setOpen(true)
  }

  function onAdd () {
    setOpen(true)
    setAction('add')
  }

  async function editServiceProvider (provider) {
    try {
      const updatedServiceProvider = await api.updateServiceProvider(provider)
      setServiceProviders(
        ServiceProviders.map(provider =>
          provider.id === updatedServiceProvider.id
            ? updatedServiceProvider
            : provider
        )
      )

      handleClose()
      window.alert(
        `ServiceProvider ${updatedServiceProvider.ServiceProvidername} Updated!`
      )
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  async function newServiceProvider (provider) {
    try {
      const addedServiceProvider = await api.addServiceProvider(provider)
      setServiceProviders([...ServiceProviders, addedServiceProvider])
      window.alert(
        `ServiceProvider ${addedServiceProvider.ServiceProvidername} Added! `
      )
      handleClose()
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  async function handleDelete (e, provider) {
    try {
      const consent = window.confirm(
        `Delete ServiceProvider ${provider.ServiceProvidername}?`
      )
      if (consent) {
        const deletedServiceProvider = await api.deleteServiceProvider(provider)
        setServiceProviders(
          ServiceProviders.filter(
            provider => provider.id !== deletedServiceProvider.id
          )
        )
        window.alert(
          `ServiceProvider ${deletedServiceProvider.ServiceProvidername} Deleted!`
        )
      }
    } catch (err) {
      window.alert(JSON.stringify(err).message)
    }
  }

  console.log(ServiceProviders)
  useEffect(() => {
    ;(async () => {
      setServiceProviders(await api.getServiceProviders())
    })()
  }, [])

  return (
    <>
      <Header
        heading='ServiceProviders/'
        action={{ title: 'ADD SERVICE PROVIDER', onClick: onAdd }}
      />
      <List
        rows={ServiceProviders}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <CustomDialog
        open={open}
        onClose={handleClose}
        title={`${action.toUpperCase()} SERVICE PROVIDER`}
        form={<ServiceProviderForm handleSubmit={handleSubmit} />}
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
