import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function PATCH(request: Request) {
  try {
    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json({ success: false, error: 'ID y estado son requeridos' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('modules')
      .update({ status })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error en el servidor' }, { status: 500 });
  }
}
