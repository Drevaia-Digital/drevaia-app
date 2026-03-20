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
  if (!CONFIG.brevo.apiKey) {
    console.warn('⚠️ Brevo no configurado');
    return { success: false, error: 'Brevo API Key no configurada' };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': CONFIG.brevo.apiKey,
      },
      body: JSON.stringify({
        email: data.email,
        attributes: {
          NOMBRE: data.name,
          IDIOMA: data.language.toUpperCase(),
          INTERESES: data.interests.join(', '),
          NEWSLETTER: data.newsletter ? 'Sí' : 'No',
          FECHA_REGISTRO: data.timestamp,
          FUENTE: data.source,
        },
        listIds: CONFIG.brevo.listId ? [parseInt(CONFIG.brevo.listId)] : undefined,
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error en Brevo');
    }

    console.log('✅ Contacto guardado en Brevo:', data.email);
    return { success: true };
  } catch (error) {
    console.error('❌ Error Brevo:', error);
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
