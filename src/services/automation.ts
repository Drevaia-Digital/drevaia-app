/**
 * Sistema de Automatización Drevaia Digital
 * Integra múltiples servicios para flujo completo
 */

// ============================================
// CONFIGURACIÓN
// ============================================
const CONFIG = {
  // Brevo (ya configurado)
  brevo: {
    apiKey: import.meta.env.VITE_BREVO_API_KEY || '',
    listId: import.meta.env.VITE_BREVO_LIST_ID || '3',
  },
  
  // Webhook para Zapier/Make (opcional)
  webhook: {
    url: import.meta.env.VITE_WEBHOOK_URL || '',
  },
  
  // Google Sheets (opcional)
  sheets: {
    url: import.meta.env.VITE_SHEETS_URL || '',
  },
  
  // Slack/Discord notificaciones (opcional)
  notifications: {
    slack: import.meta.env.VITE_SLACK_WEBHOOK || '',
    discord: import.meta.env.VITE_DISCORD_WEBHOOK || '',
  },
};

// ============================================
// TIPOS DE DATOS
// ============================================
export interface RegistrationData {
  name: string;
  email: string;
  language: string;
  interests: string[];
  newsletter: boolean;
  timestamp: string;
  source: string;
}

// ============================================
// BREVO - Guardar contacto
// ============================================
export const saveToBrevo = async (data: RegistrationData): Promise<{ success: boolean; error?: string }> => {
  try {
    const response = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        lang: data.language,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('❌ Backend error:', result);
      return { success: false, error: result?.message || 'Error backend' };
    }

    console.log('✅ Contacto enviado al backend:', data.email);
    return { success: true };

  } catch (error) {
    console.error('❌ Error conexión backend:', error);
    return { success: false, error: String(error) };
  }
};

// ============================================
// GOOGLE SHEETS - Backup
// ============================================
export const saveToSheets = async (data: RegistrationData): Promise<{ success: boolean; error?: string }> => {
  if (!CONFIG.sheets.url) {
    console.warn('⚠️ Google Sheets no configurado');
    return { success: false, error: 'Sheets URL no configurada' };
  }

  try {
    await fetch(CONFIG.sheets.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: data.name,
        email: data.email,
        idioma: data.language,
        intereses: data.interests.join(', '),
        newsletter: data.newsletter ? 'Sí' : 'No',
        fecha: data.timestamp,
      }),
    });

    console.log('✅ Datos guardados en Sheets:', data.email);
    return { success: true };
  } catch (error) {
    console.error('❌ Error Sheets:', error);
    return { success: false, error: String(error) };
  }
};

// ============================================
// WEBHOOK - Zapier/Make/n8n
// ============================================
export const sendToWebhook = async (data: RegistrationData): Promise<{ success: boolean; error?: string }> => {
  if (!CONFIG.webhook.url) {
    console.warn('⚠️ Webhook no configurado');
    return { success: false, error: 'Webhook URL no configurada' };
  }

  try {
    await fetch(CONFIG.webhook.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    console.log('✅ Datos enviados a webhook:', data.email);
    return { success: true };
  } catch (error) {
    console.error('❌ Error Webhook:', error);
    return { success: false, error: String(error) };
  }
};

// ============================================
// SLACK - Notificaciones
// ============================================
export const sendSlackNotification = async (data: RegistrationData): Promise<{ success: boolean; error?: string }> => {
  if (!CONFIG.notifications.slack) {
    return { success: false, error: 'Slack no configurado' };
  }

  try {
    const message = {
      text: '🎉 ¡Nuevo registro en Drevaia Digital!',
      blocks: [
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: `*${data.name}* se acaba de registrar\n📧 ${data.email}\n🌍 Idioma: ${data.language}\n⭐ Intereses: ${data.interests.join(', ')}`,
          },
        },
      ],
    };

    await fetch(CONFIG.notifications.slack, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(message),
    });

    console.log('✅ Notificación enviada a Slack');
    return { success: true };
  } catch (error) {
    console.error('❌ Error Slack:', error);
    return { success: false, error: String(error) };
  }
};

// ============================================
// FLUJO COMPLETO - Todas las integraciones
// ============================================
export const processRegistration = async (data: RegistrationData) => {
  const results: {
    brevo: { success: boolean; error?: string };
    sheets: { success: boolean; error?: string };
    webhook: { success: boolean; error?: string };
    slack: { success: boolean; error?: string };
  } = {
    brevo: { success: false },
    sheets: { success: false },
    webhook: { success: false },
    slack: { success: false },
  };

  // Ejecutar todas las integraciones en paralelo
  const [brevoResult, sheetsResult, webhookResult, slackResult] = await Promise.allSettled([
    saveToBrevo(data),
    saveToSheets(data),
    sendToWebhook(data),
    sendSlackNotification(data),
  ]);

  // Procesar resultados
  if (brevoResult.status === 'fulfilled') results.brevo = brevoResult.value;
  if (sheetsResult.status === 'fulfilled') results.sheets = sheetsResult.value;
  if (webhookResult.status === 'fulfilled') results.webhook = webhookResult.value;
  if (slackResult.status === 'fulfilled') results.slack = slackResult.value;

  console.log('📊 Resultados del registro:', results);
  return results;
};

// ============================================
// SEGUIMIENTO AUTOMÁTICO
// ============================================
export const scheduleFollowUp = (email: string, days: number = 3) => {
  // Programar email de seguimiento
  const followUpDate = new Date();
  followUpDate.setDate(followUpDate.getDate() + days);
  
  console.log(`📅 Seguimiento programado para ${email} el ${followUpDate.toISOString()}`);
  
  // Esto se maneja mejor con Brevo Automation o n8n
  return {
    email,
    scheduledDate: followUpDate.toISOString(),
    type: 'follow_up',
  };
};

// ============================================
// ANÁLISIS Y REPORTES
// ============================================
export const getRegistrationStats = () => {
  // Esto requeriría una base de datos
  // Por ahora, solo estructura
  return {
    total: 0,
    byLanguage: {},
    byInterest: {},
    byDate: {},
  };
};
