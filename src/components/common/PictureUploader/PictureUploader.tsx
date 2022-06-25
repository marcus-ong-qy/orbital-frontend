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
  setSelectedImage,
}: {
  text: string
  onClick?: React.MouseEventHandler<HTMLElement>
  style?: React.CSSProperties
  setSelectedImage?: any
}) => {
  return (
    <PictureUploaderLabel>
      <input
        type="file"
        onClick={onClick}
        style={style}
        onChange={(e) => setSelectedImage(URL.createObjectURL(e.target.files![0]))}
      />
      {text}
    </PictureUploaderLabel>
  )
}

export default PictureUploader
