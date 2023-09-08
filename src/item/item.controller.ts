import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateItemDto } from './new-item.dto';
import { ItemService } from './item.service';
import { Item } from 'src/schemas/item.shema';
import { ApiTags } from '@nestjs/swagger';

@Controller('item')
@ApiTags('Item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get('list')
  findAllItems(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get('/detail/:id')
  findOneItem(@Param('id') id: string): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Post('add')
  createItem(@Body() createItemDto: CreateItemDto): Promise<Item> {
    return this.itemService.create(createItemDto);
  }

  @Put('edit/:id')
  updateItem(
    @Body() updateItemDto: CreateItemDto,
    @Param('id') id: string,
  ): Promise<Item> {
    return this.itemService.update(id, updateItemDto);
  }

  @Delete('delete/:id')
  deleteItem(@Param('id') id: string) {
    return this.itemService.remove(id);
  }
}
