import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BackToTop from "./components/BackToTop";
import CustomCursor from "./components/CustomCursor";
import Chatbot from "./components/chatbot/Chatbot";

// Lazy-load ProjectDetail — it's only needed on /project/:id routes
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/project/:id"
              element={
                <Suspense fallback={
                  <div className="min-h-screen bg-background flex items-center justify-center">
                    <div className="font-mono text-sm text-muted-foreground animate-pulse">
                      LOADING_PROJECT...
                    </div>
                  </div>
                }>
                  <ProjectDetail />
                </Suspense>
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BackToTop />
          <CustomCursor />
          <Chatbot />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
