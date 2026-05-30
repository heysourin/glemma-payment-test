"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Sun,
  Moon,
  CloudSun,
  TrendingUp,
  AlertTriangle,
  Target,
  Leaf,
  ShieldAlert,
  Search,
  Lightbulb,
  Sparkles,
  Crown,
  Download,
} from "lucide-react";

/* ───────── types ───────── */

interface SkinCondition {
  severity?: string;
  confidence: number;
  quality?: string;
  evenness?: string;
  visibility?: string;
  severityScore?: number;
}

interface Recommendation {
  category: string;
  product: string;
  reason: string;
  priority: string;
}

interface WeeklyProgressTracking {
  currentState: string;
  areasImproving: string[];
  areasNeedingAttention: string[];
  focusThisWeek: string;
}

interface LifestyleEngineEntry {
  recommendation: string;
  skinImpact: string;
}

interface ProductConflict {
  conflict: string;
  explanation: string;
  solution: string;
}

interface SkinPrediction {
  concern: string;
  likelihood: string;
  preventiveAction: string;
}

interface IngredientToAvoid {
  ingredient: string;
  reason: string;
}

interface AnalysisResults {
  tier?: string;
  skinType?: string;
  skinConditions: Record<string, SkinCondition>;
  recommendations: Recommendation[];
  overallScore: number;
  // Glow
  weeklyProgressTracking?: WeeklyProgressTracking;
  weeklyRoutine?: { morning: string[]; evening: string[] };
  lifestyleSuggestions?: string[];
  // Glow Pro
  dailyRoutine?: { morning: string[]; afternoon: string[]; evening: string[] };
  lifestyleEngine?: Record<string, LifestyleEngineEntry>;
  productStackOptimization?: ProductConflict[];
  skinPatternIntelligence?: { predictions: SkinPrediction[] };
  productAudit?: { ingredientsToAvoid: IngredientToAvoid[] };
}

interface ImageInfo {
  name: string;
  index: number;
  size: number;
  type: string;
}

/* ───────── helpers ───────── */

const getValue = (c: SkinCondition) =>
  c.severity ?? c.quality ?? c.evenness ?? c.visibility ?? "unknown";

const formatValue = (v: string) => {
  if (v === "none") return "Not detected";
  if (v === "unknown") return "Unclear";
  return v.charAt(0).toUpperCase() + v.slice(1);
};

const formatKey = (k: string) =>
  k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase());

const getScoreText = (score: number) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs attention";
};

const severityColor = (score: number) => {
  if (score <= 3) return "bg-emerald-400";
  if (score <= 6) return "bg-amber-400";
  return "bg-red-400";
};

/* ───────── section wrapper ───────── */

