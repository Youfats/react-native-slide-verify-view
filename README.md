<!--
 * @Description: 
 * @Author: RaoKui
 * @Date: 2020-08-19 15:30:52
-->

# react-native-slide-verify-view

## Getting started

`$ npm install react-native-slide-verify-view --save`


## Usage
```javascript
import SlideVerifyView from 'react-native-slide-verify-view';


// ... props
<SlideVerifyView
width={50}	// background width
height={50}	// background height
sliderLength={50}// slider width and height
sliderHeight={20} // option,if unset ,sliderHeight = sliderLength
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
/>
```
