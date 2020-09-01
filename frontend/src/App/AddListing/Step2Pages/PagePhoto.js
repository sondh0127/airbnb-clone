import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { FieldArray, Field } from 'formik';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';

import './custom-image-crop.css';
import { S, Svg } from '../AddListingStyled';
import ConfirmButton from './ConfirmButton';
import { WrapperTable, WrapperCell } from '../../../shared/UI/Wrapper';
import {
  base64StringtoFile,
  downloadBase64File,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef,
} from './ImageUtils';
import { removeListingPhoto, uploadPhoto } from '../../../store/actions/ListingActions';
import CircularProgress from '@material-ui/core/CircularProgress';

const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(',').map((item) => {
  return item.trim();
});

const TextAreaComponent = ({ field, form: { touched, errors }, ...props }) => (
  <div>
    <S.Textarea placeholder="Add a caption" {...field} {...props} />
    {touched[field.name] && errors[field.name] && (
      <div className="error">{errors[field.name]}</div>
    )}
  </div>
);

class PagePhoto extends Component {
  constructor(props) {
    super(props);
    this.imagePreviewCanvasRef = React.createRef();
  }
  static propTypes = {
    values: PropTypes.object.isRequired,
  };

  state = {
    crop: {
      aspect: 16 / 9,
      width: 100,
    },
  };

  verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        alert('This file is not allowed. ' + currentFileSize + ' bytes is too large');
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert('This file is not allowed. Only images are allowed.');
        return false;
      }
      return true;
    }
  };

  handleOnDrop = (files, rejectedFiles, push) => {
    const { listingID, uploadPhoto } = this.props;
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          'load',
          async () => {
            const myResult = myFileItemReader.result;
            const image = {
              imgSrc: myResult,
              // imgSrcExt: extractImageFileExtensionFromBase64(myResult),
            };
            const imageUrl = await uploadPhoto(listingID, image);
            push({ url: imageUrl });
          },
          false
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  handleImageLoaded = (image) => {};

  handleOnCropChange = (crop) => {
    this.setState({ crop: crop });
  };

  handleOnCropComplete = (crop, pixelCrop, imgSrc) => {
    const canvasRef = this.imagePreviewCanvasRef.current;
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
  };

  render() {
    const { values, removeListingPhoto, loading } = this.props;
    return (
      <section>
        <S.WrapperHeader>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Add photos to your listing
          </Typography>
        </S.WrapperHeader>
        <S.WrapperText1>
          <Typography variant="body1">
            Photos help guests imagine staying in your place. You can start with one and
            add more after you publish.
          </Typography>
        </S.WrapperText1>

        <FieldArray
          name="photos"
          render={({ push, remove }) => (
            <S.WrapperUploadPhoto>
              {values.photos && values.photos.length > 0 ? (
                <Grid container spacing={4}>
                  {values.photos.map((photo, index) => {
                    return (
                      <Grid item key={index} md={index === 0 ? 12 : 4}>
                        <S.WrapperImage>
                          <ConfirmButton
                            index={index}
                            removeListingPhoto={async (index) => {
                              const res = await removeListingPhoto(
                                this.props.listingID,
                                photo
                              );
                              if (res.success) {
                                remove(index);
                              } else {
                              }
                            }}
                          />
                          <S.DivImage>
                            {index === 0 ? (
                              <S.ImageFull src={photo.url} />
                            ) : (
                              <S.Image src={photo.url} />
                            )}
                          </S.DivImage>
                        </S.WrapperImage>
                        <S.DivCaption>
                          <Field
                            name={`photos.${index}.caption`}
                            placeholder="Add a caption"
                            component={TextAreaComponent}
                          />
                        </S.DivCaption>
                        {/* //TODO:  */}
                        {/* <ReactCrop
                        src={photo.imgSrc}
                        crop={this.state.crop}
                        onImageLoaded={this.handleImageLoaded}
                        onComplete={(crop, pixelCrop) =>
                          this.handleOnCropComplete(crop, pixelCrop, photo.imgSrc)
                        }
                        onChange={this.handleOnCropChange}
                      />
                      <br />
                      <p>Preview Canvas Crop </p>
                      <canvas ref={this.imagePreviewCanvasRef} /> */}
                      </Grid>
                    );
                  })}
                  <Grid item md={4}>
                    <Dropzone
                      onDrop={(acceptedFiles, rejectedFiles) =>
                        this.handleOnDrop(acceptedFiles, rejectedFiles, push)
                      }
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <S.WrapperDropzoneSmall>
                              <input {...getInputProps()} />
                              {loading ? (
                                <CircularProgress
                                  size={36}
                                  color="secondary"
                                  style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    marginTop: -12,
                                    marginLeft: -12,
                                  }}
                                />
                              ) : (
                                <Grid item>
                                  <S.DivAddIcon />
                                  <S.DivAddText>Add another</S.DivAddText>
                                </Grid>
                              )}
                            </S.WrapperDropzoneSmall>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </Grid>
                </Grid>
              ) : (
                <Dropzone
                  onDrop={(acceptedFiles, rejectedFiles) =>
                    this.handleOnDrop(acceptedFiles, rejectedFiles, push)
                  }
                  multiple={false}
                >
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <S.WrapperDropZone>
                          <S.WrapperDropZoneBackGround>
                            <input {...getInputProps()} />
                            <S.DivCenter>
                              <S.WrapperButton>
                                <Button
                                  size="large"
                                  color="secondary"
                                  variant="contained"
                                >
                                  <WrapperTable fullHeight>
                                    <WrapperCell style={{ paddingRight: 12 }}>
                                      {Svg.upload}
                                    </WrapperCell>
                                    <WrapperCell>Upload Photos</WrapperCell>
                                  </WrapperTable>
                                </Button>
                              </S.WrapperButton>
                              <S.WrapperTextDrag>or drag them in</S.WrapperTextDrag>
                            </S.DivCenter>
                          </S.WrapperDropZoneBackGround>
                        </S.WrapperDropZone>
                      </div>
                    </section>
                  )}
                </Dropzone>
              )}
            </S.WrapperUploadPhoto>
          )}
        />
      </section>
    );
  }
}
const mapStateToProps = (state) => ({
  listingID: state.ListingReducer.listing.id,
  loading: state.ListingReducer.loading,
});

const mapDispatchToProps = {
  uploadPhoto,
  removeListingPhoto,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PagePhoto);
