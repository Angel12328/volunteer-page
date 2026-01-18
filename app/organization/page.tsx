"use client";

import {
  BarChart3,
  Users,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function OrganizationDashboard() {
  // Verificar autenticación
  const { data: session } = useSession();
  if (!session?.user) {
    const router = useRouter();
    router.push("/login");
    return null; //
  }

  // Mock data de oportunidades creadas
  const opportunities = [
    {
      id: 1,
      title: "Limpieza de Playas",
      description: "Ayuda a limpiar y conservar nuestras playas",
      date: "15 Enero 2025",
      applications: 24,
      accepted: 18,
      pending: 6,
      status: "Activa",
    },
    {
      id: 2,
      title: "Reforestación Urbana",
      description: "Planta árboles para mejorar la calidad del aire",
      date: "22 Enero 2025",
      applications: 35,
      accepted: 28,
      pending: 7,
      status: "Activa",
    },
    {
      id: 3,
      title: "Donación de Alimentos",
      description: "Recolecta y distribuye alimentos a comunidades vulnerables",
      date: "25 Diciembre 2024",
      applications: 42,
      accepted: 40,
      pending: 0,
      status: "Completada",
    },
  ];

  const stats = [
    { label: "Oportunidades Activas", value: "2", icon: BarChart3 },
    { label: "Voluntarios Totales", value: "97", icon: Users },
    { label: "Postulaciones Pendientes", value: "13", icon: Clock },
  ];

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">
              VolunteerHub
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-foreground">{session.user.name}</span>
            <Button variant="outline">Salir</Button>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex">
        <aside className="w-64 border-r border-border min-h-screen bg-muted/20 p-6">
          <nav className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-muted-foreground uppercase">
                Menú
              </p>
              <Button
                variant="ghost"
                className="w-full justify-start gap-2 bg-accent/10 text-accent"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Users className="w-4 h-4" />
                Voluntarios
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Eye className="w-4 h-4" />
                Perfil
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Welcome Section */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                {session.user.name}, Gestiona tus oportunidades de voluntariado
              </p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="gap-2 bg-accent hover:bg-accent/90">
                  <Plus className="w-4 h-4" />
                  Nueva Oportunidad
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Crear Nueva Oportunidad</DialogTitle>
                  <DialogDescription>
                    Completa los detalles de la oportunidad de voluntariado
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Título
                    </label>
                    <Input
                      placeholder="Título de la oportunidad"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Descripción
                    </label>
                    <Input
                      placeholder="Descripción detallada"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Ubicación
                    </label>
                    <Input placeholder="Ubicación" className="mt-1" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Fecha
                    </label>
                    <Input type="date" className="mt-1" />
                  </div>
                  <Button className="w-full bg-accent hover:bg-accent/90">
                    Crear Oportunidad
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {stats.map((stat, idx) => (
              <Card key={idx} className="p-6 border border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-foreground">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className="w-10 h-10 text-muted-foreground/30" />
                </div>
              </Card>
            ))}
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

          {/* Opportunities Table */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Mis Oportunidades
            </h2>
            <div className="space-y-4">
              {opportunities.map((opp) => (
                <Card key={opp.id} className="p-6 border border-border">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">
                          {opp.title}
                        </h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            opp.status === "Activa"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {opp.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {opp.description}
                      </p>

                      <div className="flex flex-wrap gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {opp.date}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {opp.applications} postulaciones
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-green-600">
                            {opp.accepted} aceptados
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-yellow-600" />
                          <span className="text-yellow-600">
                            {opp.pending} pendientes
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 ml-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 bg-transparent"
                      >
                        <Eye className="w-4 h-4" />
                        Ver
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 bg-transparent"
                      >
                        <Edit2 className="w-4 h-4" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1 text-destructive bg-transparent"
                      >
                        <Trash2 className="w-4 h-4" />
                        Eliminar
                      </Button>
                    </div>
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
