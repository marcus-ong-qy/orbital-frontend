import { theme } from '../../styles/Theme';

import { LabelsSpan, StyledLabel } from './styles/WarningLabels.styled';

type Props = {
  leftLabel?: string;
  rightLabel?: string;
  leftIsError?: boolean;
  rightIsError?: boolean;
};

const Label = ({
  label,
  float,
}: {
  label: string;
  float: 'left' | 'right';
}) => {
  const { h4 } = { ...theme.typography.fontSize };
  return (
    <StyledLabel fontType={h4} float={float}>
      {label}
    </StyledLabel>
  );
};

const WarningLabels = (props: Props) => {
  return (
    <LabelsSpan>
      {props.leftIsError && (
        <Label label={props.leftLabel ?? ''} float="left" />
      )}
      {props.rightIsError && (
        <Label label={props.rightLabel ?? ''} float="right" />
      )}
    </LabelsSpan>
  );
};

export default WarningLabels;
