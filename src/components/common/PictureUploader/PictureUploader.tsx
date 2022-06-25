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
}: {
  text: string
  onClick?: React.MouseEventHandler<HTMLElement>
  style?: React.CSSProperties
  setSelectedImageBlob?: any
}) => {
  return (
    <PictureUploaderLabel>
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
