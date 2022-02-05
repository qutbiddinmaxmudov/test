import React from 'react'
import { Modal } from '@mui/material'
import { Box, maxHeight, styled } from '@mui/system'
import { dataType } from '.'

type Props = {
  open: boolean
  handleClose: () => void
  data: dataType | null
}

const Img = styled('img')({
  maxWidth: '100%',
  maxHeight: '100%',
  display: 'block',
})

const CatalogModal = ({ open, handleClose, data }: Props) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box maxHeight={'90%'} maxWidth={'90%'}>
        <Img src={data?.url} alt={data?.title} loading="lazy" />
      </Box>
    </Modal>
  )
}

export default CatalogModal
