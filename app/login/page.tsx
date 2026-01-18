"use client";
import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Heart, ChevronDown } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [userType, setUserType] = useState<"volunteer" | "organization">(
    "volunteer"
  );
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      console.log("Login result:", result);

      if (result?.error) {
        console.error("Login error:", result.error);
        setError(result.error || "Credenciales inválidas");
      } else if (result?.ok) {
        console.log("Login exitoso");
        const redirectPath = userType === "volunteer" ? "/volunteer" : "/organization";
        router.push(redirectPath);
      }
    } catch (error) {
      setError("Ocurrió un error durante el inicio de sesión");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 mb-6">
            <Heart className="w-6 h-6 text-primary fill-primary" />
            <span className="text-xl font-bold text-foreground">
              VolunteerHub
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bienvenido de Vuelta
          </h1>
          <p className="text-muted-foreground">Inicia sesión en tu cuenta</p>
        </div>
        
        <Card className="p-8 border border-border">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-4 bg-destructive/10 text-destructive text-sm rounded-lg">
                {error}
              </div>
            )}

            {/* User Type Selector */}
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium text-foreground">
                Tipo de Cuenta
              </label>
              <div className="relative">
                <select
                  value={userType}
                  onChange={(e) =>
                    setUserType(e.target.value as "volunteer" | "organization")
                  }
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg appearance-none text-foreground cursor-pointer"
                >
                  <option value="volunteer">Voluntario</option>
                  <option value="organization">Organización</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                type="email"
                name="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="bg-input"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">
                  Contraseña
                </label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  ¿Olvidaste?
                </Link>
              </div>
              <Input
                type="password"
                name="password"
                placeholder="Tu contraseña"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="bg-input"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary hover:bg-primary/90 mt-6"
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>

            {/* Signup Link */}
            <div className="pt-4 border-t border-border">
              <p className="text-center text-sm text-muted-foreground">
                ¿No tienes cuenta?{" "}
                <Link
                  href="/"
                  className="text-primary hover:underline font-medium"
                >
                  Regístrate
                </Link>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </main>
  );
}
