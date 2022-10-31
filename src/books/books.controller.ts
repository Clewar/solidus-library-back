import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book as BookModel } from '@prisma/client';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<BookModel> {
    return this.booksService.createBook(createBookDto);
  }

  @Get('filtered')
  findAll(@Query('searchQuery') searchQuery = ''): Promise<BookModel[]> {
    return this.booksService.getBooks({
      where: {
        OR: [
          {
            name: { contains: searchQuery },
          },
          {
            author: { contains: searchQuery },
          },
          {
            publisher: { contains: searchQuery },
          },
        ],
      },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.getBook({ id: Number(id) });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook({
      where: { id: Number(id) },
      data: updateBookDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.deleteBook({ id: Number(id) });
  }
}
