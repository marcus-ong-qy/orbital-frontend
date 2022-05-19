import { theme } from '../../styles/Theme';

import { LabelsDiv, StyledLabel } from './styles/WarningLabels.styled';

type Props = {
  label: string;
  isError: boolean;
};

// TODO might be a little redundant
const Label = ({ label }: { label: string }) => {
  const { labelFont } = { ...theme.typography.fontSize };

  return <StyledLabel fontType={labelFont}>{label}</StyledLabel>;
};

const WarningLabels = (props: Props) => {
  return (
    <LabelsDiv>
      {props.isError && <Label label={props.label ?? ''} />}
    </LabelsDiv>
  );
};

export default WarningLabels;
