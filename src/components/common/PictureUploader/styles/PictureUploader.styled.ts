import styled from 'styled-components'

export const PictureUploaderLabel = styled.label<{ background: 'primary' | 'secondary' }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 35px;
  width: 100%;
  border-radius: 35px;

  font-weight: bold;
  font-size: min(18px, 2vw);

  cursor: pointer;
  white-space: nowrap;

  background: ${(props) => props.theme.palette[props.background]};
  color: ${(props) => props.theme.palette.text.white};

  border: 2px solid ${(props) => props.theme.palette.common.black};

  :hover {
    background: ${(props) => props.theme.palette.highlight.dark};
  }

  input {
    display: none;
  }
`
