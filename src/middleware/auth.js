export default function auth({ next, router }) {
  if (localStorage.token == "null" || !localStorage.token)
    return router.push({
      name: "Pages",
      query: { showMsjInvalidToken: "false" },
    });
  return next();
}
