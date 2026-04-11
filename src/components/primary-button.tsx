import { Pressable } from 'react-native'
import { Text, XStack } from '@hanzo/gui'

const PrimaryButton: React.FC<{
  children: React.ReactNode
  onPress?: () => void
  disabled?: boolean
  w?: string | number
  f?: number
} & Record<string, any>> = ({
  children,
  onPress,
  disabled,
  ...rest
}) => (
  <XStack
    justify="center"
    items="center"
    gap="$2"
    h="$md"
    rounded="$6"
    px="$6"
    bg="$brandPrimary"
    cur="pointer"
    opacity={disabled ? 0.4 : 1}
    pressStyle={{ bg: '$brandPrimaryPress' }}
    onPress={disabled ? undefined : onPress}
    {...rest}
  >
    {typeof children === 'string' ? (
      <Text color="$brandPrimaryText" fontWeight="500" fontSize="$3">{children}</Text>
    ) : (
      children
    )}
  </XStack>
)

export default PrimaryButton
