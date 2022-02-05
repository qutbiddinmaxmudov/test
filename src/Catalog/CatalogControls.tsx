import { TablePagination } from '@mui/material'
import React, { useLayoutEffect } from 'react'

type Props = {
  count: number
  setPhotos: React.Dispatch<React.SetStateAction<[number, number]>>
}

const options = [10, 25, 50].map((item) => ({ value: item, label: `${item}` }))

const CatalogControls = ({ count, setPhotos }: Props) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

  useLayoutEffect(() => {
    const from = rowsPerPage * page
    const to = rowsPerPage * page + rowsPerPage
    setPhotos([from, to])
  }, [page, rowsPerPage])

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <TablePagination
      sx={{
        marginBottom: 0,
      }}
      component="div"
      count={count}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={options}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}

export default CatalogControls
