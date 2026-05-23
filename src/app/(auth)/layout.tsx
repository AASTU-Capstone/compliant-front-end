"use client";

import { IconShieldCheck, IconLock, IconUserShield } from "@tabler/icons-react";

const features = [
  {
    icon: IconShieldCheck,
    title: "100% Anonymous",
    description: "Your identity is never revealed to anyone in the process",
  },
  {
    icon: IconLock,
    title: "End-to-End Encrypted",
    description: "All communications are secured with enterprise-grade encryption",
  },
  {
    icon: IconUserShield,
    title: "Safe & Secure",
    description: "Report concerns without fear of retaliation",
  },
];

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-2 min-h-screen">
        {/* Left Panel - Branding & Features */}
        <div className="hidden lg:flex flex-col justify-between bg-[#1a1a1a] text-white p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-white blur-3xl" />
            <div className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-primary blur-3xl" />
          </div>
          
          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <IconShieldCheck className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-heading font-semibold">Anon Whisper</span>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="relative z-10 space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-heading font-bold leading-tight text-balance">
                Speak up safely.
                <br />
                <span className="text-primary">Stay anonymous.</span>
              </h1>
              <p className="text-lg text-gray-400 max-w-md leading-relaxed">
                A secure platform for submitting complaints while keeping your identity completely protected.
              </p>
            </div>
            
            {/* Features */}
            <div className="space-y-6 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="relative z-10">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Anon Whisper. All rights reserved.
            </p>
          </div>
        </div>
        
        {/* Right Panel - Auth Form */}
        <div className="flex flex-col min-h-screen">
          {/* Mobile Header */}
          <div className="lg:hidden p-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <IconShieldCheck className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-heading font-semibold text-foreground">Anon Whisper</span>
            </div>
          </div>
          
          {/* Form Container */}
          <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
            <div className="w-full max-w-[420px] auth-fade-in">
              {children}
            </div>
          </div>
          
          {/* Mobile Footer */}
          <div className="lg:hidden p-6 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Anon Whisper. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
