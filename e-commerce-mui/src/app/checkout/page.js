import { Grid } from '@mui/material'
import Image from 'next/image'
import React from 'react'

const Checkout = () => {
  return (
    <Grid justifyContent="center" alignItems="center">
        <Image src="/images/thanks.jpg" alt='thank you' width={1670} height={890}></Image>
    </Grid>
  )
}

export default Checkout;
