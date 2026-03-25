export async function onRequestPost(context: any) {
  try {
    const { request, env } = context;
    const body = await request.json();

    const { email, fullName } = body;

    // Validación básica
    if (!email) {
      return new Response(JSON.stringify({ error: "Email requerido" }), {
        status: 400,
      });
    }

    // Petición a Brevo
    const res = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": env.BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FULLNAME: fullName || "",
        },
        listIds: [3], // 👈 TU LIST ID
        updateEnabled: true,
      }),
    });

    const data = await res.json();

    return new Response(JSON.stringify(data), {
      status: 200,
    });

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}