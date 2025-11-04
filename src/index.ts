const port = process.env.PORT || 3000;

const server = Bun.serve({
  port,
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Serve index.html for root path
    if (path === "/") {
      const html = await Bun.file("./src/index.html").text();
      return new Response(html, {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    }

    // Build and serve TypeScript/React files
    if (path.endsWith(".tsx") || path.endsWith(".ts")) {
      try {
        const filePath = `.${path}`;
        const result = await Bun.build({
          entrypoints: [filePath],
          outdir: "./dist",
          target: "browser",
        });

        if (result.success && result.outputs.length > 0) {
          const output = result.outputs[0];
          return new Response(await output.text(), {
            headers: {
              "Content-Type": "application/javascript",
            },
          });
        }
      } catch (error) {
        console.error("Error building file:", error);
        return new Response(`Error: ${error}`, { status: 500 });
      }
    }

    // Serve CSS files
    if (path.endsWith(".css")) {
      try {
        const filePath = `.${path}`;
        const file = Bun.file(filePath);

        if (await file.exists()) {
          // Process CSS with Tailwind
          const cssContent = await file.text();
          return new Response(cssContent, {
            headers: {
              "Content-Type": "text/css",
            },
          });
        }
      } catch (error) {
        console.error("Error serving CSS:", error);
      }
    }

    // Serve other static files
    if (path.startsWith("/src/")) {
      try {
        const filePath = `.${path}`;
        const file = Bun.file(filePath);

        if (await file.exists()) {
          return new Response(file);
        }
      } catch (error) {
        console.error("Error serving file:", error);
      }
    }

    return new Response("Not Found", { status: 404 });
  },
});

console.log(`🚀 Server running at http://localhost:${port}`);
