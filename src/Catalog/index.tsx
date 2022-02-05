import React, { useCallback, useEffect, useState } from 'react'
import { ImageList, Typography } from '@mui/material'
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
  const closeModal = useCallback(() => setselectImage(null), [])

  const deleteFunc = (id: number) =>
    setAllImages((imgs) => imgs?.filter((item) => item.id !== id) || [])

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
    setImages(allImages)
  }, [allImages])

  return (
    <>
      <Typography variant="h1" color={'white'} textAlign="center" paddingY={2}>
        Catalog
      </Typography>
      {images ? (
        <>
          <CatalogControls count={images.length} setPhotos={setInterval} />
          <ImageList
            gap={5}
            sx={{
              gridTemplateColumns: 'repeat(5,1fr) !important',
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
