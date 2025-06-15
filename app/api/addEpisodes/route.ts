export function GET() {
  return new Response(
    JSON.stringify({ message: "This endpoint is not implemented yet." }),
    {
      status: 501,
      headers: { "Content-Type": "application/json" },
    }
  );
}
