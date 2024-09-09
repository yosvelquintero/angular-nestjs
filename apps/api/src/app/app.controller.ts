import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { Issue } from '@an/types';

import { AppService } from './app.service';

@Controller('issues')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('')
  create(@Body() body: Issue) {
    console.log('Create:', body);
    this.appService.createIssue(body);
    return { message: 'Object received', object: body };
  }

  @Get('')
  read(): Issue[] {
    console.log('Read');
    return this.appService.getData();
  }

  @Put('/:id')
  update(@Param('id') id: string, @Body() body: Partial<Issue>) {
    console.log('Update:', id, body);
    const updatedIssue = this.appService.updateIssue(id, body);
    if (!updatedIssue) {
      throw new NotFoundException(`Issue with id ${id} not found`);
    }
    return { message: 'Object updated', object: updatedIssue };
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    console.log('Delete:', id);
    const deletedIssue = this.appService.deleteIssue(id);
    if (!deletedIssue) {
      throw new NotFoundException(`Issue with id ${id} not found`);
    }
    return { message: 'Object deleted', object: deletedIssue };
  }
}
