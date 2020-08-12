
# react-native-slide-verify-view

## Getting started

`$ npm install react-native-slide-verify-view --save`


## Usage
```javascript
import SlideVerifyView from 'react-native-slide-verify-view';


// ... props

width={50}	// background width
height={50}	// background height
sliderLength={50}// slider width and height
defaultBackgroundColor={'#eaeaea'}	// default background color
successBackgroundColor={'#0098ff'} // background color when slider to right successful
permissibleError={10}// allow permissible error 
defaultText={'Slide To Verify'} // default background text
successText={'Validation Passed'}//  background text when slide to right successful
sliderDefaultColor={'#ffffff'} // slider default color 
onSuccessCallback={() => {}} // callback when slide to right successful
onFailCallback={() => {}} // fail callback 
defaultSliderPic={require('../res/ic_slider.png')}// slider default picture
defaultVerifySuccessPic={require('../res/ic_verify_success.png')} //picture when slide to right successful 

```