function Section({
  title,
  badge,
  children,
}: {
  title: string;
  badge?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <h3 className="font-serif text-2xl">{title}</h3>
        {badge && (
          <span className="text-[9px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1 rounded-full bg-[#f2e7e5] text-[#bf908a]">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

/* ───────── page ───────── */

export default function AnalyzePage() {
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [imageInfo, setImageInfo] = useState<ImageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const router = useRouter();
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("analysisResults");
    const storedImageInfo = sessionStorage.getItem("imageInfo");

    if (storedResults) {
      try {
        setResults(JSON.parse(storedResults));
        if (storedImageInfo) {
          setImageInfo(JSON.parse(storedImageInfo));
        }
      } catch {
        router.push("/");
      }
    } else {
      router.push("/");
    }

    setLoading(false);
  }, [router]);

  const clearResults = () => {
    sessionStorage.clear();
    router.push("/");
  };

  const handleDownloadPDF = useCallback(() => {
    setIsGeneratingPDF(true);

    // Inject a print-optimized stylesheet
    const style = document.createElement("style");
    style.id = "glemma-print-styles";
    style.textContent = `
      @media print {
        /* Hide navbar, footer, and CTA buttons section */
        [data-print-hide] {
          display: none !important;
        }

        /* Reset page background */
        body, html {
          background: white !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* Remove top padding added for fixed navbar */
        .pt-\\[70px\\] {
          padding-top: 0 !important;
        }

        /* Clean up main container for print */
        main {
          padding: 1rem !important;
          margin: 0 !important;
          min-height: auto !important;
        }

        /* Page setup */
        @page {
          size: A4;
          margin: 1.5cm 2cm;
        }

        /* Ensure cards don't break across pages */
        .rounded-2xl {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        /* Print-friendly backgrounds */
        .bg-white\\/60, .bg-\\[\\#f2e7e5\\]\\/60 {
          background: #fafafa !important;
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* Keep severity bar colors */
        .bg-emerald-400, .bg-amber-400, .bg-red-400 {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }

        /* Keep badge/priority colors */
        [class*="bg-red-50"], [class*="bg-amber-50"], [class*="bg-emerald-50"],
        .bg-\\[\\#f2e7e5\\] {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
      }
    `;
    document.head.appendChild(style);

    // Mark Navbar and Footer for hiding during print
    const navbar = document.querySelector("nav");
    const footer = document.querySelector("footer");
    if (navbar) navbar.setAttribute("data-print-hide", "true");
    if (footer) footer.setAttribute("data-print-hide", "true");

    // Use setTimeout to guarantee styles are painted before printing
    setTimeout(() => {
      // Idempotent cleanup — safe to call more than once
      let cleaned = false;
      const cleanup = () => {
        if (cleaned) return;
        cleaned = true;
        const el = document.getElementById("glemma-print-styles");
        if (el) el.remove();
        if (navbar) navbar.removeAttribute("data-print-hide");
        if (footer) footer.removeAttribute("data-print-hide");
        setIsGeneratingPDF(false);
      };

      // Listen for afterprint (works when browser shows print dialog)
      window.addEventListener("afterprint", cleanup, { once: true });

      // Always add a timeout fallback — covers silent/auto-save PDF scenarios
      // where afterprint never fires
      setTimeout(cleanup, 2000);

      window.print();
    }, 100);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5efe9] flex items-center justify-center">
        <p className="text-[#6f6259]">Loading your results...</p>
      </div>
    );
  }

  if (!results) return null;

  const tier = results.tier ?? "free";
  const isGlow = tier === "glow" || tier === "glow_pro";
  const isPro = tier === "glow_pro";

  return (
    <main className="min-h-screen bg-[#f5efe9] text-[#3B2E2A] px-6 py-16 pt-24">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-3">
            <p className="text-[10px] tracking-[0.3em] text-[#bf908a] uppercase">
              Analysis complete
            </p>
            {tier !== "free" && (
              <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1 rounded-full bg-[#f2e7e5] text-[#bf908a]">
                {isPro ? <Crown className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                {isPro ? "Glow Pro" : "Glow"}
              </span>
            )}
          </div>
          <h1 className="font-serif text-4xl mb-3">Your skin report</h1>
          <p className="text-[#6f6259] text-sm">
            Based on your photos and inputs, here&apos;s your personalized analysis.
          </p>
        </div>

        {/* SCORE + SKIN TYPE */}
        <div className="text-center mb-16">
          <div className="w-32 h-32 mx-auto rounded-full border border-[#e5ddd4] bg-white flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="text-3xl font-semibold">{results.overallScore}</div>
              <div className="text-xs text-[#6f6259]">Score</div>
            </div>
          </div>
          <h2 className="font-serif text-2xl mb-2">Overall Skin Health</h2>
          <p className="text-[#bf908a] text-sm">{getScoreText(results.overallScore)}</p>
          {results.skinType && (
            <p className="text-[#6f6259] text-sm mt-2">
              Skin type: <span className="font-medium text-[#3B2E2A] capitalize">{results.skinType}</span>
            </p>
          )}
        </div>

        {/* CONDITIONS */}
        <Section title="Detected conditions">
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(results.skinConditions).map(([key, data]) => {
              const value = getValue(data);
              if (value === "unknown") return null;

              return (
                <div
                  key={key}
                  className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-5"
                >
                  <h4 className="font-medium mb-2">{formatKey(key)}</h4>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#6f6259]">{formatValue(value)}</span>
                    <span className="text-[#bf908a]">
                      {Math.round(data.confidence * 100)}%
                    </span>
                  </div>
                  {/* Severity bar for Glow / Pro */}
                  {data.severityScore != null && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#6f6259]">Severity</span>
                        <span className="font-medium">{data.severityScore}/10</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-[#e5ddd4] overflow-hidden">
                        <div
                          className={`h-full rounded-full ${severityColor(data.severityScore)} transition-all`}
                          style={{ width: `${data.severityScore * 10}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* RECOMMENDATIONS */}
        <Section title="Recommendations">
          <div className="grid md:grid-cols-2 gap-6">
            {results.recommendations.map((rec, i) => (
              <div
                key={i}
                className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-6"
              >
                <span className="text-xs text-[#bf908a]">{rec.category}</span>
                <h4 className="font-medium text-lg mt-1 mb-2">{rec.product}</h4>
                <p className="text-sm text-[#6f6259] mb-4">{rec.reason}</p>
                {rec.priority && (
                  <span className={`text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-full ${
                    rec.priority === "high"
                      ? "bg-red-50 text-red-500"
                      : rec.priority === "medium"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-emerald-50 text-emerald-600"
                  }`}>
                    {rec.priority} priority
                  </span>
                )}
              </div>
            ))}
          </div>
        </Section>

        {/* ──────── GLOW TIER SECTIONS ──────── */}

        {/* Weekly Progress Tracking — Glow */}
        {isGlow && results.weeklyProgressTracking && (
          <Section title="Weekly Progress Tracking" badge="Glow">
            <div className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-6 space-y-5">
              <p className="text-sm text-[#6f6259]">{results.weeklyProgressTracking.currentState}</p>

              {results.weeklyProgressTracking.areasImproving?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                    <span className="text-sm font-medium">Areas Improving</span>
                  </div>
                  <ul className="space-y-1">
                    {results.weeklyProgressTracking.areasImproving.map((a, i) => (
                      <li key={i} className="text-sm text-[#6f6259] pl-6">• {a}</li>
                    ))}
                  </ul>
                </div>
              )}

              {results.weeklyProgressTracking.areasNeedingAttention?.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-medium">Needs Attention</span>
                  </div>
                  <ul className="space-y-1">
                    {results.weeklyProgressTracking.areasNeedingAttention.map((a, i) => (
                      <li key={i} className="text-sm text-[#6f6259] pl-6">• {a}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="rounded-xl bg-[#f2e7e5]/60 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="w-4 h-4 text-[#bf908a]" />
                  <span className="text-sm font-medium">Focus This Week</span>
                </div>
                <p className="text-sm text-[#6f6259] pl-6">{results.weeklyProgressTracking.focusThisWeek}</p>
              </div>
            </div>
          </Section>
        )}

        {/* Weekly Routine — Glow */}
        {isGlow && !isPro && results.weeklyRoutine && (
          <Section title="Guided Weekly Routine" badge="Glow">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Morning */}
              <div className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Sun className="w-5 h-5 text-amber-500" />
                  <h4 className="font-medium">Morning</h4>
                </div>
                <ol className="space-y-3">
                  {results.weeklyRoutine.morning.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-[#f2e7e5] text-[#bf908a] flex items-center justify-center text-xs font-medium shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-[#6f6259]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {/* Evening */}
              <div className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Moon className="w-5 h-5 text-indigo-400" />
                  <h4 className="font-medium">Evening</h4>
                </div>
                <ol className="space-y-3">
                  {results.weeklyRoutine.evening.map((step, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-[#f2e7e5] text-[#bf908a] flex items-center justify-center text-xs font-medium shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-[#6f6259]">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Section>
        )}

        {/* Lifestyle Suggestions — Glow */}
        {isGlow && !isPro && results.lifestyleSuggestions && results.lifestyleSuggestions.length > 0 && (
          <Section title="Lifestyle Suggestions" badge="Glow">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.lifestyleSuggestions.map((tip, i) => (
                <div key={i} className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-5 flex gap-3">
                  <Leaf className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-[#6f6259]">{tip}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* ──────── GLOW PRO SECTIONS ──────── */}

        {/* Daily Adaptive Routine — Pro */}
        {isPro && results.dailyRoutine && (
          <Section title="Daily Adaptive Routine" badge="Pro">
            <div className="grid md:grid-cols-3 gap-6">
              {(["morning", "afternoon", "evening"] as const).map((period) => {
                const steps = results.dailyRoutine?.[period];
                if (!steps || steps.length === 0) return null;
                const icons = { morning: Sun, afternoon: CloudSun, evening: Moon };
                const Icon = icons[period];
                return (
                  <div key={period} className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Icon className="w-5 h-5 text-[#bf908a]" />
                      <h4 className="font-medium capitalize">{period}</h4>
                    </div>
                    <ol className="space-y-3">
                      {steps.map((step, i) => (
                        <li key={i} className="flex gap-3 text-sm">
                          <span className="w-5 h-5 rounded-full bg-[#f2e7e5] text-[#bf908a] flex items-center justify-center text-xs font-medium shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-[#6f6259]">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>
          </Section>
        )}

        {/* Lifestyle Engine — Pro */}
        {isPro && results.lifestyleEngine && (
          <Section title="Lifestyle Engine" badge="Pro">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(results.lifestyleEngine).map(([area, data]) => (
                <div key={area} className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-5">
                  <h4 className="font-medium capitalize mb-2">{area}</h4>
                  <p className="text-sm text-[#6f6259] mb-2">{data.recommendation}</p>
                  <p className="text-xs text-[#bf908a] italic">{data.skinImpact}</p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Product Stack Optimization — Pro */}
        {isPro && results.productStackOptimization && results.productStackOptimization.length > 0 && (
          <Section title="Product Conflicts" badge="Pro">
            <div className="space-y-4">
              {results.productStackOptimization.map((item, i) => (
                <div key={i} className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <h4 className="font-medium">{item.conflict}</h4>
                  </div>
                  <p className="text-sm text-[#6f6259] mb-2">{item.explanation}</p>
                  <p className="text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
                    <strong>Fix:</strong> {item.solution}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Skin Pattern Intelligence — Pro */}
        {isPro && (results.skinPatternIntelligence?.predictions?.length ?? 0) > 0 && (
          <Section title="Skin Pattern Intelligence" badge="Pro">
            <div className="space-y-4">
              {results.skinPatternIntelligence!.predictions.map((pred, i) => (
                <div key={i} className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-5 flex gap-4">
                  <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium">{pred.concern}</h4>
                      <span className={`text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full ${
                        pred.likelihood === "high"
                          ? "bg-red-50 text-red-500"
                          : pred.likelihood === "medium"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}>
                        {pred.likelihood}
                      </span>
                    </div>
                    <p className="text-sm text-[#6f6259]">{pred.preventiveAction}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Product Audit — Pro */}
        {isPro && (results.productAudit?.ingredientsToAvoid?.length ?? 0) > 0 && (
          <Section title="Product Audit" badge="Pro">
            <div className="grid sm:grid-cols-2 gap-4">
              {results.productAudit!.ingredientsToAvoid.map((item, i) => (
                <div key={i} className="rounded-2xl border border-[#e5ddd4] bg-white/60 p-5 flex gap-3">
                  <Search className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">{item.ingredient}</h4>
                    <p className="text-sm text-[#6f6259]">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* IMAGES */}
        {imageInfo.length > 0 && (
          <Section title="Analyzed images">
            <div className="space-y-3">
              {imageInfo.map((img, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center border border-[#e5ddd4] rounded-xl p-4 bg-white/60"
                >
                  <div>
                    <p className="text-sm">{img.name}</p>
                    <p className="text-xs text-[#6f6259]">
                      {(img.size / 1024 / 1024).toFixed(2)}MB
                    </p>
                  </div>
                  <span className="text-xs text-[#bf908a]">{img.type}</span>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* CTA */}
        <div data-print-hide className="rounded-[2rem] border border-[#e5ddd4] bg-white/60 p-8 text-center">
          <p className="text-[10px] tracking-[0.3em] text-[#bf908a] mb-3 uppercase">
            Next step
          </p>
          <h4 className="font-serif text-2xl mb-3">
            Build your skincare routine
          </h4>
          <p className="text-[#6f6259] mb-6">
            Turn this analysis into a routine tailored to your skin.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              className="rounded-full bg-[#bf908a] text-white px-6 py-3 text-sm inline-flex items-center gap-2 hover:bg-[#b0807a] transition-colors disabled:opacity-60"
            >
              <Download className="w-4 h-4" />
              {isGeneratingPDF ? "Preparing…" : "Downld as PDF"}
            </button>
            <button
              onClick={clearResults}
              className="rounded-full border border-[#e5ddd4] px-6 py-3 text-sm hover:bg-[#f9f4f2]"
            >
              New analysis
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}