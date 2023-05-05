// ** React Imports
import { ReactNode } from 'react'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Component Import

const Error = () => <div>Error401</div>

Error.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Error
