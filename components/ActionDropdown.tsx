import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { Models } from 'node-appwrite'
import React from 'react'

const ActionDropdown = ({file}: {file: Models.Document}) => {
  return (
    <div>ActionDropdown</div>
  )
}

export default ActionDropdown