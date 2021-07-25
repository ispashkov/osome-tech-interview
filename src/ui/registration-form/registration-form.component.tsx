import * as React from 'react'
import { Paper, TextField, Button, Typography, makeStyles } from '@material-ui/core'
import clsx from 'clsx'
import { RegistrationFormValues } from './registration-form.types'
import { RegistrationResponse } from '../../types/registration-service.types'
import { formatErrors } from '../../utils/formatErrors'

interface Props {
  className?: string
  values: RegistrationFormValues
  errors: RegistrationResponse | null
  onChange: React.ChangeEventHandler<HTMLInputElement>
  onSubmit: React.FormEventHandler<HTMLFormElement>
  isLoading?: boolean
}

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: theme.spacing(42),
    padding: theme.spacing(4),
  },
  title: {
    margin: theme.spacing(0, 'auto', 2),
  },
  form: {
    display: 'grid',
    gridGap: theme.spacing(2),
    gridTemplateRows: 'repeat(3, 70px)',
  },
}))

export const RegistrationForm: React.FC<Props> = props => {
  const { className, values, onChange, onSubmit, errors, isLoading = false } = props

  const classes = useStyles()
  const { name, email, password } = values

  return (
    <Paper className={clsx(classes.root, className)}>
      <Typography className={classes.title} variant="h4">
        Registration
      </Typography>

      <form className={classes.form} onSubmit={onSubmit}>
        <TextField
          label="Name"
          placeholder="Your name"
          name="name"
          value={name}
          onChange={onChange}
          error={!!errors?.name}
          helperText={formatErrors(errors?.name)}
        />
        <TextField
          label="E-mail"
          placeholder="Your e-mail"
          name="email"
          value={email}
          onChange={onChange}
          error={!!errors?.email}
          helperText={formatErrors(errors?.email)}
        />

        <TextField
          type="password"
          label="Password"
          placeholder="Your password"
          name="password"
          value={password}
          onChange={onChange}
          error={!!errors?.password}
          helperText={formatErrors(errors?.password)}
        />

        <Button type="submit" color="primary" variant="contained" disabled={isLoading}>
          Submit
        </Button>
      </form>
    </Paper>
  )
}
