'use server';

import { supabase } from '@/lib/supabase';

export async function submitLead(formData: FormData) {
  const name = formData.get('nombre') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('telefono') as string;
  const interest = formData.get('interes') as string; // We'll store this in the message or map to module if possible
  const message = formData.get('mensaje') as string;

  if (!name || !email) {
    return { success: false, error: 'Nombre y correo son obligatorios' };
  }

  // Combine interest into message for now since we don't have UUIDs for modules mapped on the frontend yet
  const fullMessage = interest ? `Interés: ${interest}\n\n${message || ''}` : message;

  const { data, error } = await supabase
    .from('leads')
    .insert([{ name, email, phone, message: fullMessage }]);

  if (error) {
    console.error('Error insertando lead:', error);
    return { success: false, error: 'Hubo un error al enviar el formulario. Por favor, intenta de nuevo.' };
  }

  return { success: true };
}
