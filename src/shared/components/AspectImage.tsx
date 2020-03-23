import * as React from 'react';
import { Image, StyleSheet } from 'react-native';

function AspectImage(props) {
  const [layout, setLayout] = React.useState(null);

  const { aspectRatio = 1, ...inputStyle } =
    StyleSheet.flatten(props.style) || {};
  const style = [inputStyle, { aspectRatio }];

  if (layout) {
    const { width = 0, height = 0 } = layout;
    if (width === 0) {
      style.push({ width: height * aspectRatio, height });
    } else {
      style.push({ width, height: width * aspectRatio });
    }
  }

  return (
    <Image
      {...props}
      style={style}
      onLayout={({ nativeEvent: { layout } }) => setLayout(layout)}
    />
  );
}

export default AspectImage;
