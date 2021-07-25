import React from 'react'
import { RegistrationForm } from './ui/registration-form/registration-form.component'
import { CssBaseline, makeStyles } from '@material-ui/core'
import { RegistrationFormValues } from './ui/registration-form/registration-form.types'
import { ApiService } from './api/api.service'
import { RegistrationResponse } from './types/registration-service.types'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  form: {
    flexShrink: 1,
    flexBasis: theme.spacing(42),
  },
}))

export const App: React.FC = () => {
  const classes = useStyles()

  const [values, setValues] = React.useState<RegistrationFormValues>({
    name: '',
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [errors, setErrors] = React.useState<RegistrationResponse | null>(null)

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = React.useCallback(
    event => {
      const { name, value } = event.target

      setValues({
        ...values,
        [name]: value,
      })
    },
    [values]
  )

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = React.useCallback(
    event => {
      event.preventDefault()

      setIsLoading(true)
      setErrors(null)

      ApiService.registration(values)
        .catch(response => {
          setErrors(response as RegistrationResponse)
        })
        .finally(() => {
          setIsLoading(false)
        })
    },
    [values]
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <RegistrationForm
        className={classes.form}
        values={values}
        onChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
        isLoading={isLoading}
      />
    </div>
  )
}
