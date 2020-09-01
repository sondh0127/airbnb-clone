import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import styled from 'styled-components';
import { FieldArray } from 'formik';
import NumberPickerWithLabel from '../../../shared/UI/NumberPickerWithLabel';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const S = {};

S.TextBedroom = styled.div`
  font-size: 18px;
  font-weight: normal;
  margin: 0;
`;

S.NumberBed = styled.div`
  color: #767676;
  font-size: 18px;
`;

S.SummaryBed = styled.div`
  min-height: 28px;
  padding-bottom: 28px;
  color: #767676;
  font-size: 17px;
`;

const BED_TYPES = {
  double: {
    label: 'Double',
    summary: 'double bed',
    summaries: 'double beds',
  },
  queen: {
    label: 'Queen',
    summary: 'queen bed',
    summaries: 'queen beds',
  },
  single: {
    label: 'Single',
    summary: 'single bed',
    summaries: 'single beds',
  },
  sofaBed: {
    label: 'Sofa bed',
    summary: 'sofa bed',
    summaries: 'sofa beds',
  },
  king: {
    label: 'King',
    summary: 'king bed',
    summaries: 'king beds',
  },
  smallDouble: {
    label: 'Small double',
    summary: 'small double',
    summaries: 'small double beds',
  },
  couch: {
    label: 'Couch',
    summary: 'couch',
    summaries: 'couches',
  },
  bunkBed: {
    label: 'Bunk bed',
    summary: 'bunk bed',
    summaries: 'bunk beds',
  },
  floorMattress: {
    label: 'Floor mattress',
    summary: 'floor mattress',
    summaries: 'floor mattresses',
  },
  airMattress: {
    label: 'Air mattress',
    summary: 'air mattress',
    summaries: 'air mattresses',
  },
  crib: {
    label: 'Crib',
    summary: 'crib',
    summaries: 'cribs',
  },
  toddlerBed: {
    label: 'Toddler bed',
    summary: 'toddler bed',
    summaries: 'toddler beds',
  },
  hammock: {
    label: 'Hammock',
    summary: 'hammock',
    summaries: 'hammocks',
  },
  waterBed: {
    label: 'Water bed',
    summary: 'water bed',
    summaries: 'water beds',
  },
};

const getBedsOption = (beds) => {
  const initKeys = Object.keys(beds);
  return Object.keys(BED_TYPES).filter((key) => !initKeys.includes(key));
};

const getSummaryFromBeds = (beds) => {
  let total = 0;
  let summary = [];
  if (beds) {
    Object.keys(beds).forEach((type) => {
      let number = beds[type];
      total += number;
      if (number > 0) {
        summary.push(
          `${number} ${
            number === 1 ? BED_TYPES[type].summary : BED_TYPES[type].summaries
          }`
        );
      }
    });
  }
  return { total, summary: summary.join(', ') };
};

class BedsPicker extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    beds: PropTypes.object.isRequired,
  };
  state = {
    showPicker: false,
    total: 0,
    summary: '',
    beds: this.props.beds || {},
  };

  componentDidMount() {
    const { beds } = this.state;
    this.updateChangeSummary(beds);
  }

  updateChangeSummary = (beds) => {
    const { total, summary } = getSummaryFromBeds(beds);
    this.setState({ summary, total });
  };

  toggleShowPicker = () => {
    const { showPicker } = this.state;
    this.setState({ showPicker: !showPicker });
  };

  closePicker = () => {
    this.setState({ showPicker: false });
  };

  handleMinusClick = (type, setFieldValue) => {
    const { beds } = this.state;
    let newBeds = { ...beds };
    newBeds[type] = newBeds[type] - 1;
    this.setState({ beds: newBeds });
    this.updateChangeSummary(newBeds);
    setFieldValue(this.props.name, newBeds);
  };

  handlePlusClick = (type, setFieldValue) => {
    const { beds } = this.state;
    let newBeds = { ...beds };
    newBeds[type] = newBeds[type] + 1;
    this.setState({ beds: newBeds });
    this.updateChangeSummary(newBeds);
    setFieldValue(this.props.name, newBeds);
  };

  render() {
    const { name, label } = this.props;
    const { showPicker, beds, summary, total } = this.state;
    const remainBedOptions = getBedsOption(beds);
    return (
      <FieldArray
        name={name}
        render={({ form }) => {
          return (
            <ClickAwayListener onClickAway={this.closePicker}>
              <>
                <Grid container>
                  <Grid item xs={6}>
                    <S.TextBedroom>{label}</S.TextBedroom>
                    <S.NumberBed>{`${total} ${
                      total === 1 ? `bed` : `beds`
                    } `}</S.NumberBed>
                    {!showPicker && <S.SummaryBed>{summary}</S.SummaryBed>}
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    <Button
                      type="button"
                      size="large"
                      variant="outlined"
                      onClick={this.toggleShowPicker}
                      disableRipple
                    >
                      {showPicker ? `Done` : total ? `Edit beds` : `Add beds`}
                    </Button>
                  </Grid>
                  {showPicker && (
                    <Grid container>
                      {Object.keys(beds).map((bedType, index) => (
                        <React.Fragment key={`bed ${index}`}>
                          <Grid item xs={8}>
                            <NumberPickerWithLabel
                              value={beds[bedType]}
                              onMinusClick={() =>
                                this.handleMinusClick(bedType, form.setFieldValue)
                              }
                              onPlusClick={() =>
                                this.handlePlusClick(bedType, form.setFieldValue)
                              }
                              label={BED_TYPES[bedType].label}
                              disabledMinus={beds[bedType] < 1}
                              disabledPlus={beds[bedType] >= 5}
                            />
                          </Grid>
                          <Grid item xs={4} />
                        </React.Fragment>
                      ))}
                      <Grid item xs={8}>
                        <Select
                          native
                          fullWidth
                          value={-1}
                          onChange={(event) => {
                            const value = event.target.value;
                            const newBeds = { ...beds };
                            newBeds[value] = 1; // set default value
                            this.setState({ beds: newBeds });
                            form.setFieldValue(name, newBeds);
                          }}
                          input={
                            <OutlinedInput
                              id="addOption"
                              name="addOption"
                              labelWidth={0}
                            />
                          }
                        >
                          <option value={-1} disabled>
                            Add another bed
                          </option>
                          {remainBedOptions.map((type) => {
                            return (
                              <option key={type} value={type}>
                                {BED_TYPES[type].label}
                              </option>
                            );
                          })}
                        </Select>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
                <Divider />
              </>
            </ClickAwayListener>
          );
        }}
      />
    );
  }
}

export default BedsPicker;
