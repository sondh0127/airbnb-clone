import PropTypes from 'prop-types';
import React from 'react';
import SearchField from './SearchField';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles/index';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',

    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(5),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const SearchBar = ({ isHome }) => {
  const classes = useStyles();
  return (
    <>
      {!isHome && (
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <SearchField name="location" />
        </div>
      )}
    </>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  isHome: PropTypes.bool.isRequired,
};
