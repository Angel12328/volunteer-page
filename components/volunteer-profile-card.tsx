import { MapPin, Mail, Phone } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function VolunteerProfileCard() {
  return (
    <Card className="max-w-md mx-auto p-6 border border-border">
      {/* Avatar */}
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 mx-auto mb-4" />

      {/* Info */}
      <h3 className="text-xl font-bold text-foreground text-center mb-1">Juan Pérez López</h3>
      <p className="text-center text-muted-foreground mb-4">Voluntario Activo</p>

      {/* Contact Info */}
      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          juan@example.com
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="w-4 h-4" />
          +34 612 345 678
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4" />
          Madrid, España
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <p className="text-sm font-semibold text-foreground mb-2">Habilidades</p>
        <div className="flex flex-wrap gap-2">
          <Badge>Educación</Badge>
          <Badge>Ambiente</Badge>
          <Badge>Social</Badge>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">8</p>
          <p className="text-xs text-muted-foreground">Horas Voluntarias</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">2</p>
          <p className="text-xs text-muted-foreground">Proyectos Completados</p>
        </div>
      </div>

      {/* About */}
      <p className="text-sm text-muted-foreground mb-4">
        Apasionado por la educación y el medio ambiente. Busco contribuir a proyectos que generen impacto positivo en la
        comunidad.
      </p>

      <Button className="w-full bg-primary hover:bg-primary/90">Editar Perfil</Button>
    </Card>
  )
}
