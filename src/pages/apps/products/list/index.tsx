// ** React Imports
import { useState, useEffect, MouseEvent, ElementType, ChangeEvent, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'
import { GetStaticProps, InferGetStaticPropsType } from 'next/types'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import { DataGrid, GridColumns } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import CardContent from '@mui/material/CardContent'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Button, { ButtonProps } from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CardStatisticsHorizontal from 'src/@core/components/card-statistics/card-stats-horizontal'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchDataProduct, deleteProduct, editProduct, updateProduct } from 'src/store/apps/products'

// ** Third Party Components
import axios from 'axios'

// ** Types Imports
import { RootState, AppDispatch } from 'src/store'
import { CardStatsType } from 'src/@fake-db/types'
import { ThemeColor } from 'src/@core/layouts/types'
import { UsersType, ProductType } from 'src/types/apps/userTypes'
import { CardStatsHorizontalProps } from 'src/@core/components/card-statistics/types'

// ** Custom Table Components Imports
import TableHeader from 'src/views/apps/user/list/TableHeaderProduct'
import AddProductDrawer from 'src/views/apps/user/list/AddProductDrawer'
import { fetchDataActiveSubCategory } from 'src/store/apps/sub-category'
import { fetchDataActiveCategory } from 'src/store/apps/category'
import UserSuspendDialog from 'src/views/apps/user/view/UserSuspendDialog'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

let data: UsersType = {
  id: 1,
  role: 'admin',
  status: 'active',
  username: 'gslixby0',
  avatarColor: 'primary',
  country: 'El Salvador',
  company: 'Yotz PVT LTD',
  contact: '(479) 232-9151',
  current_plan: 'enterprise',
  fullName: 'Daisy Patterson',
  email: 'gslixby0@abc.net.au',
  avatar: '/images/avatars/4.png'
}
interface UserRoleType {
  [key: string]: { icon: string; color: string }
}

interface UserStatusType {
  [key: string]: ThemeColor
}

// ** Vars
const userRoleObj: UserRoleType = {
  admin: { icon: 'mdi:laptop', color: 'error.main' },
  author: { icon: 'mdi:cog-outline', color: 'warning.main' },
  editor: { icon: 'mdi:pencil-outline', color: 'info.main' },
  maintainer: { icon: 'mdi:chart-donut', color: 'success.main' },
  subscriber: { icon: 'mdi:account-outline', color: 'primary.main' }
}

interface CellType {
  row: ProductType
}

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 600,
  fontSize: '1rem',
  cursor: 'pointer',
  textDecoration: 'none',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))

// ** renders client column
const renderClient = (row: UsersType) => {
  if (row.avatar) {
    return <CustomAvatar src={row.avatar} sx={{ mr: 3, width: 34, height: 34 }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}
      >
        {getInitials(row.fullName ? row.fullName : 'John Doe')}
      </CustomAvatar>
    )
  }
}

