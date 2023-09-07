import { Injectable, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserDocument, UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.UserModel(createUserDto);
    const saltRounds = 10;
    newUser.password = bcrypt.hashSync(newUser.password, saltRounds);
    await newUser.save();
    return newUser;
  }

  async findAll(): Promise<UserDocument[]> {
    const result = await this.UserModel.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    return result;
  }

  async findByEmail(email: string): Promise<UserDocument> {
    const user = await this.UserModel.findOne({ email });
    if (!user) {
      throw new HttpException('Not found the user', 404);
    }

    return user;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
