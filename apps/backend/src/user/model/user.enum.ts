import { registerEnumType } from '@nestjs/graphql'

export enum UserRole {
   USER = 'USER',
   ADMIN = 'ADMIN',
   TESTER = 'TESTER',
}

registerEnumType(UserRole, {
   name: 'UserRole',
   description: 'Role of user',
})
