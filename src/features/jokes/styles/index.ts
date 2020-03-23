import { LinearGradient } from 'expo-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { TextInput } from 'react-native-paper';
import { AspectImage } from 'shared/components';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const GradientContainer = styled(LinearGradient).attrs(() => ({
  colors: ['#f15a24', '#f19d6a'],
}))`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 100%;
`;

export const FormRow = styled.View`
  flex-direction: row;
  align-self: stretch;
  padding: 10px;
  justify-content: space-around;
`;

export const QueryInput = styled(TextInput)`
  width: 100%;
`;

export const Image = styled(AspectImage)`
  width: ${props => props.dimension * 0.4}px;
  height: ${props => props.dimension * 0.4}px;
`;

export const KeyboardScroll = styled(KeyboardAwareScrollView).attrs(() => ({
  contentContainerStyle: {
    alignSelf: 'stretch',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  enableOnAndroid: true,
  extraScrollHeight: 50,
}))`
  flex: 1;
  align-self: stretch;
  width: 100%;
`;
