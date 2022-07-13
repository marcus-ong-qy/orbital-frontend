import { PictureUploaderLabel } from './styles/PictureUploader.styled'

/**
 *
 * currently only accepts 1 file at a time
 *
 */

const PictureUploader = ({
  text,
  onClick,
  style,
  setSelectedImageBlob,

  color,
}: {
  text: string
  onClick?: React.MouseEventHandler<HTMLElement>
  style?: React.CSSProperties
  setSelectedImageBlob?: any
  color?: 'primary' | 'secondary'
}) => {
  return (
    <PictureUploaderLabel background={color ?? 'secondary'}>
      <input
        type="file"
        onClick={onClick}
        style={style}
        onChange={(e) => setSelectedImageBlob(e.target.files![0])}
      />
      {text}
    </PictureUploaderLabel>
  )
}

export default PictureUploader
