
export async function GET() {
	return new Response(JSON.stringify({ message: 'Hey!' }), {
		status: 200,
		headers: { 'Content-Type': 'application/json' },
	});
}
