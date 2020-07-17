/* eslint-disable no-restricted-imports */
import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import { amber, green } from '@material-ui/core/colors'
import WarningIcon from '@material-ui/icons/Warning'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import clsx from 'clsx'
const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const useStyles1 = makeStyles((theme) => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
}))
export default function Message({
  type = 'success',
  vertical = 'top',
  horizontal = 'center',
  timeout = 3000,
  message = '',
  open = false,
  onClose,
}) {
  const classes = useStyles1()
  const Icon = variantIcon[type]
  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      autoHideDuration={timeout}
      open={open}
      key={vertical + horizontal}
      onClose={onClose}
    >
      <SnackbarContent
        className={clsx(classes[type])}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
      />
    </Snackbar>
  )
}
