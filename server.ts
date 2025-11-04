const port = process.env.PORT || 3000;

// Simple static file server for production
const server = Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    let path = url.pathname;

    // Default to index.html for root
    if (path === "/") {
      path = "/index.html";
    }

    // Try to serve file from dist directory
    try {
      const filePath = `./dist${path}`;
      const file = Bun.file(filePath);

      if (await file.exists()) {
        return new Response(file);
      }
    } catch (error) {
      console.error("Error serving file:", error);
    }

    // For SPA routing, return index.html for non-file requests
    if (!path.includes(".")) {
      try {
        const indexFile = Bun.file("./dist/index.html");
        if (await indexFile.exists()) {
          return new Response(indexFile, {
            headers: {
              "Content-Type": "text/html; charset=utf-8",
            },
          });
        }
      } catch (error) {
        console.error("Error serving index.html:", error);
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Server running at http://localhost:${port}`);
