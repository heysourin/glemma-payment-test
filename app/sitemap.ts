import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";

const BASE_URL = "https://theglemma.com";

// 🔁 Recursively get all blog routes that contain page.tsx
function getAllBlogRoutes(dir: string, basePath = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  let routes: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith("(")) continue; // ignore route groups

    const fullPath = path.join(dir, entry.name);
    const routePath = `${basePath}/${entry.name}`;

    if (entry.isDirectory()) {
      const files = fs.readdirSync(fullPath);

      // ✅ If folder has page.tsx → it's a valid route
      if (files.includes("page.tsx")) {
        routes.push(routePath);
      }

      // 🔁 Go deeper
      routes = routes.concat(getAllBlogRoutes(fullPath, routePath));
    }
  }

  return routes;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ✅ Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/features`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  // ✅ Blog routes (recursive)
  const blogDir = path.join(process.cwd(), "app/blog");
  const blogPaths = getAllBlogRoutes(blogDir);

  const blogRoutes: MetadataRoute.Sitemap = blogPaths.map((route) => ({
    url: `${BASE_URL}/blog${route}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: route.split("/").length > 2 ? 0.8 : 0.9, // deeper = slightly lower priority
  }));

  return [...staticRoutes, ...blogRoutes];
}