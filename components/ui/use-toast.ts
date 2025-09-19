"use client"

import { toast as sonnerToast } from "sonner"

export type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive" | "success"
}

export function toast({ title, description, variant = "default" }: ToastProps) {
  if (variant === "destructive") {
    return sonnerToast.error(title, {
      description,
    })
  }
  
  if (variant === "success") {
    return sonnerToast.success(title, {
      description,
    })
  }
  
  return sonnerToast(title, {
    description,
  })
}

export const useToast = () => {
  return {
    toast,
    success: (title: string, description?: string) => toast({ title, description, variant: "success" }),
    error: (title: string, description?: string) => toast({ title, description, variant: "destructive" }),
    info: (title: string, description?: string) => toast({ title, description, variant: "default" }),
  }
}
