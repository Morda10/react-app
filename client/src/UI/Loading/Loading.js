import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > * + *': {
        margin: 0,
        overflow: 'hidden',
        alignItems: 'center'
      },
    },
  }));

export const Loading = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <CircularProgress />
        {/* <CircularProgress color="secondary" /> */}
      </div>
    )
}

export default Loading;