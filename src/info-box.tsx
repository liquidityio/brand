import { YStack, Text } from '@hanzo/gui'

const InfoBox: React.FC<{
  children: React.ReactNode,
} & React.ComponentProps<typeof YStack>> = ({
  children,
  ...rest
}) => (
  <YStack
    p="$3"
    rounded="$4"
    bg="$color2"
    bw={1}
    bc="$borderColor"
    {...rest}
  >
    {typeof children === 'string'
      ? <Text fontSize="$3" color="$color11">{children}</Text>
      : children}
  </YStack>
)

export default InfoBox
