import { Switch } from '@hanzogui/switch'

// TODO: Move to @hanzo/gui as a library component with tests.
//
// A branded toggle switch. Thumb uses brand primary color; track
// tints to brandPrimaryTrack when checked.
//
// Usage:
//   <ToggleSwitch checked={value} onCheckedChange={setValue} />

const ToggleSwitch: React.FC<{
  checked: boolean,
  onCheckedChange: (val: boolean) => void,
  id?: string,
} & Omit<React.ComponentProps<typeof Switch>, 'checked' | 'onCheckedChange'>> = ({
  checked,
  onCheckedChange,
  id,
  ...rest
}) => (
  <Switch
    id={id}
    size="$3"
    checked={checked}
    onCheckedChange={onCheckedChange}
    jc="center"
    px={2}
    bw={1}
    bg={checked ? undefined : '$toggleTrackOff'}
    bc={checked ? undefined : '$toggleBorderOff'}
    activeStyle={{ backgroundColor: '$brandPrimaryTrack', borderColor: '$brandPrimaryHover' }}
    {...rest}
  >
    <Switch.Thumb animation="quick" size="$xs" bg={checked ? '$brandPrimary' : '$brandDisabled'} borderRadius={1000} my="auto" />
  </Switch>
)

export default ToggleSwitch
