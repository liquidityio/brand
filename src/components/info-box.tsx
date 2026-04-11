import { Text, XStack, YStack } from '@hanzo/gui'

const InfoBox: React.FC<{
  title: string,
  items: string[],
} & React.ComponentProps<typeof YStack>> = ({
  title,
  items,
  ...rest
}) => (
  <YStack
    rounded="$6"
    px="$4"
    py="$3"
    bg="$bgInfo"
    bw={1}
    bc="$borderColorInfo"
    $sm={{ px: '$3' }}
    {...rest}
  >
    <XStack items="center" gap="$2" mb="$2">
      <Text fontSize="$3">&#9889;</Text>
      <Text fontSize="$4" fontWeight="700" color="$color">
        {title}
      </Text>
    </XStack>
    <YStack gap="$1" ml="$1">
      {items.map((item: string, i: number) => (
        <Text key={i} fontSize="$1" color="$color10">
          {'• '}{item}
        </Text>
      ))}
    </YStack>
  </YStack>
)

export default InfoBox
