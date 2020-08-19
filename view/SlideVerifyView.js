import React, { Component } from 'react';
import { View, Text,Dimensions,Image,PanResponder ,StyleSheet} from 'react-native';

const WIDTH = Dimensions.get('window').width * 2 / 3;

export default class SlideVerifyView extends Component {
  static defaultProps = {
    width: WIDTH, // 空间宽度
    height: 50, // 控件高度
    sliderLength: 50, // 滑块长度
    sliderHeight: 0, // 滑块高度，为0的话默认为滑块长度sliderLength
    defaultBackgroundColor: '#eaeaea', // 默认情况下的背景颜色
    successBackgroundColor:'#0098ff',// 默认验证成功背景颜色
    permissibleError: 10,// 允许的误差精度
    defaultText: 'Slide To Verify', // 默认背景提示文字
    successText: 'Validation Passed', //  默认验证成功背景提示文字
    sliderDefaultColor:'#ffffff', // 滑块默认颜色
    onSuccessCallback: () => {}, // 验证成功回调
    onFailCallback: () => {}, // 验证失败回调
    defaultSliderPic: require('../res/ic_slider.png'), // 默认滑块图片
    defaultVerifySuccessPic: require('../res/ic_verify_success.png'), // 验证成功滑块图片

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
    let { width, height, sliderLength, sliderHeight, successText, sliderDefaultColor, defaultText,defaultSliderPic, defaultVerifySuccessPic } = this.props;
    let picLength = sliderLength * 3 /5;// 滑块里面的图片大小
    let sliderHei = sliderHeight === 0 ? sliderLength: sliderHeight; 
    let top = (height - sliderHei) / 2;
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
          style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: sliderDefaultColor, position: 'absolute', left: this.state.left, top: top, height: sliderHei, width: sliderLength, transform: [{ translateX: this.state.left }], borderWidth: 1, borderColor: '#eaeaea', }}
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