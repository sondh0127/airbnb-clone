import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  popover: {
    maxWidth: '95%',
  },
  FilterPopup: {
    margin: '0 0px',
    minHeight: 20,
  },
  rightPaper: {
    top: '13.6% !important',
    // right: '1%',
    maxWidth: '20%',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '95%',
      right: '0%',
      top: '10%',
    },
  },
  backDropStyling: {
    backgroundColor: '#ffffff94',

    // height: "79vh",
    // top: "21vh",
  },
  cardcontent: {
    padding: 24,
    [theme.breakpoints.down('xs')]: {
      padding: 10,
    },
  },
  active: {
    margin: '0 0px',
    minHeight: 20,
    padding: '4px 10px',
    backgroundColor: theme.palette.primary.light,
    color: 'white',
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
  inactive: {
    margin: '0 0px',
    minHeight: 20,
    padding: '4px 10px',
  },
}));
