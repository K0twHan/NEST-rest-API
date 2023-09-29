import {Test} from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum'
import { PrismaService } from '../src/prisma/prisma.service';
import { AuthDto } from 'src/auth/dto';
describe('App e2e', () => {
  let app: INestApplication
  let prisma : PrismaService
  beforeAll(async () => {
    const moduleRef = 
    await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

     app = moduleRef.createNestApplication();
     app.useGlobalPipes(new ValidationPipe({whitelist:true}))
     await app.init();
     await app.listen(3000);


     prisma = app.get(PrismaService)
     pactum.request.setBaseUrl('http://localhost:3000')
     await prisma.cleanDb()
  })
  afterAll(() => {app.close()})
  describe('Auth' , () => {
    const dto : AuthDto = {
      email: 'vlad@gmail.com',
      password: '123'
    }
    describe('Signup', () => {
      it('Shuold throw if email empty',() => {
        return pactum.spec().post('/auth/signup').withBody({
          password : dto.password
        }).expectStatus(400)
      })
      it('Shuold throw if password empty',() => {
        return pactum.spec().post('/auth/signup').withBody({
          email : dto.email
        }).expectStatus(400)
      })
      it('Shuold throw if no  no body provided ',() => {
        return pactum.spec().post('/auth/signup').expectStatus(400)
      })
      it('Should Signup', () => {

        return pactum.spec().post('/auth/signup').withBody(dto).expectStatus(201).inspect()
      })
    }),
    describe('Signin', () => {
      it('Shuold throw if email empty',() => {
        return pactum.spec().post('/auth/signup').withBody({
          password : dto.password
        }).expectStatus(400)
      })
      it('Shuold throw if password empty',() => {
        return pactum.spec().post('/auth/signup').withBody({
          email : dto.email
        }).expectStatus(400)
      })
      it('Shuold throw if no  no body provided ',() => {
        return pactum.spec().post('/auth/signup').expectStatus(400)
      })
      it('Should Signin', () => {

        return pactum.spec().post('/auth/signin').withBody(dto).expectStatus(201).stores('userAt', 'acces_token')
      })

    })

  })
  describe('User' , () => {
    describe('Get me', () => {})
    describe('Edit user', () => {})

  })
  describe('Bookmarks' , () => {
    describe('Create bookmark', () => {})
    describe('Get bookmarks', () => {})
    describe('Get bookmark by id ', () => {})
    describe('Edit bookmarks', () => {})
    describe('Delete bookmarks', () => {})





  })
  

});