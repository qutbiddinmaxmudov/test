import React, { useCallback, useEffect, useState } from 'react'
import { Box, ImageList, TextField, Typography } from '@mui/material'
import CatalogItem from './CatalogItem'
import CatalogControls from './CatalogControls'
import CatalogModal from './CatalogModal'

type Props = {}

export type dataType = {
  albumId: number
  id: number
  title: string
  url: string
  thumbnailUrl: string
}

const Catalog = (props: Props) => {
  const [allImages, setAllImages] = useState<dataType[]>([])
  const [images, setImages] = useState<dataType[] | null>(null)
  const [interval, setInterval] = useState<[number, number]>([0, 100])
  const [selectImage, setselectImage] = useState<null | dataType>(null)
  const [album, setAlbum] = useState('')
  const closeModal = useCallback(() => setselectImage(null), [])

  const deleteFunc = (id: number) =>
    setAllImages((imgs) => imgs?.filter((item) => item.id !== id) || [])

  const handleAlbumChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAlbum(e.target.value)

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch('http://jsonplaceholder.typicode.com/photos')
        const data = await res.json()
        setAllImages(data)
      } catch (error) {
        console.log('Загрузка безуспешна!')
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const filteredByAlbumImages = album
      ? allImages.filter((item) => item.albumId === parseInt(album))
      : allImages
    setImages(filteredByAlbumImages)
  }, [allImages, album])

  return (
    <>
      <Typography variant="h1" color={'white'} textAlign="center" paddingY={2}>
        Catalog
      </Typography>
      {images ? (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            flexWrap={'wrap'}
            padding={'15px'}
            sx={{
              position: 'sticky',
              top: 0,
              zIndex: 5,
              backdropFilter: 'blur(15px)',
              background: 'rgba(255,255,255,0.5)',
            }}
          >
            <TextField
              label="Outlined"
              value={album}
              onChange={handleAlbumChange}
            />
            <CatalogControls count={images.length} setPhotos={setInterval} />
          </Box>

          <ImageList
            gap={5}
            sx={{
              gridTemplateColumns: {
                xs: 'repeat(2,1fr) !important',
                sm: 'repeat(3,1fr) !important',
                md: 'repeat(4,1fr) !important',
                xl: 'repeat(5,1fr) !important',
              },
              marginBottom: 0,
            }}
          >
            {images.slice(...interval).map((item) => (
              <CatalogItem
                key={item.id}
                data={item}
                selectFunc={setselectImage}
                deleteFunc={deleteFunc}
              />
            ))}
          </ImageList>
        </>
      ) : (
        <Typography
          variant="h2"
          color={'white'}
          textAlign="center"
          paddingY={2}
        >
          Loading
        </Typography>
      )}
      <CatalogModal
        open={Boolean(selectImage)}
        handleClose={closeModal}
        data={selectImage}
      />
    </>
  )
}

export default Catalog
