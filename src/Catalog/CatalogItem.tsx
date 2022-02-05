import React, { memo } from 'react'
import { IconButton, ImageListItem, ImageListItemBar } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { dataType } from '.'

type Props = {
  data: dataType
  selectFunc: React.Dispatch<dataType | null>
  deleteFunc: (id: number) => void
}

const CatalogItem = ({ data, selectFunc, deleteFunc }: Props) => {
  const selectImage = () => selectFunc(data)
  const deleteImage = () => deleteFunc(data.id)

  return (
    <ImageListItem>
      <img
        src={data.thumbnailUrl}
        alt={data.title}
        loading="lazy"
        onClick={selectImage}
      />
      <ImageListItemBar
        title={data.title}
        actionIcon={
          <IconButton
            onClick={deleteImage}
            sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            aria-label={`info about ${data.title}`}
          >
            <DeleteIcon />
          </IconButton>
        }
      />
    </ImageListItem>
  )
}

export default memo(CatalogItem, (prev, next) => prev.data.id === next.data.id)
