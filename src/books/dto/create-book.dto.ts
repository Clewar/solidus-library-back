import { IsNotEmpty } from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty()
  name: string;

  author?: string;
  publisher?: string;
}
