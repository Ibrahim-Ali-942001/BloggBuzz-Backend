import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { DeleteBlogDto } from './dto/delete-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller()
export class BlogController {
    constructor(private blogService: BlogService){}
    @Get('blog')
    getBlogs(){
        return this.blogService.get()
    }
    @Get('blog/:Blog_ID')
    getblogId(@Param('Blog_ID', ParseIntPipe) Blog_ID:number){
        return this.blogService.getbyId(Blog_ID)
    }

    @Get('user/:userId/blog')
    getUserBlog(@Param('userId', ParseIntPipe) userId:number){
        return this.blogService.getUsersblog(userId)
    }
    
    @Post('user/:userId/blog')
    Write(@Body() createBlogDto:CreateBlogDto, @Param('userId',ParseIntPipe) userId:number){
        // createBlogDto.user=userId;
        return this.blogService.createblog(createBlogDto)
    }
    @Patch('user/:userId/blog/:Blog_ID')
    update(@Body() updateBlogDto:UpdateBlogDto, @Param('Blog_ID',ParseIntPipe) Blog_ID:number){
        return this.blogService.update(updateBlogDto,Blog_ID)
    }

    // @Delete('user/:userId/blog/:Blog_ID')
    // delete(deleBlogDto:DeleteBlogDto){
    //     deleBlogDto.id=Blog_ID;
    //     deleBlogDto.userId=userId;
    //     return  this.blogService.delete(deleBlogDto);
    // }
    @Delete('user/:userId/blog/:Blog_ID')
    delete(@Param('userId',ParseIntPipe) userId:number,@Param('Blog_ID',ParseIntPipe) Blog_ID:number,@Body() deleteBlogDto:DeleteBlogDto){
        deleteBlogDto.id=Blog_ID;
        //deleteBlogDto.userId=userId;
        return this.blogService.delete(deleteBlogDto)
    }
}
