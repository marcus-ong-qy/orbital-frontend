import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { toggleTheme } from '../../../store/authentication/actions'

import { StyledDarkModeToggleSwitch } from './styles/DarkModeToggleSwitch.styled'

const DarkModeToggleSwitch = () => {
  const dispatch = useAppDispatch()
  const { themeMode } = useAppSelector((state) => state.auth_reducer)

  return (
    <StyledDarkModeToggleSwitch
      defaultChecked={themeMode === 'dark'}
      checkedChildren="🌙"
      unCheckedChildren="🌞"
      onChange={() => dispatch(toggleTheme())}
    />
  )
}

export default DarkModeToggleSwitch
