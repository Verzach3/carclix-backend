import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/types/TokenPayload';

export async function getPayloadFromToken(token: string, jwtService: JwtService): Promise<TokenPayload> {
  const payload = await jwtService.verifyAsync(token, {
    secret: process.env.JWT_SECRET,
  });
  return payload;
}