const RowOptions = ({ id }: { id: number | string }) => {
  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [editUserOpen, setEditUserOpen] = useState<boolean>(false)
  const [suspendDialogOpen, setSuspendDialogOpen] = useState<boolean>(false)

  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    dispatch(deleteProduct(id))
    handleRowOptionsClose()
  }

  const [status, setStaus] = useState<string>('1')
  const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
  const [inputValue, setInputValue] = useState<string>('')

  const editstore = useSelector((state: RootState) => state.product.editData)
  const storeSubCategory = useSelector((state: RootState) => state.subCategory.allData)
  const storeCategory = useSelector((state: RootState) => state.category.allData)
  console.log('************store data is', storeSubCategory)
  console.log('storeCategory', storeCategory)
  useEffect(() => {
    debugger
    dispatch(fetchDataActiveSubCategory())
    dispatch(fetchDataActiveCategory())
  }, [dispatch])
  console.log('************store data is', editstore)
  let [editData, setEditData] = useState({
    id: '',
    name: '',
    category: '',
    sub_category: '',
    specification: '',
    description: '',
    image: '',
    status: ''
  })

  useEffect(() => {
    if (editstore) {
      setEditData(editstore)
    }
  }, [editstore])

  const handleEdit = () => {
    dispatch(editProduct(id))
    setOpenEdit(true)
    handleRowOptionsClose()
  }

  const handleInputChange = (e: any) => {
    setEditData({ ...editData, name: e.target.value })
  }

  const handleInputChangeCategory = (e: any) => {
    console.log('category change', e.target.value)
    setEditData({ ...editData, category: e.target.value })
  }

  const handleInputChangeSubCategory = (e: any) => {
    setEditData({ ...editData, sub_category: e.target.value })
  }

  const handleInputChangeDescription = (e: any) => {
    setEditData({ ...editData, description: e.target.value })
  }

  const handleInputChangeSpecification = (e: any) => {
    setEditData({ ...editData, specification: e.target.value })
  }

  const handleInputChangeStatus = (e: any) => {
    setEditData({ ...editData, status: e.target.value })
  }

  const handleEditData = () => {
    console.log('data to send for update', editData)
    editData.image = imgSrc
    dispatch(updateProduct(editData))
  }

  const handleInputImageChange = (file: ChangeEvent) => {
    const reader = new FileReader()
    const { files } = file.target as HTMLInputElement
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result as string)
      reader.readAsDataURL(files[0])

      if (reader.result !== null) {
        setInputValue(reader.result as string)
      }
    }
  }
  const handleInputImageReset = () => {
    setInputValue('')
    setImgSrc('/images/avatars/1.png')
  }

  const toggleEditUserDrawer = () => setEditUserOpen(!editUserOpen)
  // Handle Edit dialog
  const [openEdit, setOpenEdit] = useState<boolean>(false)
  // const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='mdi:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        {/* <MenuItem
          component={Link}
          sx={{ '& svg': { mr: 2 } }}
          onClick={handleRowOptionsClose}
          href='/apps/user/view/overview/'
        >
          <Icon icon='mdi:eye-outline' fontSize={20} />
          View
        </MenuItem> */}
        <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:pencil-outline' fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => setSuspendDialogOpen(true)} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='mdi:delete-outline' fontSize={20} />
          Delete
        </MenuItem>
      </Menu>
      {/* <EditUserDrawer open={editUserOpen} toggle={toggleEditUserDrawer}></EditUserDrawer> */}
      <Dialog
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby='user-view-edit'
        sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
        aria-describedby='user-view-edit-description'
      >
        <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
          Edit Product Information
        </DialogTitle>
        <DialogContent>
          <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
            Update product details here.
          </DialogContentText>
          {editData && (
            <form>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <TextField fullWidth label='Product Name' value={editData.name} onChange={handleInputChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='user-view-language-label'>Category</InputLabel>
                    <Select
                      label='Category'
                      value={editData.category}
                      id='category'
                      labelId='user-view-language-label'
                      onChange={handleInputChangeCategory}
                    >
                      {storeCategory &&
                        storeCategory.map((item: any) => {
                          return <MenuItem value={item.id}>{item.category_name}</MenuItem>
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='user-view-language-label'>Sub Category</InputLabel>
                    <Select
                      label='Sub Category'
                      value={editData.sub_category}
                      id='subcategory'
                      labelId='user-subcat-label'
                      onChange={handleInputChangeSubCategory}
                    >
                      {storeSubCategory &&
                        storeSubCategory.map((item: any) => {
                          return <MenuItem value={item.id}>{item.sub_catname}</MenuItem>
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    type='description'
                    label='Description'
                    value={editData.description}
                    onChange={handleInputChangeDescription}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label='Specification'
                    value={editData.specification}
                    onChange={handleInputChangeSpecification}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id='user-view-language-label'>Select Status</InputLabel>
                    <Select
                      label='Status'
                      value={editData.status}
                      id='role'
                      labelId='user-view-language-label'
                      onChange={handleInputChangeStatus}
                    >
                      <MenuItem value='1'>Active</MenuItem>
                      <MenuItem value='2'>InActive</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ImgStyled src={imgSrc} alt='Profile Pic' />
                  <div>
                    <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                      Upload New Photo
                      <input
                        hidden
                        type='file'
                        value={inputValue}
                        accept='image/png, image/jpeg'
                        onChange={handleInputImageChange}
                        id='account-settings-upload-image'
                      />
                    </ButtonStyled>
                    <ResetButtonStyled color='secondary' variant='outlined' onClick={handleInputImageReset}>
                      Reset
                    </ResetButtonStyled>
                    <Typography sx={{ mt: 5, color: 'text.disabled' }}>
                      Allowed PNG or JPEG. Max size of 800K.
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </form>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button variant='contained' sx={{ mr: 1 }} onClick={handleEditData}>
            Submit
          </Button>
          <Button variant='outlined' color='secondary' onClick={handleEditClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <UserSuspendDialog open={suspendDialogOpen} setOpen={setSuspendDialogOpen} deleteData={id} pageName='Product' />
    </>
  )
}

const columns: GridColumns<ProductType> = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'name',
    headerName: 'Product Name',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <StyledLink href='/apps/user/view/overview/'>{row.name}</StyledLink>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'category',
    headerName: 'Category',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography noWrap variant='body2'>
          {row.category}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'sub_category',
    minWidth: 150,
    headerName: 'Sub Category',
    renderCell: ({ row }: CellType) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3 } }}>
          {/* <Box sx={{ display: 'flex', alignItems: 'center', '& svg': { mr: 3, color: userRoleObj[row.role].color } }}> */}
          {/* <Icon icon={userRoleObj[row.role].icon} fontSize={20} /> */}

          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.sub_category}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Specification',
    field: 'specification',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.specification}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'description',
    headerName: 'Description',
    renderCell: ({ row }: CellType) => {
      return (
        <Typography variant='subtitle1' noWrap sx={{ textTransform: 'capitalize' }}>
          {row.description}
        </Typography>
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 90,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: CellType) => <RowOptions id={row.id} />
  }
]

const UserList = ({ apiData }: InferGetStaticPropsType<typeof getStaticProps>) => {
  // ** State
  const [role, setRole] = useState<string>('')
  const [plan, setPlan] = useState<string>('')
  const [value, setValue] = useState<string>('')
  const [status, setStatus] = useState<string>('')
  const [pageSize, setPageSize] = useState<number>(10)
  const [addUserOpen, setAddUserOpen] = useState<boolean>(false)

  // ** Hooks
  const dispatch = useDispatch<AppDispatch>()
  const store = useSelector((state: RootState) => state.product)
  console.log('************store data is', store)
  // let [usersList, setUsersList] = useState(store.data)
  // if(usersList.length > 0){
  //   usersList.map((item: any) =>{
  //     console.log("item>>>>>>>>>>>>>>>>",item)
  //     if(item.status === "1"){
  //       item.status = "Active"
  //     }
  //     else{
  //       item.status = "InActive"
  //     }
  //     console.log("item after....",item)
  //   })
  // }
  // console.log("************store data is",usersList);

  useEffect(() => {
    dispatch(
      fetchDataProduct({
        role,
        status,
        q: value,
        currentPlan: plan
      })
    )
  }, [dispatch, plan, role, status, value])

  const handleFilter = useCallback((val: string) => {
    setValue(val)
  }, [])

  const handleRoleChange = useCallback((e: SelectChangeEvent) => {
    setRole(e.target.value)
  }, [])

  const handlePlanChange = useCallback((e: SelectChangeEvent) => {
    setPlan(e.target.value)
  }, [])

  const handleStatusChange = useCallback((e: SelectChangeEvent) => {
    setStatus(e.target.value)
  }, [])

  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontal.map((item: CardStatsHorizontalProps, index: number) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatisticsHorizontal {...item} icon={<Icon icon={item.icon as string} />} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <TableHeader value={value} handleFilter={handleFilter} toggle={toggleAddUserDrawer} />
          <DataGrid
            autoHeight
            rows={store.data}
            columns={columns}
            checkboxSelection
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
            onPageSizeChange={(newPageSize: number) => setPageSize(newPageSize)}
          />
        </Card>
      </Grid>

      <AddProductDrawer open={addUserOpen} toggle={toggleAddUserDrawer} />
    </Grid>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get('/cards/statistics')
  const apiData: CardStatsType = res.data

  return {
    props: {
      apiData
    }
  }
}

export default UserList
