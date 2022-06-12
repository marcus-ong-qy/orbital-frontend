import { useAppDispatch, useAppSelector } from '../../../app/hooks'

const UploadListingPage = () => {
  const dispatch = useAppDispatch()
  const { newListing } = useAppSelector((state) => state.marketplace_reducer)
  const { name, price, description, typeOfTransaction, deliveryInformation, tags, imageURL } = {
    ...newListing,
  }

  return (
    <div>
      <h1>Upload Listing Page</h1>
      <div>Type: {typeOfTransaction}</div>
    </div>
  )
}

export default UploadListingPage
