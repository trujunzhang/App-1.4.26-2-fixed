import type {LottieViewProps} from 'lottie-react-native';
import type {ColorValue} from 'react-native';

type DotLottieAnimation = {
    file: LottieViewProps['source'];
    w: number;
    h: number;
    backgroundColor?: ColorValue;
};

export default DotLottieAnimation;
