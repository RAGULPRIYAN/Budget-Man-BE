import { PartialType } from '@nestjs/swagger';
import { CreateRemainderDto } from './create-remainder.dto';

export class UpdateRemainderDto extends PartialType(CreateRemainderDto) {}
