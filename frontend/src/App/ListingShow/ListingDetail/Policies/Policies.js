import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import styled from 'styled-components';

const S = {
  GridMargin: styled(Grid)`
    margin-bottom: 8px;
  `,
};
const UNSUITABLE_RULES = {
  children: 'children (2-12 years)',
  infants: 'infants (Under 2 years)',
  pets: 'pets',
  all_children: 'children (0-12 years)',
};

const BLOCK_RULES = {
  smoking: 'smoking',
  events: 'parties, or events',
};

const Policies = ({ houseRules }) => {
  let rules = Object.keys(houseRules).filter((key) => houseRules[key] === false);
  const unSuitableRules = [];
  const blockRules = [];
  if (rules.includes('children') && rules.includes('infants')) {
    rules.splice(rules.indexOf('children'), 1);
    rules.splice(rules.indexOf('infants'), 1);
    rules.unshift('all_children');
  }
  rules.forEach((key) => {
    UNSUITABLE_RULES[key]
      ? unSuitableRules.push(UNSUITABLE_RULES[key])
      : blockRules.push(BLOCK_RULES[key]);
  });
  return (
    <>
      <S.GridMargin>
        <Typography variant="h5" style={{ fontWeight: 800 }}>
          Policies
        </Typography>
      </S.GridMargin>
      <S.GridMargin>
        <Typography variant="subtitle1">
          <strong>House Rules</strong>
        </Typography>
      </S.GridMargin>
      {unSuitableRules.length > 0 && (
        <S.GridMargin>
          <Typography variant="body1">
            Not safe or suitable for {unSuitableRules.join(', ')}
          </Typography>
        </S.GridMargin>
      )}
      {blockRules.length > 0 && (
        <S.GridMargin>
          <Typography variant="body1">No {blockRules.join(', ')}</Typography>
        </S.GridMargin>
      )}
      {houseRules.addition_rules &&
        houseRules.addition_rules.length > 0 &&
        houseRules.addition_rules.map((rule, index) => {
          return (
            <S.GridMargin key={index}>
              <Typography variant="body1">{rule}</Typography>
            </S.GridMargin>
          );
        })}
    </>
  );
};

Policies.propTypes = {};

export default Policies;
