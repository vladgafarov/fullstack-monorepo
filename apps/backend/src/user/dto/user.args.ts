import { ArgsType, Field } from '@nestjs/graphql'
import { SortOrder } from 'src/common/model/sort-order.enum'
import { PaginationArgs } from 'src/common/dto/pagination.args'
import { UserOrderBy } from 'src/common/model/user-order-by.enum'

@ArgsType()
export class UserArgs extends PaginationArgs {
   @Field(() => UserOrderBy, {
      nullable: true,
      defaultValue: UserOrderBy.name,
   })
   orderBy?: UserOrderBy

   @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.asc })
   sortOrder?: SortOrder
}
