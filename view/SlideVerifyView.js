import React, { Component } from 'react';
import { View, Text,Dimensions,Image,PanResponder ,StyleSheet} from 'react-native';

const WIDTH = Dimensions.get('window').width * 2 / 3;

export default class SlideVerifyView extends Component {
  static defaultProps = {
    width: WIDTH,
    height: 50,
    sliderLength: 50,
    defaultBackgroundColor: '#eaeaea',
    successBackgroundColor:'#0098ff',
    permissibleError: 10,
    defaultText: 'Slide To Verify',
    successText: 'Validation Passed',
    sliderDefaultColor:'#ffffff',
    onSuccessCallback: () => {},
    onFailCallback: () => {},
    defaultSliderPic: require('../res/ic_slider.png'),
    defaultVerifySuccessPic: require('../res/ic_verify_success.png'),

  }

  constructor(props) {
    super(props);
    this.state = {
      left: 0,
      isSuccess: false,
    };
  }

  componentWillMount() {
    let { width, sliderLength, permissibleError } = this.props;
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (e, gestureState) => {
        if (this.state.isSuccess) return;
        this.touchX = this.state.left;
      },
      onPanResponderMove: (e, g) => {
        if (this.state.isSuccess) return;
        let left = this.touchX + g.dx;

        if (left >= (width - sliderLength)) {
          left = width - sliderLength;
        }
        if (left < 0) {
          left = 0;
        }
        this.setState({ left: left })
      },
      onPanResponderRelease: (e, g) => {
        if (this.state.isSuccess) return;
        let left = this.touchX + g.dx;
        if (left >= (width - sliderLength - permissibleError)) {
          this.setState({ isSuccess: true, left: width - sliderLength });
          this.props.onSuccessCallback();
        } else {
          this.setState({ left: 0 });
          this.props.onFailCallback();
        }
      },
    })
  }


  configBackgroundColor() {
    let { defaultBackgroundColor, successBackgroundColor ,} = this.props;
    return this.state.isSuccess ? successBackgroundColor : defaultBackgroundColor;
  }

  render() {
    let { width, height, sliderLength, successText, sliderDefaultColor, defaultText,defaultSliderPic, defaultVerifySuccessPic } = this.props;
    let picLength = sliderLength * 3 /5;// 滑块里面的图片大小
    return (
      <View style={[styles.slideBackgroundView, { width: width, height: height, backgroundColor: this.configBackgroundColor(),}]}>
        {this.state.isSuccess ? (
          <View style={{ marginEnd: sliderLength, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={styles.successText}>{successText}</Text>
          </View>
        ) : (
          <View style={{ marginStart: sliderLength, justifyContent: 'center', alignItems: 'center', }}>
            <Text style={styles.defaultText}>{this.state.left !== 0 ? '' :defaultText}</Text>
          </View>
        )}
        <View
          style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: sliderDefaultColor, position: 'absolute', left: this.state.left, top: 0, height: sliderLength, width: sliderLength, transform: [{ translateX: this.state.left }], borderWidth: 1, borderColor: '#eaeaea', }}
          {...this.panResponder.panHandlers}
        >
          <Image 
            style={{height: picLength, width: picLength,}}
            source={this.state.isSuccess ? defaultVerifySuccessPic: defaultSliderPic}
          />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  defaultText: {
    color: '#999999',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 13,
  },
  successText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight:'bold',
    fontSize: 13,
  },
  titleText: {
    fontSize: 14,
    color: '#282828',
    paddingVertical: 15,
    textAlign: 'center'
  },
  slideBackgroundView: {
    justifyContent: 'center',
  }
});