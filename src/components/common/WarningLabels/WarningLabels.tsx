import { useTheme } from 'styled-components'

import { StyledLabel } from './styles/WarningLabels.styled'

type Props = {
  label: string
  isError: boolean
}

// TODO might be a little redundant
const Label = ({ label }: { label: string }) => {
  const theme = useTheme()
  const { labelFont } = { ...theme.typography.fontSize }

  return <StyledLabel fontType={labelFont}>{label}</StyledLabel>
}

const WarningLabels = (props: Props) => {
  return <div>{props.isError && <Label label={props.label ?? ''} />}</div>
}

export default WarningLabels
