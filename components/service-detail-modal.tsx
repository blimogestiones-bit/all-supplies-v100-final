"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, X } from "lucide-react"

interface ServiceDetailProps {
  title: string
  description: string
  icon: React.ReactNode
  color: string
  features: string[]
  benefits: string[]
  applications: string[]
  triggerText: string
}

export function ServiceDetailModal({
  title,
  description,
  icon,
  color,
  features,
  benefits,
  applications,
  triggerText,
}: ServiceDetailProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button variant="outline" className="mt-4 w-full group" onClick={() => setIsOpen(true)}>
        {triggerText}
        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto w-full">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`p-3 ${color} rounded-full`}>{icon}</div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
                    <p className="text-slate-600 mt-1">{description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                {/* Características */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Características Principales</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Beneficios */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg text-slate-900">Beneficios Clave</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Aplicaciones */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg text-slate-900">Aplicaciones y Sectores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {applications.map((application, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {application}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                  Solicitar Consulta Especializada
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
