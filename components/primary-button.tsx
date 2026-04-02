import { Button } from '@hanzogui/button'

// TODO: Move to @hanzo/gui as a library component with tests.
//
// A filled button using the brand primary color.
//
// Usage:
//   <PrimaryButton onPress={handleSubmit}>Submit</PrimaryButton>
//   <PrimaryButton w="100%">Full width</PrimaryButton>

const PrimaryButton: React.FC<
  React.ComponentProps<typeof Button>
> = ({
  children,
  ...rest
}) => (
  <Button
    size="$md"
    rounded="$6"
    px="$6"
    bg="$brandPrimary"
    color="$brandPrimaryText"
    bw={0}
    hoverStyle={{ bg: '$brandPrimaryHover', bw: 0 }}
    pressStyle={{ bg: '$brandPrimaryPress', bw: 0 }}
    {...rest}
  >
    {children}
  </Button>
)

export default PrimaryButton
