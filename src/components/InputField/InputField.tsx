import { FieldValues, UseFormRegister } from 'react-hook-form';
import { useTheme } from 'styled-components';
import { theme } from '../../styles/Theme';
import WarningLabels from '../WarningLabels/WarningLabels';
import { InputFieldContainer, StyledInput } from './styles/InputFields.styled';

type Types = 'text' | 'name' | 'email';

type Props = {
  //   type?: Types;
  placeholder: string;
  leftLabel?: string;
  rightLabel?: string;
  leftIsError?: any;
  rightIsError?: any;
  //   register: UseFormRegister<FieldValues>;
  pattern?: RegExp;
  required?: boolean;
};

const defaultProps = {
  type: 'text',
  //   pattern: defaultRegex,
  required: false,
};

// const warningLabelTexts: Record<Types, string> = {
//   text: missingField,
//   name: invalidName,
//   email: invalidEmail,
// };
function InputField(props: Props) {
  const {
    placeholder,
    leftLabel,
    rightLabel,
    leftIsError,
    rightIsError,
    // register,
    required,
  } = props;
  //   const type = props.type ?? 'text';
  //   const pattern = props.pattern ?? defaultRegex;

  const {
    common: { white },
    primary,
  } = { ...theme.palette };
  //   const { input, h2 } = { ...theme.typography.fontSize }

  //   const warningLabelText = warningLabelTexts[`${type}`];

  //   /* eslint-disable react/jsx-props-no-spreading */
  //   /* eslint-disable object-shorthand */
  return (
    <InputFieldContainer>
      <StyledInput
        placeholder={placeholder}
        // pattern={pattern.source} // for css side rendering
        // fontType={input}
        // {...register(title, { required: required, pattern: pattern })}
      />
      <WarningLabels
        leftLabel={leftLabel}
        rightLabel={rightLabel}
        leftIsError={leftIsError}
        rightIsError={rightIsError}
      />
    </InputFieldContainer>
  );
}

InputField.defaultProps = defaultProps;

export default InputField;
