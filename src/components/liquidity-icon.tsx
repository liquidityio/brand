import Svg, { Path } from 'react-native-svg'

const LiquidityIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <Path d="M13.0384 4H7.03455V10.0039H13.0384V4Z" fill="#299BEF" />
    <Path d="M13.0384 10.004H7.03455V16.0079H13.0384V10.004Z" fill="#0E7DE0" />
    <Path d="M13.0384 15.9922H7.03455V21.9961H13.0384V15.9922Z" fill="#0051CC" />
    <Path d="M19.0411 15.9922H13.0372V21.9961H19.0411V15.9922Z" fill="#0E7DE0" />
    <Path d="M13.0384 21.9961H7.03455V28H13.0384V21.9961Z" fill="#0045AA" />
    <Path d="M19.0411 21.9961H13.0372V28H19.0411V21.9961Z" fill="#0051CC" />
    <Path d="M25.0482 21.9961H19.0444V28H25.0482V21.9961Z" fill="#0E7DE0" />
  </Svg>
)

export default LiquidityIcon
