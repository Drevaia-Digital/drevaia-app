export const onRequestPost = async (context: any) => {
  try {
    const { request, env } = context;

    const body = await request.json();
    const email = body.email?.trim()?.toLowerCase();

    // Validación básica
    if (!email) {
      return json(
        { success: false, message: "Email requerido" },
        400
      );
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return json(
        { success: false, message: "Email inválido" },
        400
      );
    }

    // API KEY Brevo
    const apiKey = env.BREVO_API_KEY;

    if (!apiKey) {
      return json(
        { success: false, message: "Falta BREVO_API_KEY" },
        500
      );
    }

    // Enviar a Brevo
    const response = await fetch(
      "https://api.brevo.com/v3/contacts",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey
        },
        body: JSON.stringify({
          email,
          updateEnabled: true,
          attributes: {
            SOURCE: "BLOG_DREVAIA"
          }
        })
      }
    );

    const data = await response.text();

    if (!response.ok) {
      return json(
        {
          success: false,
          message: "Brevo error",
          detail: data
        },
        500
      );
    }

    return json({
      success: true,
      message: "Suscripción exitosa"
    });
  } catch (error: any) {
    return json(
      {
        success: false,
        message: "Error interno",
        detail: error?.message
      },
      500
    );
  }
};

function json(data: any, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}