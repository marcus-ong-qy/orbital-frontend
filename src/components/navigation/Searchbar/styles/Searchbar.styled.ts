import { Input } from 'antd'
import styled from 'styled-components'

export const SearchBarStyled = styled(Input.Search)`
  width: 50vw;

  .ant-input-group {
    position: relative;
    display: flex;

    width: 50vw;
    margin-top: 1.9vh;
  }
  .ant-input-group-addon {
    position: absolute;
    right: 26px;
  }
  .ant-input-search-button {
    width: 35px;
    height: 35px;
    border-radius: 35px;
    border-width: 2px;
    background: ${(props) => props.theme.palette.common.gray.light};

    cursor: pointer;

    :hover {
      background: ${(props) => props.theme.palette.highlight.normal};
    }
  }
  .ant-input {
    height: 35px;
    width: calc(100% - 26px);
    padding-left: 12px;
    border-radius: 28px;
  }
`
