import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Heart, Users, Briefcase, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <span className="text-2xl font-bold text-foreground">VolunteerHub</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="ghost">Ingresar</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90">Registrarse</Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-6 text-balance">
            Conecta tu Pasión con tu Comunidad
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Una plataforma donde voluntarios y organizaciones se encuentran para crear un impacto positivo en la
            sociedad.
          </p>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Volunteer Card */}
            <Card className="p-8 bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer group">
              <Link href="/signup/volunteer" className="flex flex-col items-center gap-4">
                <div className="p-4 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Soy Voluntario</h2>
                <p className="text-muted-foreground">
                  Encuentra oportunidades para hacer una diferencia en tu comunidad
                </p>
                <Button className="mt-4 gap-2 bg-primary hover:bg-primary/90 w-full">
                  Comenzar <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>

            {/* Organization Card */}
            <Card className="p-8 bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer group">
              <Link href="/signup/organization" className="flex flex-col items-center gap-4">
                <div className="p-4 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                  <Briefcase className="w-8 h-8 text-accent" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Soy Organización</h2>
                <p className="text-muted-foreground">Conecta con voluntarios comprometidos para tus proyectos</p>
                <Button
                  variant="outline"
                  className="mt-4 gap-2 w-full border-accent text-accent hover:bg-accent/10 bg-transparent"
                >
                  Comenzar <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">¿Por qué unirse?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "Haz Impacto",
                description: "Contribuye directamente a proyectos que transforman vidas en tu comunidad",
              },
              {
                icon: Users,
                title: "Conecta con Otros",
                description: "Conoce personas apasionadas por el voluntariado y el cambio social",
              },
              {
                icon: Briefcase,
                title: "Desarrolla Habilidades",
                description: "Aprende nuevas competencias mientras ayudas a otros",
              },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 border border-border">
                <feature.icon className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Heart className="w-6 h-6 text-primary fill-primary" />
              <span className="text-lg font-semibold text-foreground">VolunteerHub</span>
            </div>
            <p className="text-sm text-muted-foreground text-center">
              © 2025 VolunteerHub. Conectando voluntarios con oportunidades.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
