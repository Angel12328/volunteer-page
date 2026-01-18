"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Heart } from "lucide-react"

export function OrganizationSignupForm() {
  const [formData, setFormData] = useState({
    organizationName: "",
    email: "",
    contactPerson: "",
    password: "",
    confirmPassword: "",
    website: "",
    description: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      setIsLoading(false)
      return
    }

    // TODO: Implement signup logic
    console.log("Organization signup:", formData)
    setIsLoading(false)
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="text-xl font-bold text-foreground">VolunteerHub</span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Organización</h1>
          <p className="text-muted-foreground">Accede a voluntarios comprometidos</p>
        </div>

        <Card className="p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-lg">{error}</div>}

            {/* Organization Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Nombre de la Organización</label>
              <Input
                type="text"
                name="organizationName"
                placeholder="Tu organización"
                value={formData.organizationName}
                onChange={handleInputChange}
                required
                className="bg-input"
              />
            </div>

            {/* Contact Person */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Persona de Contacto</label>
              <Input
                type="text"
                name="contactPerson"
                placeholder="Nombre del contacto"
                value={formData.contactPerson}
                onChange={handleInputChange}
                required
                className="bg-input"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                name="email"
                placeholder="contacto@organizacion.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-input"
              />
            </div>

            {/* Website */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Sitio Web</label>
              <Input
                type="url"
                name="website"
                placeholder="https://tuorganizacion.com"
                value={formData.website}
                onChange={handleInputChange}
                className="bg-input"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Contraseña</label>
              <Input
                type="password"
                name="password"
                placeholder="Mínimo 8 caracteres"
                value={formData.password}
                onChange={handleInputChange}
                required
                minLength={8}
                className="bg-input"
              />
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Confirmar Contraseña</label>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirma tu contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                minLength={8}
                className="bg-input"
              />
            </div>

            {/* Submit Button */}
            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 mt-6">
              {isLoading ? "Registrando..." : "Crear Cuenta"}
            </Button>

            {/* Login Link */}
            <div className="pt-4 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
                <Link href="/login" className="text-primary hover:underline font-medium">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </main>
  )
}
