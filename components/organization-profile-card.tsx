import { MapPin, Mail, Phone, Users, Heart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function OrganizationProfileCard() {
  return (
    <Card className="max-w-md mx-auto p-6 border border-border">
      {/* Logo */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-accent to-accent/60 mx-auto mb-4" />

      {/* Info */}
      <h3 className="text-xl font-bold text-foreground text-center mb-1">Eco Comunidad</h3>
      <p className="text-center text-muted-foreground mb-4">Organización sin ánimo de lucro</p>

      {/* Contact Info */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          info@ecocomunidad.org
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4" />
          +34 91 234 5678
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          Madrid, España
        </div>
      </div>

      {/* Categories */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground mb-2">Áreas de Enfoque</p>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">Ambiente</Badge>
          <Badge variant="outline">Sostenibilidad</Badge>
          <Badge variant="outline">Educación</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">
            <Users className="w-6 h-6 inline" />
          </p>
          <p className="text-xs text-muted-foreground">127 Voluntarios</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">
            <Heart className="w-6 h-6 inline" />
          </p>
          <p className="text-xs text-muted-foreground">12 Proyectos</p>
        </div>
      </div>

      {/* About */}
      <p className="text-sm text-muted-foreground mb-4">
        Trabajamos para proteger el medio ambiente a través de proyectos de reforestación, limpieza de playas y
        educación ambiental.
      </p>

      <Button variant="outline" className="w-full bg-transparent">
        Editar Perfil
      </Button>
    </Card>
  )
}
