import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const JWT_SECRET = new TextEncoder().encode(process.env.ADMIN_PASSWORD || 'default_secret');

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (password === process.env.ADMIN_PASSWORD) {
      const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(JWT_SECRET);

      const response = NextResponse.json({ success: true });
      
      response.cookies.set('admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return response;
    }

    return NextResponse.json({ success: false, error: 'Contraseña incorrecta' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error en el servidor' }, { status: 500 });
  }
}
