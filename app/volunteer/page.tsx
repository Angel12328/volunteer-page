"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "./loading";
import {
  Heart,
  MapPin,
  Calendar,
  Users,
  Search,
  Filter,
  Bookmark,
  Link,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";

export default function VolunteerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  // verificar si el usuario está autenticado
  useEffect(() => {
    if (status === "loading") return; // Esperar a que se cargue la sesión
    if (!session?.user) {
      router.push("/login");
    }
  }, [session, router]);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session?.user) {
    return <div>Redirigiendo...</div>;
  }
  // Mock data de oportunidades
  const opportunities = [
    {
      id: 1,
      title: "Limpieza de Playas",
      organization: "Eco Comunidad",
      description: "Ayuda a limpiar y conservar nuestras playas",
      location: "Playa Central",
      date: "15 Enero 2025",
      volunteers: 24,
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
      category: "Ambiente",
    },
    {
      id: 2,
      title: "Tutoría para Niños",
      organization: "Educación para Todos",
      description: "Enseña materias básicas a niños de comunidades vulnerables",
      location: "Centro Educativo",
      date: "20 Enero 2025",
      volunteers: 12,
      image: "bg-gradient-to-br from-purple-400 to-purple-600",
      category: "Educación",
    },
    {
      id: 3,
      title: "Asilo de Ancianos",
      organization: "Corazón Solidario",
      description: "Acompañamiento y cuidado para adultos mayores",
      location: "Casa de Reposo",
      date: "18 Enero 2025",
      volunteers: 8,
      image: "bg-gradient-to-br from-pink-400 to-pink-600",
      category: "Asistencia Social",
    },
    {
      id: 4,
      title: "Reforestación Urbana",
      organization: "Eco Comunidad",
      description: "Planta árboles para mejorar la calidad del aire",
      location: "Parque Central",
      date: "22 Enero 2025",
      volunteers: 35,
      image: "bg-gradient-to-br from-green-400 to-green-600",
      category: "Ambiente",
    },
  ];

  const myApplications = [
    {
      id: 1,
      title: "Limpieza de Playas",
      organization: "Eco Comunidad",
      status: "Aceptado",
      date: "15 Enero 2025",
    },
    {
      id: 2,
      title: "Tutoría para Niños",
      organization: "Educación para Todos",
      status: "Pendiente",
      date: "20 Enero 2025",
    },
  ];
  /*
  // verificar si el usuario está autenticado
  const { data: session } = useSession();
  if (!session?.user) {
    const router = useRouter();
    router.push("/login");
    return null; //
  }
*/
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary fill-primary" />
            <a href="/">
              <span className="text-2xl font-bold text-foreground">
                VolunteerHub
              </span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-foreground">
              {session.user.name} {session.user.apellido}
            </span>
            <Button
              variant="outline"
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Salir
            </Button>
          </div>
        </div>
      </header>

      {/* Sidebar Navigation */}
      <div className="flex">
        <aside className="w-64 border-r border-border min-h-screen bg-muted/20 p-6">
          <nav className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase">
                Menú
              </p>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 bg-primary/10 text-primary"
              >
                <Heart className="w-4 h-4" />
                Oportunidades
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Bookmark className="w-4 h-4" />
                Mis Postulaciones
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="w-4 h-4" />
                Mi Perfil
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              Bienvenido, {session.user.name}!
            </h1>
            <p className="text-muted-foreground">
              Encuentra oportunidades para hacer una diferencia
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Buscar oportunidades..." className="pl-10" />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="w-4 h-4" />
              Filtros
            </Button>
          </div>

          {/* Oportunidades Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Oportunidades Disponibles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
              {opportunities.map((opp) => (
                <Card
                  key={opp.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow border border-border"
                >
                  {/* Card Header with Image */}
                  <div className={`h-40 ${opp.image}`} />

                  {/* Card Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs font-semibold text-primary uppercase mb-1">
                          {opp.category}
                        </p>
                        <h3 className="text-xl font-bold text-foreground">
                          {opp.title}
                        </h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-primary"
                      >
                        <Bookmark className="w-5 h-5" />
                      </Button>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3">
                      {opp.organization}
                    </p>
                    <p className="text-sm text-foreground mb-4">
                      {opp.description}
                    </p>

                    {/* Details */}
                    <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {opp.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {opp.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {opp.volunteers} voluntarios inscritos
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Postularme
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Mis Postulaciones */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Mis Postulaciones
            </h2>
            <div className="space-y-4">
              {myApplications.map((app) => (
                <Card
                  key={app.id}
                  className="p-6 border border-border flex items-center justify-between"
                >
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {app.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {app.organization}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {app.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        app.status === "Aceptado"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {app.status}
                    </span>
                    <Button variant="outline" size="sm">
                      Ver Detalles
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
